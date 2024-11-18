/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/gems"; // Update the URL to point to your gems endpoint

function AddGem() {
  const [gem, setGem] = useState({
    GID: '',
    name: '',
    price: '',
    quantity: '',
    color: '',
    weight: '',
    category: '',
    status: 'available',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGem({ ...gem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URL, gem);
      alert('Gem added successfully');
      navigate('/admindashboard/gem-management'); // Redirect after successful submission
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Add Gem</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="GID"
          name="GID"
          value={gem.GID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Name"
          name="name"
          value={gem.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={gem.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={gem.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Color"
          name="color"
          value={gem.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight"
          name="weight"
          type="number"
          value={gem.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          value={gem.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          select
          SelectProps={{ native: true }}
          value={gem.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Add Gem
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate('/admindashboard/gem-management');
            window.location.reload(); // Refresh the page
          }}
          sx={{ marginTop: 2, marginLeft: 2 }}
        >
          Back
        </Button>
        
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddGem;
