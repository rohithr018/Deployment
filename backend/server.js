const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Optional: to allow cross-origin requests
const authRoutes = require('./routes/auth.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests (optional, but useful for frontend-backend communication)

// Routes
app.use('/api/auth', authRoutes); // Auth routes (login, register)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
    });
