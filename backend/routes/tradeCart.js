import express from 'express';
import db from '../config/db.js'; // adjust path if needed

const router = express.Router();

/**
 * Add item to trade cart (or update quantity if it already exists)
 * POST /api/tradecart/add
 */
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log("Request Body:", req.body); // Debug log

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if item already in trade cart
    const [existing] = await db.query(
      'SELECT * FROM trade_cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existing.length > 0) {
      // Update quantity
      await db.query(
        'UPDATE trade_cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    } else {
      // Insert new item
      await db.query(
        'INSERT INTO trade_cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
    }

    res.json({ message: 'Item added to trade cart' });
  } catch (err) {
    console.error("Error adding to trade cart:", err); // Detailed logging
    res.status(500).json({ message: 'Server error adding to trade cart', error: err.message });
  }
});


/**
 * Get all trade cart items for a specific user
 * GET /api/tradecart/:userId
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT tc.id, p.name, tc.quantity 
       FROM trade_cart tc 
       JOIN products p ON tc.product_id = p.id 
       WHERE tc.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database fetch error' });
  }
});

/**
 * Checkout (clear trade cart and process trade)
 * POST /api/tradecart/checkout/:userId
 */
router.post('/checkout/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Here you would normally insert into a trades table, handle stock, etc.
    await db.query('DELETE FROM trade_cart WHERE user_id = ?', [userId]);
    res.json({ message: '✅ Trade confirmed and cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Error confirming trade' });
  }
});

export default router;
