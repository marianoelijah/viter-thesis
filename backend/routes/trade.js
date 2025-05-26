import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from '../config/db.js';  // Ensure this supports promises or use util.promisify

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads/trades');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, quantity, category, description, location, user_id } = req.body;
    const images = req.files;

    if (!name || !price || !quantity || !category || !location || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }

    const imageFilenames = images.map(file => file.filename);
    const imagesJson = JSON.stringify(imageFilenames);

    const insertQuery = `
      INSERT INTO trades (name, price, quantity, category, description, location, images, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, price, quantity, category, description || '', location, imagesJson, user_id];

    const [result] = await db.query(insertQuery, values);

    res.status(201).json({ message: 'Trade product added successfully', tradeId: result.insertId });
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trades');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});



// PUT /api/trades/:id/status - Update trade request status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusMap = { pending: 0, confirmed: 1, cancelled: 2 };
    const numericStatus = statusMap[status?.toLowerCase()];
    if (numericStatus === undefined) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const [result] = await db.query('UPDATE trade_requests SET status = ? WHERE id = ?', [numericStatus, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Trade request not found' });

    res.json({ message: 'Trade status updated successfully' });
  } catch (err) {
    console.error('DB Update Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


export default router;
