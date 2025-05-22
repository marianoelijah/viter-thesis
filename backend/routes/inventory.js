import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET single item by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM inventory WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Item not found' });

    const item = {
      ...results[0],
      price: parseFloat(results[0].price),
    };

    res.json(item);
  });
});

// POST new item
router.post('/', (req, res) => {
  const { name, price, quantity, category, expiration } = req.body;
  const sql = 'INSERT INTO inventory (name, price, quantity, category, expiration) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, price, quantity, category, expiration], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Item added successfully' });
  });
});

// PUT update item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category, expiration } = req.body;
  const sql = 'UPDATE inventory SET name = ?, price = ?, quantity = ?, category = ?, expiration = ? WHERE id = ?';
  db.query(sql, [name, price, quantity, category, expiration, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item updated successfully' });
  });
});

// DELETE item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM inventory WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item deleted successfully' });
  });
});

// GET inventory with filtering and counts
router.get('/', (req, res) => {
  const { name = '', category = '' } = req.query;

  // Build the base query parts
  const baseQuery = 'SELECT * FROM inventory';
  const whereClauses = [];
  const params = [];

  if (name) {
    whereClauses.push('name LIKE ?');
    params.push(`%${name}%`);
  }
  if (category) {
    whereClauses.push('category LIKE ?');
    params.push(`%${category}%`);
  }

  // Compose WHERE clause if any filters present
  const whereString = whereClauses.length ? ` WHERE ${whereClauses.join(' AND ')}` : '';

  // Query total count (without filters)
  const totalCountQuery = 'SELECT COUNT(*) AS totalCount FROM inventory';

  // Query filtered count and filtered rows
  const filteredCountQuery = `SELECT COUNT(*) AS filteredCount FROM inventory${whereString}`;
  const filteredRowsQuery = `${baseQuery}${whereString}`;

  // Execute queries in parallel for performance
  db.query(totalCountQuery, (err, totalCountResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(filteredCountQuery, params, (err, filteredCountResult) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(filteredRowsQuery, params, (err, filteredRows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          products: filteredRows,
          totalProducts: totalCountResult[0].totalCount,
          filteredCount: filteredCountResult[0].filteredCount,
        });
      });
    });
  });
});


export default router;
