import express from 'express';
import db from '../config/db.js';


const router = express.Router();

// POST: Submit trade orders
router.post('/trade', async (req, res) => {
  const { trades } = req.body;

  if (!Array.isArray(trades) || trades.length === 0) {
    return res.status(400).json({ message: 'No trade data provided' });
  }

  try {
    for (const trade of trades) {
      const { buyer_id, product_id, quantity } = trade;

      // Insert trade order
      await db.query(
        'INSERT INTO trade_orders (buyer_id, product_id, quantity) VALUES (?, ?, ?)',
        [buyer_id, product_id, quantity]
      );

      // Delete from products table
      await db.query('DELETE FROM products WHERE id = ?', [product_id]);
    }

    res.status(200).json({ message: 'Trade orders submitted and products removed.' });
  } catch (error) {
    console.error('Trade error:', error);
    res.status(500).json({ message: 'Server error during trade.' });
  }
});

// GET: All trade orders with joined product and user info
router.get('/trade-orders', async (req, res) => {
    const sql = `
      SELECT todr.id, todr.buyer_id, todr.product_id, todr.quantity, todr.status, todr.trade_date,
             p.name AS product_name, u.username AS buyer_name
      FROM trade_orders todr
      JOIN products p ON todr.product_id = p.id
      JOIN users u ON todr.buyer_id = u.id
      ORDER BY todr.trade_date DESC
    `;
  
    try {
      const [rows] = await db.query(sql);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching trade orders:', error);
      res.status(500).json({ error: 'Failed to retrieve trade orders' });
    }
  });

// POST: Add to trade cart
router.post('/add', (req, res) => {
    const { buyer_id, product_id, quantity } = req.body;
  
    if (!buyer_id || !product_id || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const query = `
      INSERT INTO trade_cart (buyer_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
  
    db.query(query, [buyer_id, product_id, quantity], (err) => {
      if (err) {
        console.error('Error adding to trade cart:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      res.status(200).json({ message: 'Added to trade cart successfully' });
    });
  });

// POST /api/trade handler Stock Update 
router.post('/api/trade', async (req, res) => {
  const { trades } = req.body;

  try {
    for (const trade of trades) {
      const [product] = await db.query('SELECT stock FROM products WHERE id = ?', [trade.product_id]);

      if (product[0].stock < trade.quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      // Insert trade transaction
      await db.query(
        'INSERT INTO trades (buyer_id, product_id, quantity, price, total_price) VALUES (?, ?, ?, ?, ?)',
        [trade.buyer_id, trade.product_id, trade.quantity, trade.price, trade.total_price]
      );

      // Update product stock
      await db.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [trade.quantity, trade.product_id]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/api/trade', async (req, res) => {
  const { trades } = req.body;

  try {
    for (const trade of trades) {
      // Get current stock
      const [productRows] = await db.execute('SELECT stock FROM products WHERE id = ?', [trade.product_id]);
      const currentStock = productRows[0]?.stock || 0;

      // Check for sufficient stock
      if (currentStock < trade.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ID ${trade.product_id}` });
      }

      // Insert trade transaction
      await db.execute(
        'INSERT INTO trades (buyer_id, product_id, quantity, price, total_price) VALUES (?, ?, ?, ?, ?)',
        [trade.buyer_id, trade.product_id, trade.quantity, trade.price, trade.total_price]
      );

      // Update product stock
      await db.execute(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [trade.quantity, trade.product_id]
      );
    }

    res.status(200).json({ message: 'Trade completed successfully.' });
  } catch (err) {
    console.error('Trade error:', err);
    res.status(500).json({ error: 'Internal server error during trade.' });
  }
});

  

export default router;