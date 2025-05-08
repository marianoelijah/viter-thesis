import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';


// Route imports
import productsRoutes from './routes/products.js';
import authRoutes from './routes/authRoutes.js';
import tradeCartRoutes from './routes/tradeCart.js';
import tradeRoutes from './routes/tradeRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Mysql Database
// config/db.js
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seedling_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Recommendation API from python
import axios from 'axios'; // Correct for ES Modules


async function getRecommendations(userEncoded) {
    try {
        const response = await axios.post('http://192.168.114.67:5000/recommend', {
            user_encoded: userEncoded
        });

        console.log('Recommended Products:', response.data.recommended_product_ids);
    // Optionally: return this data to the frontend
    return response.data.recommended_product_ids;
  } catch (error) {
    console.error('Error getting recommendations:', error.message);
    return [];
  }
}

// Example call
getRecommendations(10);

// Initialize express app
const app = express();

const PORT = process.env.PORT || 3000;

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse incoming JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Static file handling
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => res.send('CORS is enabled!'));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/products', productsRoutes);  // Optional, maybe duplicate
app.use('/api/tradecart', tradeCartRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api', tradeRoutes); // ✅ Mounts it correctly
app.use('/api/donation', donationRoutes);
app.use('/api/orders2', orderRoutes);  // For checkout/order handling
app.use(productRoutes); // For product handling

app.use((req, res) => {
  res.status(404).send(`❌ Route not found: ${req.originalUrl}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
