import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../config/db.js';

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST donated product
router.post('/upload-donation', upload.single('image'), (req, res) => {
  const { name, category, quantity, date, donorName, notes } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO donated_products 
    (name, category, quantity, image, date, donorName, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, category, quantity, image, date, donorName, notes], (err, result) => {
    if (err) {
      console.error('Error uploading donation:', err);
      return res.status(500).json({ message: 'Error uploading donation' });
    }
    res.status(200).json({ message: 'Donation uploaded successfully' });
  });
});

export default router;
