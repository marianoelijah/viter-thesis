import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET all trades (already fixed)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trades ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching trades:', err);
    console.log("🔍 Fetched products response:", res.data);
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

// // ✅ POST route to handle product upload
// router.post('/', upload.array('images'), async (req, res) => {
//   try {
//     console.log('🔍 Incoming POST /api/trades...');
//     console.log('🧾 Request body:', req.body);
//     console.log('🖼️ Uploaded files:', req.files);

//     const {
//       name,
//       category,
//       price,
//       quantity,
//       unit,
//       description,
//       location,
//       user_id
//     } = req.body;

//     if (!req.files || req.files.length === 0) {
//       console.error('🚫 No images uploaded.');
//       return res.status(400).json({ error: 'No images uploaded' });
//     }

//     const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
//     const imageUrls = imagePaths.join(',');

//     const [result] = await db.query(
//       'INSERT INTO trades2 (name, category, price, quantity, unit, description, location, images, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, category, price, quantity, unit, description, location, imageUrls, user_id]
//     );

//     console.log('✅ Trade inserted with ID:', result.insertId);
//     res.status(201).json({ message: 'Trade product uploaded successfully', tradeId: result.insertId });

//   } catch (err) {
//     console.error('❌ Upload error:', err);
//     res.status(500).json({ error: 'Failed to upload trade product', details: err.message });
//   }
// });


export default router;
