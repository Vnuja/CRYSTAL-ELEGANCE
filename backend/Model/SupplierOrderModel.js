const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Supplier Order Schema
const supplierOrderSchema = new Schema({
    SupOrderID: { type: String, required: true, unique: true }, // Custom Supplier Order ID
    InvID: { type: String, required: true }, // Inventory ID
    SupID: { type: String, required: true }, // Supplier ID
    quantity: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SupplierOrder', supplierOrderSchema);
