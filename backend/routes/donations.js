import express from 'express';
import db from '../config/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const router = express.Router();

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


// POST Add donation product
router.post('/', upload.single('image'), async (req, res) => {
  const { productName, description, quantity, availableStock, category, type } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!productName || !quantity || !category || !type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const sql = `
    INSERT INTO donations (productName, description, quantity, availableStock, category, image, type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [productName, description || null, quantity, availableStock || 0, category, image, type];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: "Donation added successfully", donationId: result.insertId });
  } catch (err) {
    console.error("Insert donation error:", err);
    res.status(500).json({ error: "Database insert error" });
  }
});

// GET all donations
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM donations WHERE type = "donation"');
    res.json(results);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// router.get('/donations', async (req, res) => {
//   const [rows] = await connection.query('SELECT * FROM donations');
//   res.json(rows);
// });


router.put('/donations/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const allowedStatuses = ['Pending', 'Approved', 'Claimed', 'Completed', 'Rejected'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  await connection.query('UPDATE donations SET status = ? WHERE donationId = ?', [status, id]);
  res.json({ message: 'Status updated successfully' });
});

// PUT endpoint to grant donation
router.put('/:requestId', (req, res) => {
  const requestId = req.params.requestId;

  const sql = "UPDATE donation_requests SET status = 'Granted' WHERE id = ?";
  db.query(sql, [requestId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Donation request granted successfully' });
  });
});






export default router;
