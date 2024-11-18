/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const URL = "http://localhost:4000/api/gems"; // Updated URL for gems

function Gem() {
  const { id } = useParams(); // Get the gem ID from URL parameters
  const [gem, setGem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setGem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gem details:', error);
        setLoading(false);
      }
    };

    fetchGem();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!gem) return <Typography>No gem found.</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gem Details
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6">ID: {gem.GID}</Typography>
        {/* Removed image section since it's not part of the model */}
        <Typography variant="h6">Name: {gem.name}</Typography>
        <Typography variant="h6">Color: {gem.color}</Typography>
        <Typography variant="h6">Price: ${gem.price}</Typography>
        <Typography variant="h6">Weight: {gem.weight}</Typography>
        <Typography variant="h6">Category: {gem.category}</Typography>
        <Typography variant="h6">Quantity: {gem.quantity}</Typography>
        <Typography variant="h6">Status: {gem.status}</Typography>
      </Paper>
    </Box>
  );
}

export default Gem;
