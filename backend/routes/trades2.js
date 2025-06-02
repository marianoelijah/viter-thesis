import express from 'express';
import db from '../config/db.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // or use diskStorage if saving to disk
const upload = multer({ storage: storage });

const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({ message: 'Trades2 route working!' });
// });

// GET all trades (already fixed)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trades2 ORDER BY created_at DESC, id DESC');
    console.log("✅ Trades2 fetched:", rows.length, "rows");
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching trades:', err.message);
    res.status(500).json({ error: 'Failed to fetch trade products' });
  }
});

// POST trade product
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      quantity,
      unit,
      description,
      location,
      user_id
    } = req.body;

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    const imageUrls = imagePaths.join(',');

    const [result] = await db.query(
      'INSERT INTO trades2 (name, category, price, quantity, unit, description, location, images, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, price, quantity, unit, description, location, imageUrls, user_id]
    );

    res.status(201).json({ message: 'Trade product uploaded successfully', tradeId: result.insertId });
  } catch (err) {
    console.error('❌ Error uploading trade product:', err);
    res.status(500).json({ error: 'Failed to upload trade product' });
  }
});


export default router;
