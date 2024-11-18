const Jewellery = require('../Model/JewelleryModel');

// Generate jewellery ID with leading zeros
const generateJewelleryId = async () => {
    const lastJewellery = await Jewellery.findOne().sort({ JID: -1 }).limit(1);
    const lastId = lastJewellery ? parseInt(lastJewellery.JID.replace('J', ''), 10) : 0;
    const newId = `J${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new jewellery item
exports.createJewellery = async (req, res) => {
    try {
        const { image, name, price, quantity, status, description, category, weight, goldStandard } = req.body; // Include weight and goldStandard
        const JID = await generateJewelleryId(); // Generate new jewellery ID
        const newJewellery = new Jewellery({ JID, name, price, quantity, status, image, description, category, weight, goldStandard }); // Include weight and goldStandard
        await newJewellery.save();

        res.status(201).json({ message: 'Jewellery created successfully', jewellery: newJewellery });
    } catch (error) {
        res.status(500).json({ message: 'Error creating jewellery', error });
    }
};

// Get all jewellery items
exports.getAllJewellery = async (req, res) => {
    try {
        const jewellery = await Jewellery.find();
        res.status(200).json(jewellery);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving jewellery', error });
    }
};

// Get a single jewellery item by ID
exports.getJewelleryById = async (req, res) => {
    const id = req.params.id;

    try {
        const jewellery = await Jewellery.findById(id);
        if (!jewellery) {
            return res.status(404).json({ message: 'Jewellery not found' });
        }
        res.status(200).json(jewellery);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving jewellery', error });
    }
};

// Update a jewellery item by ID
exports.updateJewellery = async (req, res) => {
    const id = req.params.id;
    const { image, name, price, quantity, status, description, category, weight, goldStandard } = req.body; // Include weight and goldStandard

    try {
        const updatedJewellery = await Jewellery.findByIdAndUpdate(
            id,
            { name, price, quantity, status, image, description, category, weight, goldStandard }, // Include weight and goldStandard
            { new: true } // Return the updated jewellery
        );

        if (!updatedJewellery) {
            return res.status(404).json({ message: 'Jewellery not found' });
        }

        res.status(200).json({ message: 'Jewellery updated successfully', jewellery: updatedJewellery });
    } catch (error) {
        res.status(500).json({ message: 'Error updating jewellery', error });
    }
};

// Delete a jewellery item by ID
exports.deleteJewellery = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedJewellery = await Jewellery.findByIdAndDelete(id);
        if (!deletedJewellery) {
            return res.status(404).json({ message: 'Jewellery not found' });
        }

        res.status(200).json({ message: 'Jewellery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting jewellery', error });
    }
};
