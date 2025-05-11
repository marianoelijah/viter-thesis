// routes/sellerProfileRoutes.js
import express from 'express';
const router = express.Router();
import db from '../config/db.js';

// GET seller profile
router.get(':sellerId', async (req, res) => {
  const { sellerId } = req.params;
  try {
    const [rows] = await db.query('SELECT store_name AS storeName, email FROM sellers WHERE id = ?', [sellerId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Seller not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
});

// PUT update seller profile
router.put(':sellerId', async (req, res) => {
  const { sellerId } = req.params;
  const { storeName, email } = req.body;
  try {
    await db.query('UPDATE sellers SET store_name = ?, email = ? WHERE id = ?', [storeName, email, sellerId]);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
});

export default router;
