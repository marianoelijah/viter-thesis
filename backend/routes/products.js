import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const router = express.Router();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

/** ✅ Add Product */
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, quantity, availableStock, category } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const [result] = await db.execute(`
      INSERT INTO products (name, description, price, quantity, availableStock, category, image, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `, [name, description, price, quantity, availableStock, category, image]);

    res.status(201).json({ message: 'Product added successfully!', productId: result.insertId });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ error: 'Failed to add product.' });
  }
});

/** ✅ Get All Products */
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM products');
    res.json(results);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/** ✅ Decrease stock (POST version) */
router.post('/update-stock', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE products SET availableStock = availableStock - ? WHERE id = ? AND availableStock >= ?',
      [quantity, productId, quantity]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    res.json({ message: 'Stock updated' });
  } catch (error) {
    console.error('Stock update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/** ✅ Decrease stock (PUT version) */
router.put('/:id/decrease-stock', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const [result] = await db.execute(
      `UPDATE products 
       SET availableStock = availableStock - ? 
       WHERE id = ? AND availableStock >= ?`,
      [quantity, id, quantity]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Insufficient stock or product not found" });
    }

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: "Database error" });
  }
});





export default router;
