const SupplierList = require('../Model/SupplierListModel'); // Adjust the path as necessary

// Helper function to generate a custom supplier ID
const generateSupId = async () => {
  try {
    const lastSupplier = await SupplierList.findOne().sort({ SupId: -1 });
    const lastId = lastSupplier ? parseInt(lastSupplier.SupId.replace('SUP', '')) : 0;
    const nextId = `SUP${String(lastId + 1).padStart(4, '0')}`;
    return nextId;
  } catch (error) {
    console.error('Error generating SupId:', error.message);
    return 'SUP0001'; // Fallback ID if error occurs
  }
};

// Create a new Supplier
exports.createSupplier = async (req, res) => {
  try {
    const supId = await generateSupId(); // Generate SupId before creating a new supplier
    const supplierData = { ...req.body, SupId: supId };
    const supplier = new SupplierList(supplierData);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierList.find(); // Remove populate if not needed
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Supplier by SupId
exports.getSupplierBySupId = async (req, res) => {
  try {
    const supplier = await SupplierList.findOne({ SupId: req.params.supId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Supplier by SupId
exports.updateSupplier = async (req, res) => {
  try {
    const { SupName, NIC, Contact, Adress, items, description } = req.body;

    // Ensure all required fields are present
    if (!SupName || !NIC || !Contact || !Adress || !description) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Update the supplier using findOneAndUpdate
    const updatedSupplier = await SupplierList.findOneAndUpdate(
      { SupId: req.params.supId }, // Match by SupId
      { SupName, NIC, Contact, Adress, items, description }, // Update fields
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // Check if supplier was found and updated
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Respond with the updated supplier data
    res.status(200).json(updatedSupplier);
  } catch (error) {
    // Handle errors and respond
    console.error("Error during update:", error.message); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// Delete a Supplier by SupId
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await SupplierList.findOneAndDelete({ SupId: req.params.supId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
