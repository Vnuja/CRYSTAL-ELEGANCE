import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext'; // Import AuthContext

const URL = "http://localhost:4000/feedback";

function AddFeedback({ jewelleryId, onBack }) {
  const { authState } = useContext(AuthContext); // Use AuthContext to get user data
  const [feedback, setFeedback] = useState({
    customerId: authState.user?.userId || '', // Use user's ID if available
    jewelleryId: jewelleryId || '',
    rating: 1,
    comment: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setFeedback({ ...feedback, rating: newRating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!feedback.comment) {
      setError('Comment is required');
      return;
    }

    try {
      await axios.post(URL, feedback);
      alert('Feedback added successfully');
      navigate('../jewellery');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit}>
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        
        <input
          label="Customer Name"
          type='hidden'
          name="customerId"
          value={authState.user?.userId || 'Anonymous'} // Display user's name or "Anonymous"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled // Disable this field as the customer ID is taken from the context
        />
        
        <StarRatings
          rating={feedback.rating}
          starRatedColor="gold"
          changeRating={handleRatingChange}
          numberOfStars={5}
          starDimension="30px"
          starSpacing="5px"
          name='rating'
        />
        
        <TextField
          label="Comment"
          name="comment"
          value={feedback.comment}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required // Mark as required for form validation
        />
        
        <Box sx={{ marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">Submit Feedback</Button>
          <Button variant="outlined" color="secondary" onClick={onBack} sx={{ marginLeft: 2 }}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddFeedback;
