import express from 'express';
import db from '../config/db.js';



const router = express.Router();

// POST /api/requests
router.post("/", async (req, res) => {
  const { name, email, message, donationId } = req.body;

  if (!name || !email || !message || !donationId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `INSERT INTO donation_requests (name, email, message, donation_id) VALUES (?, ?, ?, ?)`;
    await db.query(sql, [name, email, message, donationId]);
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Error saving request:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
});

// Make sure this file is using top-level `async` functions
router.get("/", async (req, res) => {
  try {
    console.log("Fetching donation requests..."); // Add this
    const [results] = await db.query("SELECT * FROM donation_requests ORDER BY id DESC");
    console.log("Fetched results:", results);     // Add this
    res.json(results);
  } catch (err) {
    console.error("Error fetching requests:", err); // Will show actual MySQL error
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// Update status directly
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["Pending", "Approved", "Claimed", "Completed", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.query("UPDATE donation_requests SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("Failed to update status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/requests/:id/grant
router.put('/:id/grant', (req, res) => {
  const requestId = req.params.id;

  const query = "UPDATE donation_requests SET status = 'Approved' WHERE id = ?";
  db.query(query, [requestId], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to approve request" });
    res.json({ message: "Request approved" });
  });
});

// Reject
router.put('/:id/reject', async (req, res) => {
  await db.query("UPDATE donation_requests SET status = 'Rejected' WHERE id = ?", [req.params.id]);
  res.json({ message: 'Request rejected' });
});

// Approve donation request
router.put('/:id/approve', async (req, res) => {
  const requestId = req.params.id;

  try {
    const [result] = await db.query(
      "UPDATE donation_requests SET status = 'Approved' WHERE id = ?",
      [requestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request approved successfully" });
  } catch (err) {
    console.error("Error approving request:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all requests by userId
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [results] = await db.query(
      'SELECT * FROM donation_requests WHERE user_id = ?',
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

















export default router;
