const express = require('express');
const router = express.Router();
const inventoryController = require('../Controllers/InventoryController');

// Create a new inventory item
router.post('/', inventoryController.createInventory);

// Get all inventory items
router.get('/', inventoryController.getAllInventory);

// Get inventory item by ID
router.get('/:InvID', inventoryController.getInventoryById);

// Update inventory item by ID
router.put('/update/:InvID', inventoryController.performUpdateInventory);

// Delete inventory item by ID
router.delete('/:InvID', inventoryController.deleteInventory);

// Place supplier order for low stock items
router.post('/:InvID/place-order', inventoryController.placeSupplierOrderForLowStock);

// Export the router
module.exports = router;
