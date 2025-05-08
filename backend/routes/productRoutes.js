// productRoutes.js (ESM version)

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET /api/products/:id
router.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [productId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length === 0)
      return res.status(404).json({ message: 'Product not found' });

    res.json(results[0]);
  });
});

// PUT /api/products/:id
router.put('/api/products/:id', upload.single('image'), (req, res) => {
  const productId = req.params.id;
  const {
    name,
    description,
    price,
    quantity,
    availableStock,
    category,
    existingImage,
  } = req.body;

  let image = existingImage;

  if (req.file) {
    image = req.file.filename;

    // Delete old image
    if (existingImage) {
      const oldPath = path.join(__dirname, 'uploads', existingImage);
      fs.unlink(oldPath, (err) => {
        if (err) console.warn('Old image delete error:', err.message);
      });
    }
  }

  const sql = `
    UPDATE products
    SET name=?, description=?, price=?, quantity=?, availableStock=?, category=?, image=?
    WHERE id=?
  `;
  const values = [
    name,
    description,
    price,
    quantity,
    availableStock,
    category,
    image,
    productId,
  ];

  db.query(sql, values, (err) => {
    if (err)
      return res.status(500).json({ message: 'Update failed', error: err });

    res.json({ message: 'Product updated successfully' });
  });
});

export default router;
