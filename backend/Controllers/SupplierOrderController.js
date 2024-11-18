//place order 
const SupplierOrder = require('../Model/SupplierOrderModel'); // Adjust the path as necessary
const Gem = require('../Model/GemModel'); // Adjust the path as necessary
const SupplierList = require('../Model/SupplierListModel'); // Adjust the path as necessary

// Create a new Supplier Order
exports.createSupplierOrder = async (req, res) => {
    const { SupOrderID, quantity, InvID, SupID, status, description } = req.body;

    try {
        // Check if the supplier exists
        const supplierExists = await SupplierList.findOne({ SupId: SupID });
        if (!supplierExists) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Create the supplier order
        const supplierOrder = new SupplierOrder({
            SupOrderID,
            quantity,
            InvID,
            SupID,
            status,
            description,
        });

        await supplierOrder.save();
        res.status(201).json(supplierOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Supplier Orders
exports.getAllSupplierOrders = async (req, res) => {
    try {
        const orders = await SupplierOrder.find().populate('SupID'); // Populate references
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Supplier Order by ID
exports.getSupplierOrderById = async (req, res) => {
    try {
        const order = await SupplierOrder.findById(req.params.id).populate('SupID');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Supplier Order by ID (full update)
exports.updateSupplierOrder = async (req, res) => {
    try {
        const updatedFields = req.body;  // Get all the fields from the request body
        const order = await SupplierOrder.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Supplier Order Status by ID
exports.updateSupplierOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await SupplierOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Supplier Order by ID
exports.deleteSupplierOrder = async (req, res) => {
    try {
        const order = await SupplierOrder.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).json(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate the next SupOrderID
exports.getNextOrderID = async (req, res) => {
    try {
        const lastOrder = await SupplierOrder.findOne().sort({ SupOrderID: -1 });
        let nextOrderID = 'SO0001'; // Default if no orders exist

        if (lastOrder) {
            // Extract the number from the last order ID
            const lastOrderNumber = parseInt(lastOrder.SupOrderID.replace('SO', ''), 10);
            const nextOrderNumber = lastOrderNumber + 1;
            nextOrderID = `SO${nextOrderNumber.toString().padStart(4, '0')}`; // Ensure it's zero-padded
        }

        res.status(200).json({ nextOrderID });
    } catch (error) {
        res.status(500).json({ message: 'Error generating next order ID' });
    }
};
