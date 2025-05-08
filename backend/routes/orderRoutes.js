import express from 'express';
import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new order
router.post("/api/orders2", async (req, res) => {
  try {
    console.log("📦 Incoming order payload:", req.body); 
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      notes,
      paymentMethod,
    } = req.body.userDetails;
    

    const full_name = fullName;
    const postal_code = postalCode;
    const payment_method = paymentMethod;
    const { subtotal, tax, total, items } = req.body;

    // Insert into orders2
    const [result] = await db.query(
      `INSERT INTO orders2 
        (full_name, email, phone, address, city, postal_code, notes, payment_method, subtotal, tax, total) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        phone,
        address,
        city,
        postal_code,
        notes,
        payment_method,
        subtotal,
        tax,
        total,
      ]
    );

    const orderId = result.insertId;

    for (const item of items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
