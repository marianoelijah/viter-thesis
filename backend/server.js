import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import multer from 'multer';
import fs from 'fs';


// Route imports
import productsRoutes from './routes/products.js';
import authRoutes from './routes/authRoutes.js';
import donationsRoutes from './routes/donations.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
// import tradeRouter from './routes/tradeRoutes.js';
import tradeCartRoutes from './routes/tradeCart.js';
import requestRoutes from "./routes/requests.js";
import inventoryRouter from './routes/inventory.js';
import sellerProfileRoutes from "./routes/sellerProfile.js";
import tradeRoutes from './routes/trade.js';
import tradeRequestRoute from './routes/tradeRequest.js';



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

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });



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
// app.use('/api/trade', tradeRouter);
app.use('/api/donations', donationsRoutes);
app.use('/api/orders2', orderRoutes);  // For checkout/order handling
app.use(productRoutes); // For product handling
app.use('/api/tradecart', tradeCartRoutes);
app.use("/api/requests", requestRoutes); 
app.use('/api/inventory', inventoryRouter);
app.use("/api/seller-profile", sellerProfileRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/trade-requests', tradeRequestRoute);

app.use((req, res) => {
  res.status(404).send(`❌ Route not found: ${req.originalUrl}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

