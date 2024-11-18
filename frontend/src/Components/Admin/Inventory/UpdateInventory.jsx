import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const URL = "http://localhost:4000/inventory"; // Ensure this is your correct URL

const UpdateInventory = () => {
  const { InvID } = useParams(); // Get the inventory ID from the URL params
  const navigate = useNavigate(); // For navigating after updating
  const [inventory, setInventory] = useState({
    InvID: '',
    GID: '',
    quantity: '',
    minStock: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the inventory item when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        console.log(`Fetching inventory with ID: ${InvID}`); // Log the ID

        const response = await axios.get(`${URL}/${InvID}`);
        
        console.log('Response data:', response.data); // Log the fetched data

        if (response.data) {
          setInventory(response.data); // Set the fetched data to the state
        } else {
          setError('Inventory not found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Failed to load inventory.');
        setLoading(false);
      }
    };

    fetchInventory();
  }, [InvID]);

  // Handle input changes in the form
  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value
    });
  };

  // Handle the update request
  const handleUpdate = async () => {
    try {
      console.log('Updating inventory with:', inventory); // Log the data being sent

      await axios.put(`${URL}/update/${InvID}`, inventory);

      alert('Inventory updated successfully');
      navigate('/admindashboard/inventory-management'); // Navigate after success
    } catch (error) {
      console.error('Error updating inventory:', error);
      setError('Failed to update inventory.');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h4" gutterBottom>Update Inventory</Typography>

      <TextField
        label="Inventory ID"
        name="InvID"
        value={inventory.InvID || ''} // Ensure value is set correctly
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled // Disable editing of InvID
      />
      <TextField
        label="Gem ID"
        name="GID"
        value={inventory.GID || ''} // Ensure value is set correctly
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={inventory.quantity || ''} // Ensure value is set correctly
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Minimum Stock"
        name="minStock"
        type="number"
        value={inventory.minStock || ''} // Ensure value is set correctly
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        name="status"
        value={inventory.status || ''} // Ensure value is set correctly
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Inventory
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default UpdateInventory;
