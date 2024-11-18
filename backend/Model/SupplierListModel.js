const mongoose = require('mongoose');

const supplierListSchema = new mongoose.Schema({
  SupId: { type: String, required: true, unique: true }, // Custom supplier ID
  NIC: { type: String, required: true },
  SupName: { type: String, required: true },
  items: [{ type: String }], // List of item IDs (custom IDs)
  Contact: { type: String, required: true }, // Supplier contact
  Adress: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('SupplierList', supplierListSchema);

