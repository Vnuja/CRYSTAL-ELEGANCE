const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

// Create a new order
router.post('/create', orderController.createOrder);

// Confirm payment by updating the order with payment slip
router.put('/orders/:orderId/confirm-payment', orderController.confirmPayment);

// Get all orders
router.get('/all', orderController.getAllOrders);

// Get order by ID
router.get('/orders/:orderId', orderController.getOrderById);

router.put('/update-status/:orderId', orderController.updateOrderStatus); 

// Delete an order
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
