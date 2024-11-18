import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box } from '@mui/material'; // Import Box
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API calls
import jsPDF from 'jspdf'; // Import jsPDF

const OrdersList = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders/all'); // Adjust the endpoint
        setOrders(response.data.orders); // Accessing the orders property directly
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setErrorMessage('Failed to fetch orders. Please try again.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:4000/orders/delete/${orderId}`); // Adjust the endpoint
        setOrders(orders.filter(order => order._id !== orderId)); // Remove the deleted order from state
        alert('Order deleted successfully!');
      } catch (error) {
        console.error('Failed to delete order:', error);
        setErrorMessage('Failed to delete order. Please try again.');
      }
    }
  };

  const handleChangeStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'; // Toggle status

    try {
      const response = await axios.put(`http://localhost:4000/orders/update-status/${orderId}`, { status: newStatus }); // Adjust the endpoint
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status: response.data.order.status } : order))); // Update order status in state
      alert(`Order status changed to ${newStatus}!`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      setErrorMessage('Failed to update order status. Please try again.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Orders Report', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    const tableColumn = ['Jewellery Name', 'Quantity', 'Total Price', 'Name', 'Email', 'Mobile', 'Address', 'Status'];
    const tableRows = [];

    orders.forEach(order => {
      const orderData = [
        order.jewelleryId ? order.jewelleryId.name : 'N/A',
        order.quantity,
        `Rs ${order.totalPrice}`,
        order.name,
        order.email,
        order.mobile,
        order.address,
        order.status,
      ];
      tableRows.push(orderData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save('orders_report.pdf');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (errorMessage) return <Typography color="red">{errorMessage}</Typography>;

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.name && order.name.toLowerCase().includes(searchQuery.toLowerCase()) // Check if order.name exists
  );

  return (
    <div>
      <Container sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>Orders List</Typography>
        
        {/* Search Bar and Button in a Box */}
        <Box display="flex" alignItems="center" marginBottom={2}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginRight: 2 }} // Add some spacing between the TextField and Button
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={generateReport} 
          >
            Generate Report
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Jewellery Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order.jewelleryId ? order.jewelleryId.name : 'N/A'}</TableCell> {/* Assuming jewelleryId has a name field */}
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>Rs {order.totalPrice}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.mobile}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color={order.status === 'completed' ? 'success' : 'warning'} 
                      onClick={() => handleChangeStatus(order._id, order.status)}
                    >
                      {order.status === 'completed' ? 'Completed' : 'Pending'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteOrder(order._id)} sx={{ marginLeft: 2 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default OrdersList;
