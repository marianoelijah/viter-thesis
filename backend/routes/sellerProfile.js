import express from "express";
import db from '../config/db.js';

const router = express.Router();

// GET seller profile
router.get("/:id", (req, res) => {
  const sellerId = req.params.id;
  const query = "SELECT store_name, email FROM sellers WHERE id = ?";

  db.query(query, [sellerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(results[0]);
  });
});

// PUT update seller profile
router.put("/:id", (req, res) => {
  const sellerId = req.params.id;
  const { store_name, email } = req.body;

  const query = "UPDATE sellers SET store_name = ?, email = ? WHERE id = ?";
  db.query(query, [store_name, email, sellerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ message: "Profile updated successfully" });
  });
});

export default router;
