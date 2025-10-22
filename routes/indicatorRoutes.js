const express = require('express');
const router = express.Router();
const EcoIndicator = require('../models/EcoIndicator');

// Create
router.post('/', async (req, res) => {
  try {
    const indicator = new EcoIndicator(req.body);
    await indicator.save();
    res.status(201).json(indicator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const indicators = await EcoIndicator.find();
  res.json(indicators);
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const indicator = await EcoIndicator.findById(req.params.id);
    if (!indicator) return res.status(404).json({ message: 'Not found' });
    res.json(indicator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const indicator = await EcoIndicator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(indicator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await EcoIndicator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
