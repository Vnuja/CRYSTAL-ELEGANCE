const express = require('express');
const router = express.Router();
const JewelleryController = require('../Controllers/JewelleryController');
const upload = require('../middleware/multer');

// Routes
router.post('/', upload.single('image'), JewelleryController.createJewellery);
router.get('/', JewelleryController.getAllJewellery);
router.get('/:id', JewelleryController.getJewelleryById);
router.put('/:id', upload.single('image'), JewelleryController.updateJewellery);
router.delete('/:id', JewelleryController.deleteJewellery);

module.exports = router;
