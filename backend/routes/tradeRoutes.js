// tradeRoutes.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/trades/matches - find matching trades
router.get('/matches', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT t1.id AS user1_trade_id, t2.id AS user2_trade_id,
             t1.username AS user1, t2.username AS user2,
             t1.offered_item AS user1_offers, t1.requested_item AS user1_wants,
             t2.offered_item AS user2_offers, t2.requested_item AS user2_wants
      FROM trades t1
      JOIN trades t2
        ON t1.offered_item = t2.requested_item
        AND t1.requested_item = t2.offered_item
        AND t1.username != t2.username
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching trade matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
