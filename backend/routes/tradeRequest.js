import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, items, offeredProducts, date } = req.body;

  try {
    const sql = `
      INSERT INTO trade_requests (user_id, items, offered_products, request_date)
      VALUES (?, ?, ?, ?)
    `;
    await db.execute(sql, [
      userId,
      JSON.stringify(items),
      JSON.stringify(offeredProducts),
      date,
    ]);

    res.status(200).json({ message: 'Trade request submitted successfully!' });
  } catch (err) {
    console.error("Trade request error:", err);
    res.status(500).json({ error: "Failed to save trade request" });
  }
});


export default router;
