import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seedling_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 🛒 GET all purchases (all orders with product details)
router.get("/", async (req, res) => {
  const sql = `
    SELECT 
      o.id AS order_id,
      o.user_id,
      o.full_name,
      o.email,
      o.phone,
      o.address,
      o.city,
      o.postal_code,
      p.name AS product_name,
      p.category AS product_category,
      p.price AS price_each,
      op.quantity,
      op.total_price,
      o.total AS order_total,
      o.created_at
    FROM orders2 o
    LEFT JOIN orders_products op ON o.id = op.order_id
    LEFT JOIN products p ON op.product_id = p.id
    ORDER BY o.created_at DESC
  `;

  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("❌ Failed to fetch purchases:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🧑 GET purchase history for a specific user (flattened)
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      o.id AS order_id,
      o.user_id,
      o.full_name,
      p.name AS product_name,
      op.quantity,
      op.total_price,
      o.total AS order_total,
      o.created_at
    FROM orders2 o
    LEFT JOIN orders_products op ON o.id = op.order_id
    LEFT JOIN products p ON op.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  try {
    const [rows] = await db.query(sql, [userId]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching user-specific purchases:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🧑‍💼 GET purchase history for user with grouped order items
router.get("/history/:userId", async (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT
      o.id AS order_id,
      o.user_id,
      o.full_name,
      o.email,
      o.phone,
      o.address,
      o.city,
      o.postal_code,
      p.name AS product_name,
      p.category AS product_category,
      op.price_each,
      op.quantity,
      (op.price_each * op.quantity) AS total_price,
      o.total AS order_total,
      o.created_at
    FROM orders2 o
    JOIN orders_products op ON o.id = op.order_id
    JOIN products p ON op.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  try {
    const [results] = await db.query(query, [userId]);

    // Group by order_id
    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.order_id]) {
        grouped[row.order_id] = {
          order_id: row.order_id,
          user_id: row.user_id,
          full_name: row.full_name,
          email: row.email,
          phone: row.phone,
          address: row.address,
          city: row.city,
          postal_code: row.postal_code,
          order_total: row.order_total,
          created_at: row.created_at,
          items: []
        };
      }

      grouped[row.order_id].items.push({
        product_name: row.product_name,
        product_category: row.product_category,
        price_each: row.price_each,
        quantity: row.quantity,
        total_price: row.total_price
      });
    });

    const groupedOrders = Object.values(grouped);
    res.json(groupedOrders);
  } catch (err) {
    console.error('❌ Error fetching grouped user purchase history:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;