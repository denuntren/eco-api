const mongoose = require('mongoose');

const EcoIndicatorSchema = new mongoose.Schema({
  city: { type: String, required: true },
  airQuality: { type: Number, required: true },
  waterQuality: { type: Number, required: true },
  noiseLevel: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EcoIndicator', EcoIndicatorSchema);
