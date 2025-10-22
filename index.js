const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/eco_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const ecoRoutes = require('./routes/indicatorRoutes');
app.use('/api/eco', ecoRoutes);
