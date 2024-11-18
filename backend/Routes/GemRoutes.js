const express = require('express');
const router = express.Router();
const GemController = require('../Controllers/GemController'); // Adjust the path as necessary

// POST route to create a new gem
router.post('/', GemController.createGem); // This assumes you want to handle /api/gems with a POST request

// Optionally, add other routes for getting, updating, deleting gems
router.get('/', GemController.getAllGems);
router.get('/:id', GemController.getGemById);
router.put('/:id', GemController.updateGem);
router.delete('/:id', GemController.deleteGem);

// Export the router
module.exports = router;
