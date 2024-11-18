/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

function Jewellery() {
  const { id } = useParams(); // Changed JID to id
  const [jewellery, setJewellery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setJewellery(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jewellery details:', error);
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!jewellery) return <Typography>No jewellery found.</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Jewellery Details
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6">ID: {jewellery.JID}</Typography>
        <Typography variant="h6">Image:</Typography>
        <img src={jewellery.image || 'default-image-path'} alt={jewellery.name} style={{ width: '150px', height: '150px' }} />
        <Typography variant="h6">Name: {jewellery.name}</Typography>
        <Typography variant="h6">Price: ${jewellery.price}</Typography>
        <Typography variant="h6">Quantity: {jewellery.quantity}</Typography>
        <Typography variant="h6">Status: {jewellery.status}</Typography>
      </Paper>
    </Box>
  );
}

export default Jewellery;
