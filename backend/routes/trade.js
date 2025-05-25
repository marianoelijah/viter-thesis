import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from '../config/db.js';

const router = express.Router();

// // ESM replacement for __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure the upload folder exists
// const uploadDir = path.join(__dirname, '../uploads/trades');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage });

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup upload folder
const uploadDir = path.join(__dirname, '../uploads/trades');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });


// POST /api/trades
// DEBUG ROUTE — log everything
router.post('/', upload.fields([
  { name: 'requestImage', maxCount: 1 },
  { name: 'offerImage', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('✅ Incoming request');
    console.log('➡️ BODY:', req.body);
    console.log('➡️ FILES:', req.files);

    const {
      requesterUserId,
      requesterProductId,
      receiverUserId,
      receiverProductId,
      status,
      requesterQuantity,
      receiverQuantity,
    } = req.body;

    const requestImage = req.files?.['requestImage']?.[0]?.filename || null;
    const offerImage = req.files?.['offerImage']?.[0]?.filename || null;

    console.log('📸 requestImage:', requestImage);
    console.log('📸 offerImage:', offerImage);

    const [result] = await db.query(
      `INSERT INTO trade_requests 
      (requesterUserId, requesterProductId, receiverUserId, receiverProductId, status, requestImage, offerImage, requesterQuantity, receiverQuantity) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        requesterUserId,
        requesterProductId,
        receiverUserId,
        receiverProductId,
        status,
        requestImage,
        offerImage,
        requesterQuantity,
        receiverQuantity
      ]
    );

    console.log('✅ Trade request inserted successfully.');
    res.status(200).json({ message: 'Trade request submitted successfully', insertId: result.insertId });
  } catch (error) {
    console.error('❌ Error in trade request submission:', error);
    res.status(500).json({ message: 'Unexpected error submitting trade', error: error.message });
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