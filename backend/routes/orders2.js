import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ✅ Place this FIRST — specific route
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.query(
      `SELECT 
         o.id AS order_id,
         o.user_id,
         o.total AS total_price,
         o.created_at AS purchase_date,
         oi.product_id,
         oi.product_name,
         oi.quantity,
         oi.price,
         p.image AS product_image
       FROM orders2 o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Database error" });
  }
});



// ✅ Keep this SECOND — dynamic route
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const [orderResults] = await db.query('SELECT * FROM orders2 WHERE id = ?', [orderId]);
    if (orderResults.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const order = orderResults[0];

    const [items] = await db.query(
      `SELECT 
         oi.quantity, 
         oi.price,
         p.name AS productName, 
         p.image AS productImage 
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    order.items = items;

    res.json(order);
  } catch (err) {
    console.error('❌ Error fetching order:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
