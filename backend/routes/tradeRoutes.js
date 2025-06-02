import express from 'express';
import db from '../config/db.js'; // Adjust path as necessary

const router = express.Router();

// POST route for /api/trade
router.post('/', (req, res) => {
  console.log('Trade POST request received');
  const { buyerId, items, totalAmount } = req.body;

  // Start a transaction to insert the trade and its items
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Transaction start failed' });
    }

    const sqlTrade = `
      INSERT INTO trades (buyer_id, total_amount, status)
      VALUES (?, ?, ?)
    `;
    db.query(sqlTrade, [buyerId, totalAmount, 'pending'], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: 'Failed to create trade' });
        });
      }

      const tradeId = result.insertId;
      const sqlItems = `
        INSERT INTO trade_items (trade_id, product_id, quantity, total_price)
        VALUES (?, ?, ?, ?)
      `;

      // Insert each cart item as a trade item
      items.forEach((item, index) => {
        db.query(sqlItems, [tradeId, item.productId, item.quantity, item.totalPrice], (err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Failed to save trade items' });
            });
          }

          // After inserting all items, commit the transaction
          if (index === items.length - 1) {
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: 'Transaction commit failed' });
                });
              }

              res.json({ message: 'Trade saved successfully' });
            });
          }
        });
      });
    });
  });
});

export default router;
