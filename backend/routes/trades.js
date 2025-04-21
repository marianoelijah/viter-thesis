// server.js or routes/trades.js
app.post('/api/trades', (req, res) => {
    const { userId, offeredItem, requestedItem } = req.body;
  
    if (!userId || !offeredItem || !requestedItem) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    const sql = `
      INSERT INTO trades (user_id, offered_item, requested_item)
      VALUES (?, ?, ?)
    `;
  
    db.query(sql, [userId, offeredItem, requestedItem], (err, result) => {
      if (err) {
        console.error("Error saving trade:", err);
        return res.status(500).json({ message: "Failed to save trade" });
      }
      res.status(201).json({ message: "Trade saved successfully", tradeId: result.insertId });
    });
  });
  