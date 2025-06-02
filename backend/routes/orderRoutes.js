import express from 'express';
import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
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
      subtotal,
      tax,
      total,
      items
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO orders2 
        (full_name, email, phone, address, city, postal_code, notes, payment_method, subtotal, tax, total) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        notes,
        paymentMethod,
        subtotal,
        tax,
        total,
      ]
    );

    const orderId = result.insertId;

    for (const item of items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, price) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.name || 'Unnamed',
          item.quantity,
          item.price
        ]
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    console.error("❌ Error saving order:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: "Failed to place order" });
  }
});


export default router;
