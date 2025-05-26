// tradeRequests.routes.js (ES Module)
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ✅ POST /api/trade-requests - Submit a trade request
router.post('/', (req, res) => {
  const {
    requested_product_name,
    requested_product_quantity,
    offered_product_name,
    offered_product_quantity,
    user_id,
    trade_id
  } = req.body;

  if (
    !requested_product_name ||
    !requested_product_quantity ||
    !offered_product_name ||
    !offered_product_quantity ||
    !user_id ||
    !trade_id
  ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const insertQuery = `
    INSERT INTO trade_requests (
      requested_product_name,
      requested_product_quantity,
      offered_product_name,
      offered_product_quantity,
      user_id,
      trade_id
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    requested_product_name,
    requested_product_quantity,
    offered_product_name,
    offered_product_quantity,
    user_id,
    trade_id
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting trade request:', err);
      return res.status(500).json({ error: 'Database error', detail: err.message });
    }

    res.status(201).json({
      message: 'Trade request submitted successfully',
      requestId: result.insertId
    });
  });
});

export default router;