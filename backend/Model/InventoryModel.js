const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Inventory Schema
const inventorySchema = new Schema({
    InvID: { type: String, required: true, unique: true }, // Custom Inventory ID
    GID: { type: String, required: true }, // Reference to Gem's GID
    quantity: { type: Number, required: true },
    minStock: { type: Number, required: true },
    status: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
