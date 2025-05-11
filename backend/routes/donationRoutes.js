import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// POST route to handle donation request
router.post('/api/donation-request', async (req, res) => {
  try {
    const { productName, donor, dateRequested, userId } = req.body;
    
    // Validate input data (optional but recommended)
    if (!productName || !donor || !dateRequested || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save donation request to the database
    const result = await db.query(
      'INSERT INTO donation_requests (product_name, donor, date_requested, user_id) VALUES (?, ?, ?, ?)',
      [productName, donor, dateRequested, userId]
    );

    // Send response if successful
    res.status(200).json({ message: 'Donation request submitted successfully!', donationId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
