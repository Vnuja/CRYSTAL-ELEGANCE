const Inventory = require('../Model/InventoryModel');
const Gem = require('../Model/GemModel');
const SupplierOrder = require('../Model/SupplierOrderModel');

// Create Inventory Entry
exports.createInventory = async (req, res) => {
    const { GID, quantity, minStock, status } = req.body; // Removed InvID from destructuring

    if (!GID || quantity === undefined || minStock === undefined || !status) {
        return res.status(400).json({ message: 'All fields except InvID are required.' });
    }

    try {
        const gem = await Gem.findOne({ GID });
        if (!gem) {
            return res.status(404).json({ message: 'Gem not found' });
        }

        // Fetch existing inventory to determine the next InvID
        const inventories = await Inventory.find({});
        const currentIds = inventories.map(inv => parseInt(inv.InvID.replace('INV', '')));
        const maxId = currentIds.length ? Math.max(...currentIds) : 0;

        // Generate the next InvID
        const InvID = `INV${String(maxId + 1).padStart(3, '0')}`; // Auto-generate InvID

        const inventory = new Inventory({
            InvID,
            GID,
            quantity,
            minStock,
            status
        });

        await inventory.save();
        res.status(201).json(inventory);
    } catch (error) {
        console.error("Error creating inventory:", error);
        res.status(500).json({ message: 'Failed to create inventory item', error: error.message });
    }
};

// Get All Inventory Items
exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Inventory Item by ID
exports.getInventoryById = async (req, res) => {
    const { InvID } = req.params;

    try {
        const inventoryItem = await Inventory.findOne({ InvID });
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (error) {
        console.error("Error fetching inventory item:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update Inventory Item (prepopulation)
exports.updateInventory = async (req, res) => {
    const { InvID } = req.params;

    try {
        const inventory = await Inventory.findOne({ InvID }).populate('GID');
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error fetching inventory for update:", error);
        res.status(500).json({ message: error.message });
    }
};

// Perform Inventory Update
exports.performUpdateInventory = async (req, res) => {
    const { InvID } = req.params;
    const { quantity, minStock, status } = req.body;

    if (quantity === undefined || minStock === undefined) {
        return res.status(400).json({ message: 'Quantity and minStock are required.' });
    }

    try {
        const inventory = await Inventory.findOneAndUpdate(
            { InvID },
            { quantity, minStock, status },
            { new: true }
        );

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        if (inventory.quantity <= inventory.minStock && inventory.quantity > 0) {
            inventory.status = 'Low Stock';
        } else if (inventory.quantity === 0) {
            inventory.status = 'Out of Stock';
        } else {
            inventory.status = 'In Stock';
        }

        await inventory.save();
        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete Inventory Item
exports.deleteInventory = async (req, res) => {
    const { InvID } = req.params;
    try {
        const inventory = await Inventory.findOneAndDelete({ InvID });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting inventory:", error);
        res.status(500).json({ message: error.message });
    }
};

// Place Supplier Order for Low Stock
exports.placeSupplierOrderForLowStock = async (req, res) => {
    const { InvID } = req.params;
    try {
        const inventory = await Inventory.findOne({ InvID }).populate('GID');
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        if (inventory.quantity > inventory.minStock) {
            return res.status(400).json({ message: 'Stock is sufficient, no need to place an order.' });
        }

        const { SupOrderID, SupID, quantity } = req.body;

        if (!SupOrderID || !SupID || quantity === undefined) {
            return res.status(400).json({ message: 'SupOrderID, SupID, and quantity are required.' });
        }

        const supplierOrder = new SupplierOrder({
            SupOrderID,
            GID: inventory.GID,
            quantity,
            InvID: inventory.InvID,
            SupID,
            status: 'Pending',
            description: `Order for ${quantity} units of ${inventory.GID.name}`
        });

        await supplierOrder.save();
        res.status(201).json(supplierOrder);
    } catch (error) {
        console.error("Error placing supplier order:", error);
        res.status(500).json({ message: error.message });
    }
};
