/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AddFeedback from '../Admin/Feedback/AddFeedback2'; // Ensure you have this component
import { AuthContext } from '../Auth/AuthContext'; // Import AuthContext

// Import the background image from the images folder
import backgroundImage from '../Images/3433814.jpg'; // Adjust path accordingly

const JewelleryProfile = () => {
  const [jewellery, setJewellery] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const { id: jewelleryId } = useParams();
  const [noResults, setNoResults] = useState(false);
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // New state to toggle additional info
  const [images, setImages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const URL = 'http://localhost:4000/feedback';
  const { authState, isAuthenticated, loading } = useContext(AuthContext); // Access authentication state
  const navigate = useNavigate(); // Use navigate for redirection

  // Fetch jewellery details
  useEffect(() => {
    axios.get(`http://localhost:4000/jewellery/${jewelleryId}`)
      .then(response => {
        setJewellery(response.data);
        setImages(response.data.images || []); // Assuming images is an array of URLs
      })
      .catch(error => console.error('Error fetching jewellery:', error));
  }, [jewelleryId]);

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(URL);
        const filteredFeedbacks = response.data.filter(feedback => feedback.jewelleryId === jewellery.JID);
        setFeedbacks(filteredFeedbacks);
        setNoResults(filteredFeedbacks.length === 0);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    if (jewellery) {
      fetchFeedbacks();
    }
  }, [jewellery]);

  const handleBuyNow = () => {
    if (!jewellery) return; // Ensure jewellery data is available

    if (!isAuthenticated) { // Check if the user is logged in
      setSnackbarMessage('You need to be logged in to proceed with the purchase.');
      setSnackbarOpen(true); // Open the snackbar with the message
    } else {
      // Navigate to the payment page, passing the jewellery ID
      navigate(`/makepayment/${jewellery.JID}`, { state: { jewellery } });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to login page
    setSnackbarOpen(false); // Close the Snackbar after redirecting
  };

  const displayField = (field, fieldName) => {
    return field ? `${fieldName}: ${field}` : `${fieldName}: No details available`;
  };

  if (!jewellery || loading) return <div>Loading...</div>; // Show loading state if jewellery data or authentication is being fetched

  return (
    <div>
      <Header />

      {/* Box with the background image */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensures it covers the full height of the viewport
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Container>
          <br />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt={jewellery.name}
                  height="500"
                  image={jewellery.image || 'http://localhost:5173/src/Components/Images/3.png'}
                  title={jewellery.name}
                />
                <CardContent>
                  {/* Display images as a list if carousel is not available */}
                  <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Image ${index}`}
                        style={{ width: '100%', maxWidth: '300px', marginRight: '10px' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" color="#000">{jewellery.name}</Typography>
              <Typography variant="body1" color="#333">{jewellery.description}</Typography>
              <Typography variant="h4" color="#000">Rs {jewellery.price}</Typography>
              <br /><br /><br /><br />
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleBuyNow} 
                sx={{
                  padding: '10px 20px', 
                  borderRadius: '20px', 
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', 
                  '&:hover': {
                    backgroundColor: '#ff4081',
                    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Buy Now
              </Button>
              <br /><br />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setShowDetails(!showDetails)} 
                sx={{
                  padding: '10px 20px', 
                  borderRadius: '20px', 
                  borderColor: '#2196f3', 
                  color: '#2196f3', 
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', 
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#e3f2fd',
                    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
                  }
                }}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
              <br /><br />
              {showDetails && (
                <Box 
                  sx={{ 
                    opacity: showDetails ? 1 : 0, 
                    transition: 'opacity 0.5s ease-in-out',
                    marginTop: 2,
                  }}
                >
                  <Typography variant="h6" color="#333">{displayField(jewellery.quantity, 'Quantity')}</Typography>
                  <Typography variant="h6" color="#333">{displayField(jewellery.status, 'Status')}</Typography>
                  <Typography variant="h6" color="#333">{displayField(jewellery.weight, 'Weight')}</Typography>
                  <Typography variant="h6" color="#333">{displayField(jewellery.goldStandard, 'Gold Standard')}</Typography>
                  <Typography variant="body2" color="#333">{displayField(jewellery.description, 'Description')}</Typography>
                </Box>
              )}
              <br /><br />
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => setShowAddFeedbackForm(!showAddFeedbackForm)} 
                sx={{
                  padding: '10px 20px', 
                  borderRadius: '20px', 
                  borderColor: '#ff4081', 
                  color: '#ff4081', 
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', 
                  '&:hover': {
                    borderColor: '#e91e63',
                    backgroundColor: '#ffebee',
                    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
                  }
                }}
              >
                {showAddFeedbackForm ? 'Cancel' : 'Add Feedback'}
              </Button>
            </Grid>
          </Grid>

          <Box>
            {showAddFeedbackForm ? (
              <AddFeedback
                jewelleryId={jewellery.JID}
                onBack={() => setShowAddFeedbackForm(false)}
              />
            ) : (
              <Box sx={{ padding: 3 }}>
                {noResults ? (
                  <Typography variant="h6" align="center">No feedback found.</Typography>
                ) : (
                  feedbacks.map((feedback) => (
                    <Card 
                      key={feedback._id} 
                      sx={{ marginBottom: 2, opacity: 0, animation: 'fadeIn 0.5s forwards' }} // Add fade-in animation
                    >
                      <CardContent>
                        <Typography variant="h6">Customer Name: {feedback.customerId}</Typography>
                        <Typography variant="body1">Rating: {feedback.rating}</Typography>
                        <Typography variant="body2">Comment: {feedback.comment}</Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default JewelleryProfile;
