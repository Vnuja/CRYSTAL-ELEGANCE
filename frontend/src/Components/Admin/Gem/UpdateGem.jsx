import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const UpdateGems = () => {
  const { id } = useParams(); // Extract the gem ID from the URL
  const [gemData, setGemData] = useState({
    GID: '',
    name: '',
    color: '',
    weight: '',
    price: '',
    quantity: '',
    category: '',
    status: 'available' // Default status; will be updated when fetched
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const URL = "http://localhost:4000/api/gems"; // Base URL for gem API

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`); // Fetch gem data from the API using the MongoDB ID
        setGemData(response.data); // Fill the fields with the fetched data
      } catch (error) {
        alert('Error fetching gem: ' + (error.response ? error.response.data.message : error.message));
      }
    };

    fetchGem();
  }, [id, URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGemData({ ...gemData, [name]: value }); // Update the gemData state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, gemData); // Update the gem data in the API using the MongoDB ID
      alert('Gem updated successfully!');
      navigate('/admindashboard/gem-management'); // Redirect to gem management page after successful update
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate one step back in history
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>Update Gem</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="GID"
            name="GID"
            value={gemData.GID}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={gemData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Color"
            name="color"
            value={gemData.color}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight"
            name="weight"
            value={gemData.weight}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={gemData.price}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={gemData.quantity}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={gemData.category}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={gemData.status}
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
            Update Gem
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
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
    </Container>
  );
};

export default UpdateGems;
