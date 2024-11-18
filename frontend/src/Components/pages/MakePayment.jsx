import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField, Card, CardContent, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios'; // Import axios for API calls

const MakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { jewellery } = location.state; // receiving jewellery details passed from JewelleryProfile
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', mobile: '', address: '' }); // Include name
  const [showPaymentSlip, setShowPaymentSlip] = useState(false);
  const [paymentSlip, setPaymentSlip] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const basePrice = jewellery.price;
  const totalPrice = basePrice * quantity;

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta); // Quantity can't go below 1
    setQuantity(newQuantity);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePayClick = () => {
    setShowPaymentSlip(true);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    return emailPattern.test(email);
  };

  const isMobileValid = (mobile) => {
    return /^\d{10}$/.test(mobile); // Check if mobile is a valid 10-digit number
  };

  const handleConfirmPayment = async () => {
    if (!userDetails.name) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!isEmailValid(userDetails.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isMobileValid(userDetails.mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const orderData = {
      jewelleryId: jewellery._id, // Assuming jewellery has an _id field
      quantity,
      totalPrice,
      name: userDetails.name, // Include name
      email: userDetails.email,
      mobile: userDetails.mobile,
      address: userDetails.address,
      paymentSlip, // Include payment slip if needed
    };

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://localhost:4000/orders/create', orderData); // Replace with your actual endpoint
      console.log(response.data); // For debugging purposes
      setPaymentConfirmed(true);
      setShowPaymentSlip(false); // Hide payment slip after confirming
      setErrorMessage(''); // Reset error message
      // Reset form after payment
      setQuantity(1);
      setUserDetails({ name: '', email: '', mobile: '', address: '' }); // Reset user details
      setPaymentSlip('');

      // Navigate to jewellery page after successful payment
      navigate('/jewellery'); // Replace '/jewellery' with the actual path of your jewellery page
    } catch (error) {
      console.error('Failed to create order:', error);
      setErrorMessage('Failed to create order. Please try again.'); // Set error message on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Header />
      <Container sx={{ minHeight: '80vh', paddingTop: '20px', paddingBottom: '20px' }}>
        <Grid container spacing={4}>
          {/* Left side - jewellery details */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={jewellery.image || 'http://localhost:5173/src/Components/Images/3.png'}
                    alt={jewellery.name}
                    style={{ width: '100%', maxWidth: '600px', maxHeight: '500px' }}
                  />
                  <Typography variant="h4">{jewellery.name}</Typography>
                  <Typography variant="h6">Rs {basePrice}</Typography>

                  {/* Quantity controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <Button onClick={() => handleQuantityChange(-1)} variant="outlined" color="primary">-</Button>
                    <Typography variant="h6" sx={{ margin: '0 20px' }}>{quantity}</Typography>
                    <Button onClick={() => handleQuantityChange(1)} variant="outlined" color="primary">+</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right side - user details and payment */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>User Details</Typography>
                
                {/* name field */}
                <TextField
                  label="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name" // Set name for the name field
                  value={userDetails.name}
                  onChange={handleInputChange}
                />
                
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="mobile"
                  value={userDetails.mobile}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                />

                {/* Display updated total price */}
                <Typography variant="h6" sx={{ marginTop: 2 }}>Total Price: Rs {totalPrice}</Typography>

                {/* Pay button */}
                {!showPaymentSlip && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 3 }}
                    onClick={handlePayClick}
                  >
                    Pay
                  </Button>
                )}

                {/* Show payment slip input after Pay button is clicked */}
                {showPaymentSlip && (
                  <Box sx={{ marginTop: 4 }}>
                    <TextField
                      label="Payment Slip"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={paymentSlip}
                      onChange={(e) => setPaymentSlip(e.target.value)}
                    />

                    {/* Confirm Payment button */}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={handleConfirmPayment}
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? 'Processing...' : 'Confirm Payment'}
                    </Button>

                    {paymentConfirmed && (
                      <Typography variant="h6" color="green" sx={{ marginTop: 2 }}>
                        Payment Confirmed! Your order has been created.
                      </Typography>
                    )}
                    {errorMessage && (
                      <Typography variant="h6" color="red" sx={{ marginTop: 2 }}>
                        {errorMessage}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default MakePayment;
