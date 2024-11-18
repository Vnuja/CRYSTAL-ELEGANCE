/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/inventory";

function AddInventory({ onBack }) {
  const [InvID, setInvID] = useState('');
  const [GID, setGID] = useState(''); // Gem ID
  const [quantity, setQuantity] = useState('');
  const [minStock, setMinStock] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Function to generate the next InvID
  const generateInvID = async () => {
    try {
      const response = await axios.get(URL); // Fetch all inventory items
      const inventories = response.data;

      // Extract existing InvIDs and find the next one
      const currentIds = inventories.map(inv => parseInt(inv.InvID.replace('INV', '')));
      const maxId = currentIds.length ? Math.max(...currentIds) : 0;

      // Generate the next InvID
      const nextID = `INV${String(maxId + 1).padStart(3, '0')}`;
      setInvID(nextID);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setInvID('INV001'); // Fallback ID if error occurs
    }
  };

  useEffect(() => {
    generateInvID(); // Generate InvID on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(URL, { InvID, GID, quantity, minStock, status });
      if (response.status === 201) {
        alert('Inventory added successfully');
        navigate('/admindashboard/inventory-management');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Inventory
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Inventory ID"
          variant="outlined"
          value={InvID}
          InputProps={{ readOnly: true }} // Make InvID read-only
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gem ID"
          variant="outlined"
          value={GID}
          onChange={(e) => setGID(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Minimum Stock"
          variant="outlined"
          type="number"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Inventory
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
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

export default AddInventory;
