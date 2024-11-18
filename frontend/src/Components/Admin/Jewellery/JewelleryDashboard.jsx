import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Paper, Button } from '@mui/material';
import { ShoppingCart, AttachMoney, Inventory } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import backgroundImage from '../../Images/j2.jpg'; // Import the background image

const URL = "http://localhost:4000/jewellery";

const fetchJewellery = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const JewelleryDashboard = () => {
  const [jewellery, setJewellery] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    fetchJewellery().then(data => {
      setJewellery(data);
      calculateSummary(data);
    }).catch(error => {
      console.error("Error fetching jewellery:", error);
    });
  }, []);

  const calculateSummary = (data) => {
    const itemCount = data.length;
    const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
    const avgPrice = (data.reduce((sum, item) => sum + item.price, 0) / itemCount).toFixed(2);

    setTotalItems(itemCount);
    setTotalQuantity(totalQty);
    setAveragePrice(avgPrice);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Jewellery Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', textAlign: 'center' }}>
            <CardContent>
              <ShoppingCart fontSize="large" color="primary" />
              <Typography variant="h6" gutterBottom>Total Items</Typography>
              <Typography variant="h3">{totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', textAlign: 'center' }}>
            <CardContent>
              <Inventory fontSize="large" color="secondary" />
              <Typography variant="h6" gutterBottom>Total Quantity</Typography>
              <Typography variant="h3">{totalQuantity}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', textAlign: 'center' }}>
            <CardContent>
              <AttachMoney fontSize="large" color="success" />
              <Typography variant="h6" gutterBottom>Average Price</Typography>
              <Typography variant="h3">Rs. {averagePrice}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h6" gutterBottom>Inventory Summary</Typography>
          <Typography variant="body1">
            Total value of inventory: <strong>Rs. {jewellery.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
          </Typography>
        </Paper>
      </Box>

      {/* Button placed outside the summary box */}
      <Box mt={4} sx={{ textAlign: 'center' }}>
        <Link to="/admindashboard/jewellery-details" style={{ textDecoration: 'none' }}> {/* Link to the jewellery details page */}
          <Button 
            variant="contained" 
            color="primary" 
            sx={{
              fontSize: '1.5rem', // Increase font size
              padding: '16px 32px', // Increase padding
              borderRadius: '8px', // Rounded corners
              backgroundColor: '#3f51b5', // Primary color
              '&:hover': {
                backgroundColor: '#303f9f', // Darker on hover
              },
            }} 
          >
            View Jewellery Details
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default JewelleryDashboard;
