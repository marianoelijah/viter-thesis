// backend/routes/tradesRoutes.js
import express from 'express';
import db from '../config/db.js'; // Ensure db.js exports the mysql2/promise pool

const router = express.Router();

router.post('/', async (req, res) => {
  const { buyerId, items, totalAmount } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [tradeResult] = await connection.query(
      `INSERT INTO trades (buyer_id, total_amount, status) VALUES (?, ?, ?)`,
      [buyerId, totalAmount, 'pending']
    );
    const tradeId = tradeResult.insertId;

    for (const item of items) {
      await connection.query(
        `INSERT INTO trade_items (trade_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)`,
        [tradeId, item.productId, item.quantity, item.totalPrice]
      );
    }

    await connection.commit();
    res.json({ message: 'Trade saved successfully' });
  } catch (err) {
    await connection.rollback();
    console.error('Trade transaction failed:', err);
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    connection.release();
  }
});

export default router;
