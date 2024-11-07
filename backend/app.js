const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  }));
app.use(express.json());

app.use('/api', apiRoutes);  // All API routes are prefixed with /api

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  