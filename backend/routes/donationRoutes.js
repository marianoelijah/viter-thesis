import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// POST route to handle donation request
router.post("/api/donation-request", async (req, res) => {
  const { product_id, buyer_id, quantity } = req.body;

  if (!product_id || !buyer_id || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query(
      "INSERT INTO donation_requests (product_id, buyer_id, quantity) VALUES (?, ?, ?)",
      [product_id, buyer_id, quantity]
    );
    res.status(200).json({ message: "Request submitted." });
  } catch (err) {
    console.error("Error inserting donation request:", err);
    res.status(500).json({ error: "Server error." });
  }
});


// Get all donation requests with joined info
router.get("/api/donation-requests", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT dr.*, p.name AS product_name, u.name AS buyer_name
      FROM donation_requests dr
      JOIN products p ON dr.product_id = p.id
      JOIN users u ON dr.buyer_id = u.id
      ORDER BY dr.request_date DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching requests." });
  }
});

// Approve/reject donation request
router.put("/api/donation-requests/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query("UPDATE donation_requests SET status = ? WHERE id = ?", [status, id]);

    // OPTIONAL: Update stock if approved
    if (status === "approved") {
      const [[request]] = await db.query("SELECT * FROM donation_requests WHERE id = ?", [id]);
      await db.query("UPDATE products SET availableStock = availableStock - ? WHERE id = ?", [
        request.quantity,
        request.product_id,
      ]);
    }

    res.json({ message: "Request updated." });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error." });
  }
});



export default router;
