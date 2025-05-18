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
    const [rows] = await db.query('SELECT * FROM donations');
    res.json(rows);
  } catch (err) {
    console.error('Fetch donations error:', err);
    res.status(500).json({ error: 'Database fetch error' });
  }
});





export default router;
