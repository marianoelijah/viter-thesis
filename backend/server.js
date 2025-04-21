import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import donationRoutes from './routes/donations.js'; // adjust path if needed
import tradeRoutes from './routes/tradeRoutes.js';





const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
// const cors = require("cors");

// Serve static files
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use(donationRoutes);
app.use('/api/trades', tradeRoutes);
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "worldpeas_v2",
});

// Salt rounds for bcrypt
const saltRounds = 10;

// Registration route
app.post("/register", (req, res) => {
    console.log("Register route was hit!");
    console.log("Request Body:", req.body);

    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hashedPassword) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const sql = "INSERT INTO users (username, email, password) VALUES (?)";
        const values = [req.body.username, req.body.email, hashedPassword];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ Error: "Error inserting user into database" });
            }
            console.log("User registered:", req.body);
            return res.json({ Status: "User registered successfully", result });
        });
    });
});

// Login route
app.post("/login", (req, res) => {
    console.log("Email received:", req.body.email);
    console.log("Password received:", req.body.password);

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.json({ Error: "Error querying the database" });
        }

        if (result.length > 0) {
            console.log("User found:", result[0]);

            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.json({ Error: "Error comparing password" });
                }

                if (response) {
                    console.log("Login successful for:", req.body.email);
                    return res.json({ Status: "Login successful" });
                } else {
                    console.log("Wrong password for:", req.body.email);
                    return res.json({ Error: "Wrong password" });
                }
            });
        } else {
            console.log("No user found with email:", req.body.email);
            return res.json({ Error: "Email does not exist" });
        }
    });
});

// Donations route
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

  // DELETE a donation by ID
app.delete("/api/donations/:id", (req, res) => {
    const donationId = req.params.id;
    const sql = "DELETE FROM donations WHERE id = ?";
    db.query(sql, [donationId], (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to delete donation" });
      res.json({ message: "Donation deleted successfully" });
    });
  });
  
  // PUT (update) a donation by ID
  app.put("/api/donations/:id", (req, res) => {
    const { name, quantity, notes } = req.body;
    const { id } = req.params;
    const sql = "UPDATE donations SET name = ?, quantity = ?, notes = ? WHERE id = ?";
    db.query(sql, [name, quantity, notes, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to update donation" });
      res.json({ message: "Donation updated successfully" });
    });
  });
  
  // Inside routes or your Express server
app.post('/api/trades', (req, res) => {
  const { requestedItem, offeredItem } = req.body;

  if (!requestedItem || !offeredItem) {
    return res.status(400).json({ error: 'Missing trade items' });
  }

  // Simulate storing to database
  console.log(`New trade submitted: ${offeredItem} in exchange for ${requestedItem}`);

  res.status(201).json({ message: 'Trade request received successfully' });
});

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




  // Start server
app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
