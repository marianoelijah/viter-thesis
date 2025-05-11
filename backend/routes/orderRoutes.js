import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Place Order with Stock Deduction
router.post('/', async (req, res) => {
  const {
    fullName, email, phone, address, city, postalCode,
    notes, paymentMethod, subtotal, tax, total, items, userId
  } = req.body;

  const conn = await db.getConnection(); // Use pooled connection
  try {
    await conn.beginTransaction();

    // Insert into `orders2` table
    const [orderResult] = await conn.query(
      `INSERT INTO orders2 
       (user_id, full_name, email, phone, address, city, postal_code, notes, payment_method, subtotal, tax, total, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [userId, fullName, email, phone, address, city, postalCode, notes, paymentMethod, subtotal, tax, total]
    );
    const orderId = orderResult.insertId;

    // Loop through items to insert and update stock
    for (const item of items) {
      // Check stock
      const [stockRows] = await conn.query(`SELECT availableStock FROM products WHERE id = ?`, [item.id]);
      const availableStock = stockRows[0]?.availableStock;

      if (availableStock === undefined || availableStock < item.quantity) {
        await conn.rollback();
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }

      // Insert item
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, item.price]
      );

      // Deduct stock
      await conn.query(
        `UPDATE products SET availableStock = availableStock - ? WHERE id = ?`,
        [item.quantity, item.id]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    console.error('❌ Order placement failed:', err);
    await conn.rollback();
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    conn.release();
  }
});

// Get Order Details by ID
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const [orderResults] = await db.query('SELECT * FROM orders2 WHERE id = ?', [orderId]);
    if (orderResults.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResults[0];

    const [itemsResults] = await db.query(
      `SELECT oi.*, p.name AS product_name, p.image AS product_image
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ ...order, items: itemsResults });
  } catch (err) {
    console.error('❌ Failed to fetch order details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Order Details in Transactions
// ✅ This is the one to keep and use in frontend
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const [orderResults] = await db.query('SELECT * FROM orders2 WHERE id = ?', [orderId]);
    if (orderResults.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResults[0];

    const [itemsResults] = await db.query(
      `SELECT oi.*, p.name AS product_name, p.image AS product_image
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ ...order, items: itemsResults });
  } catch (err) {
    console.error('❌ Failed to fetch order details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get Available Products
router.get('/products', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products WHERE availableStock > 0');
    res.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Route to handle order placement
// router.post('/orders2', (req, res) => {
//   const {
//     fullName,
//     email,
//     phone,
//     address,
//     city,
//     postalCode,
//     notes,
//     paymentMethod,
//     subtotal,
//     tax,
//     total,
//     items, // Array of items in the cart
//   } = req.body;

//   // Step 1: Insert the order details into the orders table
//   const insertOrderQuery = `
//     INSERT INTO orders (full_name, email, phone, address, city, postal_code, notes, payment_method, subtotal, tax, total)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const orderValues = [fullName, email, phone, address, city, postalCode, notes, paymentMethod, subtotal, tax, total];

//   db.query(insertOrderQuery, orderValues, (err, result) => {
//     if (err) {
//       console.error('Error inserting order:', err);
//       return res.status(500).json({ message: 'Error placing order' });
//     }

//     const orderId = result.insertId; // Get the inserted order's ID

//     // Step 2: Insert the items into the order_items table
//     const insertItemsQuery = `
//       INSERT INTO order_items (order_id, product_id, name, price, quantity, total_price)
//       VALUES ?
//     `;

//     const orderItems = items.map(item => [
//       orderId,
//       item.productId,
//       item.name,
//       item.price,
//       item.quantity,
//       item.price * item.quantity, // total_price for each item
//     ]);

//     db.query(insertItemsQuery, [orderItems], (err, result) => {
//       if (err) {
//         console.error('Error inserting order items:', err);
//         return res.status(500).json({ message: 'Error placing order items' });
//       }

//       return res.status(201).json({
//         message: 'Order placed successfully!',
//         orderId, // Return the order ID for redirection
//       });
//     });
//   });
// });

export default router;