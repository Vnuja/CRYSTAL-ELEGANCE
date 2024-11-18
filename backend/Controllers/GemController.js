const Gem = require('../Model/GemModel'); // Adjust path as necessary

const GemController = {
  // Create a new Gem
  createGem: async (req, res) => {
    try {
      const { GID, name, color, weight, price, quantity, category, status } = req.body;

      // Validate required fields
      if (!GID || !name || !price || !quantity) {
        return res.status(400).json({ message: 'GID, name, price, and quantity are required.' });
      }

      // Check for existing Gem ID
      const existingGem = await Gem.findOne({ GID });
      if (existingGem) {
        return res.status(400).json({ message: `Gem with ID ${GID} already exists.` });
      }

      // Create and save new Gem
      const newGem = new Gem({ GID, name, color, weight, price, quantity, category, status });
      await newGem.save();

      res.status(201).json(newGem);
    } catch (error) {
      console.error('Error creating gem:', error);
      res.status(500).json({ message: 'Error creating gem', error: error.message });
    }
  },

  // Get all Gems
  getAllGems: async (req, res) => {
    try {
      const gems = await Gem.find();
      res.status(200).json(gems);
    } catch (error) {
      console.error('Error fetching gems:', error);
      res.status(500).json({ message: 'Error fetching gems', error: error.message });
    }
  },

  // Get a Gem by ID
  getGemById: async (req, res) => {
    const { id } = req.params;
    try {
      const gem = await Gem.findOne({ GID: id });
      if (!gem) {
        return res.status(404).json({ message: 'Gem not found' });
      }
      res.status(200).json(gem);
    } catch (error) {
      console.error('Error fetching gem by ID:', error);
      res.status(500).json({ message: 'Error fetching gem', error: error.message });
    }
  },

// Update a Gem by ID
updateGem: async (req, res) => {
  const { id } = req.params; // Expecting the GID as a parameter
  const { name, color, weight, price, quantity, category, status } = req.body; // Expecting updated details

  // Validate required fields
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Name, price, and quantity are required.' });
  }

  try {
    // Find and update the gem based on GID
    const gem = await Gem.findOneAndUpdate(
      { GID: id }, // Using GID from params
      { name, color, weight, price, quantity, category, status },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!gem) {
      return res.status(404).json({ message: 'Gem not found' });
    }

    res.status(200).json(gem); // Respond with the updated gem
  } catch (error) {
    console.error('Error updating gem:', error);
    res.status(500).json({ message: 'Error updating gem', error: error.message });
  }
},

  // Delete a Gem by ID
  deleteGem: async (req, res) => {
    const { id } = req.params;
    try {
      const gem = await Gem.findOneAndDelete({ GID: id });
      if (!gem) {
        return res.status(404).json({ message: 'Gem not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error deleting gem:', error);
      res.status(500).json({ message: 'Error deleting gem', error: error.message });
    }
  },
};

module.exports = GemController;
