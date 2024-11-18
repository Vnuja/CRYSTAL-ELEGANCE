const express = require('express');
const router = express.Router();
const SupplierListController = require('../Controllers/SupplierListController'); // Adjust the path as necessary

// Create a new Supplier
router.post('/', SupplierListController.createSupplier);

// Get all Suppliers
router.get('/', SupplierListController.getAllSuppliers);

// Get a Supplier by SupId
router.get('/:supId', SupplierListController.getSupplierBySupId); // Use :supId in the route

// Update a Supplier by SupId
router.put('/:supId', SupplierListController.updateSupplier); // Use :supId in the route

// Delete a Supplier by SupId
router.delete('/:supId', SupplierListController.deleteSupplier); // Use :supId in the route

module.exports = router;
