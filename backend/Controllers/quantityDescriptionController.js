const QuantityDescription = require('../Model/QuantityDescription');

// Create a new QuantityDescription entry
exports.createQuantityDescription = async (req, res) => {
    const { quantity, description, status } = req.body;

    if (quantity === undefined || !description || !status) {
        return res.status(400).json({ message: 'All fields (quantity, description, and status) are required.' });
    }

    try {
        const newEntry = new QuantityDescription({
            quantity,
            description,
            status
        });

        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.error("Error creating quantity description entry:", error);
        res.status(500).json({ message: 'Failed to create entry', error: error.message });
    }
};

// Get all QuantityDescription entries
exports.getAllQuantityDescriptions = async (req, res) => {
    try {
        const entries = await QuantityDescription.find();
        res.status(200).json(entries);
    } catch (error) {
        console.error("Error fetching quantity description entries:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get QuantityDescription entry by ID
exports.getQuantityDescriptionById = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await QuantityDescription.findById(id);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        console.error("Error fetching quantity description entry:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update QuantityDescription entry by ID
exports.updateQuantityDescription = async (req, res) => {
    const { id } = req.params;
    const { quantity, description, status } = req.body;

    if (quantity === undefined || !description || !status) {
        return res.status(400).json({ message: 'All fields (quantity, description, and status) are required.' });
    }

    try {
        const updatedEntry = await QuantityDescription.findByIdAndUpdate(
            id,
            { quantity, description, status },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error("Error updating quantity description entry:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete QuantityDescription entry by ID
exports.deleteQuantityDescription = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await QuantityDescription.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(204).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error("Error deleting quantity description entry:", error);
        res.status(500).json({ message: error.message });
    }
};
