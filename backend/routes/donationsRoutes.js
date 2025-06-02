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


// POST Add/Upload donation product
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

// router.post('/', upload.single('image'), async (req, res) => {
//   const { productName, description, quantity, availableStock, category, type, userId } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!productName || !quantity || !category || !type || !userId) {
//     return res.status(400).json({ error: "Missing required fields." });
//   }

//   const sql = `
//     INSERT INTO donations (productName, description, quantity, availableStock, category, image, type, userId)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [productName, description || null, quantity, availableStock || 0, category, image, type, userId];

//   try {
//     const [result] = await db.query(sql, values);
//     res.status(201).json({ message: "Donation added successfully", donationId: result.insertId });
//   } catch (err) {
//     console.error("Insert donation error:", err);
//     res.status(500).json({ error: "Database insert error" });
//   }
// });


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

router.put('/:id/approve', async (req, res) => {
  const requestId = req.params.id;
  const sql = "UPDATE donation_requests SET status = 'Approved' WHERE id = ?";
  try {
    const [result] = await db.query(sql, [requestId]);
    res.status(200).json({ message: "Request approved successfully" });
  } catch (err) {
    console.error("Error approving request:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/requests
router.delete("/", async (req, res) => {
  try {
    await db.query("DELETE FROM donation_requests"); // Adjust table name if different
    res.status(200).json({ message: "All donation requests deleted" });
  } catch (err) {
    console.error("Error deleting requests:", err.message);
    res.status(500).json({ error: "Failed to delete all donation requests" });
  }
});

// GET /api/donation/user/:id → get all donation requests by a specific user
// router.get('/user/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const [results] = await db.query(
//       'SELECT * FROM donations WHERE type = "request" AND userId = ?',
//       [userId]
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching user's donation requests:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Get all donation requests by userId
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [results] = await db.query(
      'SELECT * FROM donations WHERE type = "request" AND userId = ?',
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching user's donation requests:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST /api/donation/requests
router.post('/requests', async (req, res) => {
  const { donationId, requesterName, email, message, status } = req.body;

  if (!donationId || !requesterName) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const sql = `
    INSERT INTO donation_requests (donation_id, requester_name, email, message, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [donationId, requesterName, email || null, message || null, status || "Pending"];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: "Request submitted successfully", requestId: result.insertId });
  } catch (err) {
    console.error("Insert donation request error:", err);
    res.status(500).json({ error: "Database insert error" });
  }
});






export default router;
