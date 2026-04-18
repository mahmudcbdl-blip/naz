require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database Connection Failed", details: err.message });
  }
});

// API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root Test Route
app.get('/', (req, res) => {
  res.send('🚀 NAZ Online Shop Server is Running Perfectly...');
});

// --- Catch-all for 404 Routes ---
app.use((req, res) => {
  res.status(404).json({ message: "Route not found. Check your URL spelling!" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({ 
    message: "Something went wrong on our end!",
    error: process.env.NODE_ENV === 'production' ? null : err.message 
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 SERVER ACTIVE ON PORT: ${PORT}`);
    console.log(`✅ ROUTES LOADED: Products, Orders`);
  });
}

module.exports = app;