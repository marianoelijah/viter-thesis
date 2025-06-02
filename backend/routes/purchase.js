import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Missing productId or quantity" });
  }

  try {
    const [productRows] = await db.query('SELECT price, availableStock FROM products WHERE id = ?', [productId]);

    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productRows[0];

    if (product.availableStock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const totalPrice = product.price * quantity;

    await db.query(
      'INSERT INTO purchases (product_id, quantity, total_price) VALUES (?, ?, ?)',
      [productId, quantity, totalPrice]
    );

    await db.query(
      'UPDATE products SET availableStock = availableStock - ? WHERE id = ?',
      [quantity, productId]
    );

    res.status(201).json({ message: 'Purchase recorded successfully', totalPrice });
  } catch (err) {
    console.error('Purchase Error:', err);
    res.status(500).json({ error: 'Server error during purchase' });
  }
});

// GET all purchases with product details
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        purchases.id,
        purchases.product_id,
        products.name AS product_name,
        products.image AS product_image,
        purchases.quantity,
        purchases.total_price,
        purchases.purchase_date
      FROM purchases
      JOIN products ON purchases.product_id = products.id
      ORDER BY purchases.purchase_date DESC
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Failed to fetch purchases:", err);
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
});

// GET /api/purchase-history?userId=123
router.get('/purchase-history', async (req, res) => {
  const { userId } = req.query;
  const [history] = await db.query("SELECT * FROM purchases WHERE buyer_id = ? ORDER BY purchase_date DESC", [userId]);
  res.json(history);
});

router.get('/', async (req, res) => {
  const userId = req.query.user_id; 
  const query = `
    SELECT 
      o.id, o.created_at AS purchase_date, o.total AS total_price, o.payment_method,
      i.quantity, i.price,
      p.name AS product_name, p.image AS product_image
    FROM orders2 o
    JOIN order_items i ON o.id = i.order_id
    JOIN products p ON i.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});




export default router;
