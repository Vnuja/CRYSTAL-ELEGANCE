const Order = require('../Model/OrderModel'); // Adjust path as necessary

// Create a new order
exports.createOrder = async (req, res) => {
    try {
      const { jewelleryId, quantity, totalPrice, email, mobile, address, paymentSlip, name } = req.body; // Include username
  
      const newOrder = new Order({
        jewelleryId,
        quantity,
        totalPrice,
        email,
        mobile,
        address,
        name, // Add username to the order
        paymentSlip, // Will be empty initially and set after payment
        status: 'pending' // Set status to pending by default
      });
  
      const savedOrder = await newOrder.save();
      return res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  };
  

// Update order with payment slip and confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentSlip } = req.body;

    // Find the order and update payment slip, confirmation, and status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentSlip, status: 'completed' }, // Update status to completed
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Payment confirmed successfully', order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to confirm payment', error: error.message });
  }
};

// Change order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // Extracting the new status from the request body

    // Find the order and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status }, // Update the order status
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('jewelleryId'); // Populating jewellery details
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('jewelleryId'); // Populating jewellery details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};
