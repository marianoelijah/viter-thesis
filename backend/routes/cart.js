import express from 'express';
const router = express.Router();

// Temporary in-memory cart store
const cart = [];

// POST /api/cart/add
router.post('/add', (req, res) => {
  const { id, name, price, image, quantity } = req.body;

  if (!id || !name || !price || !image || !quantity) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // You can also check if the item exists and just increase quantity
  cart.push({ id, name, price, image, quantity });
  res.status(201).json({ message: 'Product added to cart', cart });
});

export default router;
