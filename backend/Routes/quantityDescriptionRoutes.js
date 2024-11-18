const express = require('express');
const router = express.Router();
const {
    createQuantityDescription,
    getAllQuantityDescriptions,
    getQuantityDescriptionById,
    updateQuantityDescription,
    deleteQuantityDescription
} = require('../Controllers/quantityDescriptionController');

// Create a new quantity description entry
router.post('/', createQuantityDescription);

// Get all quantity description entries
router.get('/', getAllQuantityDescriptions);

// Get a single quantity description entry by ID
router.get('/:id', getQuantityDescriptionById);

// Update a quantity description entry by ID
router.put('/:id', updateQuantityDescription);

// Delete a quantity description entry by ID
router.delete('/:id', deleteQuantityDescription);

module.exports = router;
