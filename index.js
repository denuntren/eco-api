const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();

app.use(cors()); 
app.use(express.json());

const PORT = 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/eco_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const ecoRoutes = require('./routes/indicatorRoutes');
app.use('/api/eco', ecoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
