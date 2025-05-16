import express from 'express';
import db from '../config/db.js'; // Adjust the path if needed

const router = express.Router();

/**
 * Add item to trade cart (or update quantity if it already exists)
 * POST /api/tradecart/add
 */
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [existing] = await db.query(
      'SELECT * FROM trade_cart WHERE buyer_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE trade_cart SET quantity = quantity + ? WHERE buyer_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    } else {
      await db.query(
        'INSERT INTO trade_cart (buyer_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
    }

    res.json({ message: '✅ Item added to trade cart' });
  } catch (err) {
    console.error("❌ Error adding to trade cart:", err);
    res.status(500).json({
      message: 'Server error adding to trade cart',
      error: err.message,
    });
  }
});

// Get trade cart items for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT tc.id, tc.quantity, p.name
      FROM trade_cart tc
      JOIN products p ON tc.product_id = p.id
      WHERE tc.buyer_id = ?
    `;
    const [rows] = await db.query(sql, [userId]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching trade cart items:', error);
    res.status(500).json({ message: 'Failed to fetch trade cart items', error: error.message });
  }
});


/**
 * Checkout (clear trade cart)
 * POST /api/tradecart/checkout/:userId
 */
router.post('/checkout/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // You could also log to a trades table here
    await db.query('DELETE FROM trade_cart WHERE buyer_id = ?', [userId]);
    res.json({ message: '✅ Trade confirmed and cart cleared' });
  } catch (err) {
    console.error("❌ Error during checkout:", err);
    res.status(500).json({ message: '❌ Error confirming trade' });
  }
});

// DELETE a single item from the user's trade cart
router.delete('/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    await db.query('DELETE FROM trade_cart WHERE id = ? AND buyer_id = ?', [itemId, userId]);
    res.json({ message: '🗑️ Item removed from trade cart' });
  } catch (err) {
    console.error('❌ Error removing item from trade cart:', err);
    res.status(500).json({ message: 'Server error while removing item' });
  }
});


export default router;
