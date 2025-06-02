import express from 'express';
import db from '../config/db.js';


const router = express.Router();



// routes/tradeCart.js (append this)
router.get('/:buyer_id', (req, res) => {
    const buyerId = req.params.buyer_id;
  
    const query = `
      SELECT tc.id AS cart_id, tc.quantity, tc.added_at,
             p.id AS product_id, p.name, p.description, p.image, p.price
      FROM trade_cart tc
      JOIN products p ON tc.product_id = p.id
      WHERE tc.buyer_id = ?
    `;
  
    db.query(query, [buyerId], (err, results) => {
      if (err) {
        console.error('Error fetching trade cart:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      res.status(200).json(results);
    });
  });

// server.js or routes/trade.js
router.post('/api/tradecart/checkout', (req, res) => {
  const { buyerId, cartItems } = req.body;

  if (!buyerId || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const sql = `
    INSERT INTO trade_orders (buyer_id, product_id, quantity)
    VALUES ?
  `;

  const values = cartItems.map(item => [
    buyerId,
    item.id,       // assuming item.id is product_id
    item.quantity
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting trade orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true, insertedRows: result.affectedRows });
  });
});

  // routes/tradeCart.js ///api/tradecart/checkout/:buyer_id
router.post('/checkout/:buyer_id', (req, res) => {
    const buyerId = req.params.buyer_id;
  
    const getCartItems = `
      SELECT product_id, quantity FROM trade_cart WHERE buyer_id = ?
    `;
  
    const insertOrder = `
      INSERT INTO trade_orders (buyer_id, product_id, quantity, ordered_at)
      VALUES (?, ?, ?, NOW())
    `;
  
    const clearCart = `
      DELETE FROM trade_cart WHERE buyer_id = ?
    `;
  
    db.query(getCartItems, [buyerId], (err, cartItems) => {
      if (err) return res.status(500).json({ message: 'Error fetching cart items' });
  
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      // Insert all items as trade orders
      const values = cartItems.map(item => [buyerId, item.product_id, item.quantity]);
  
      db.query(insertOrder, [values], (err) => {
        if (err) return res.status(500).json({ message: 'Error saving trade orders' });
  
        // Clear trade cart
        db.query(clearCart, [buyerId], (err) => {
          if (err) return res.status(500).json({ message: 'Error clearing cart' });
  
          res.status(200).json({ message: 'Trade confirmed successfully' });
        });
      });
    });
  });

 

  

export default router;
