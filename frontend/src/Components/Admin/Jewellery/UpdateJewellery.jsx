/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

// Sample categories and subcategories
const categories = [
  { name: 'Rings', subcategories: ['Engagement Rings', 'Wedding Bands', 'Fashion Rings'] },
  { name: 'Necklaces', subcategories: ['Pendants', 'Chains', 'Chokers'] },
  { name: 'Bracelets', subcategories: ['Bangles', 'Cuff Bracelets', 'Charm Bracelets'] },
  { name: 'Earrings', subcategories: ['Studs', 'Hoops', 'Dangles'] },
  { name: 'Watches', subcategories: [] },
  { name: 'Anklets', subcategories: [] },
];

function UpdateJewellery() {
  const { JID } = useParams();
  const [jewellery, setJewellery] = useState({
    image: '',
    name: '',
    price: '',
    quantity: '',
    status: 'available',
    category: '',
    subcategory: '',
    weight: '', // New field for weight
    goldStandard: '' // New field for gold standard
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const response = await axios.get(`${URL}/${JID}`);
        setJewellery(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [JID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewellery({ ...jewellery, [name]: value });
    if (name === 'category') {
      setJewellery({ ...jewellery, subcategory: '' }); // Reset subcategory when category changes
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${JID}`, jewellery);
      alert('Jewellery updated successfully');
      navigate('/admindashboard/jewellery-details');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Jewellery</Typography>
      <TextField
        label="Image URL"
        name="image"
        value={jewellery.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={jewellery.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={jewellery.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={jewellery.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Weight (in grams)" // New field for weight
        name="weight"
        type="number"
        value={jewellery.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gold Standard (e.g. 24K)" // New field for gold standard
        name="goldStandard"
        value={jewellery.goldStandard}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={jewellery.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Subcategory</InputLabel>
        <Select
          name="subcategory"
          value={jewellery.subcategory}
          onChange={handleChange}
          disabled={!jewellery.category} // Disable if no category is selected
        >
          {jewellery.category && categories.find(cat => cat.name === jewellery.category).subcategories.map((subcat) => (
            <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Status"
        name="status"
        select
        SelectProps={{ native: true }}
        value={jewellery.status}
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
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Jewellery
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default UpdateJewellery;
