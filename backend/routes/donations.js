import express from "express";
import mysql from "mysql2";

const router = express.Router();

// ✅ Your MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "worldpeas_v2"
});

// ✅ POST /api/donations - Save a new donation
router.post("/api/donations", (req, res) => {
  const { name, quantity, notes } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and quantity are required." });
  }

  const sql = "INSERT INTO donations (name, quantity, notes) VALUES (?, ?, ?)";
  db.query(sql, [name, quantity, notes], (err, result) => {
    if (err) {
      console.error("Error saving donation:", err);
      return res.status(500).json({ error: "Failed to save donation" });
    }
    res.status(201).json({ message: "Donation saved", id: result.insertId });
  });
});

// ✅ GET /api/donations - Get all donation records
router.get("/api/donations", (req, res) => {
  const sql = "SELECT * FROM donations ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching donations:", err);
      return res.status(500).json({ error: "Failed to fetch donations" });
    }
    res.status(200).json(results);
  });
});

export default router;
