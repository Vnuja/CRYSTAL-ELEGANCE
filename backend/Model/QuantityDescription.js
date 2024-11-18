const mongoose = require('mongoose');

const quantityDescriptionSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Canceled'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('QuantityDescription', quantityDescriptionSchema);
