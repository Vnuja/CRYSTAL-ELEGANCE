const mongoose = require('mongoose');

const gemSchema = new mongoose.Schema({
  GID: {
    type: String,
    required: true,
    unique: true, // Ensure GID is unique
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: String, // Consider using a number type if weight is a numeric value
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Gem = mongoose.model('Gem', gemSchema);
module.exports = Gem;
