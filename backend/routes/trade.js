import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from '../config/db.js';

const router = express.Router();

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload folder exists
const uploadDir = path.join(__dirname, '../uploads/trades');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'seedling_db'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as ID', db.threadId);
// });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// POST /api/trades
router.post('/', upload.fields([
  { name: 'requestImage', maxCount: 1 },
  { name: 'offerImage', maxCount: 1 },
]), (req, res) => {
  try {
    const { requestTitle, requestCategory, offerTitle, offerCategory } = req.body;
    const requestImage = req.files['requestImage']?.[0]?.filename || null;
    const offerImage = req.files['offerImage']?.[0]?.filename || null;

    const sql = `
      INSERT INTO trades (request_title, request_category, request_image, offer_title, offer_category, offer_image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [requestTitle, requestCategory, requestImage, offerTitle, offerCategory, offerImage], (err, result) => {
      if (err) {
        console.error('SQL Error:', err);  // ← this is crucial
        return res.status(500).json({ message: 'Failed to submit trade', error: err.message });
      }

      res.status(201).json({ message: 'Trade submitted successfully' });
    });
  } catch (err) {
    console.error('Server Error:', err);  // ← catch block error
    res.status(500).json({ message: 'Unexpected error submitting trade', error: err.message });
  }
});


// GET all trades
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM trades ORDER BY created_at DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching trades:', err);
      return res.status(500).json({ message: 'Failed to fetch trades' });
    }

    res.status(200).json(results);
  });
});


export default router;