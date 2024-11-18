const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  jewelleryId: {
    type: Schema.Types.ObjectId,
    ref: 'Jewellery', // Assuming you have a Jewellery model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  address: {
    type: String,
    required: true,
  },
  name: { // Added username field
    type: String,
    required: true, // Set to true if you want this field to be mandatory
  },
  paymentSlip: {
    type: String,
    required: false, // If it's required only after Pay button is clicked
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], // Allowed values for status
    default: 'pending' // Default value for new orders
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
