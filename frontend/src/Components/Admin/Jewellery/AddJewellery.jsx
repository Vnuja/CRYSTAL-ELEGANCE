/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

// Sample categories and subcategories
const categories = [
  { name: 'Rings', subcategories: ['Engagement Rings', 'Wedding Bands', 'Fashion Rings'] },
  { name: 'Necklaces', subcategories: ['Pendants', 'Chains', 'Chokers'] },
  { name: 'Bracelets', subcategories: ['Bangles', 'Cuff Bracelets', 'Charm Bracelets'] },
  { name: 'Earrings', subcategories: ['Studs', 'Hoops', 'Dangles'] },
  { name: 'Watches', subcategories: [] },
  { name: 'Anklets', subcategories: [] }
];

// eslint-disable-next-line react/prop-types
function AddJewellery({ onBack }) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('available'); // Default to 'available'
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [weight, setWeight] = useState(''); // New field for weight
  const [goldStandard, setGoldStandard] = useState(''); // New field for gold standard
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post(URL, { 
        image, 
        name, 
        price, 
        quantity, 
        status, 
        category, 
        subcategory, 
        weight, // Include weight
        goldStandard // Include gold standard
      });
      if (response.status === 201) {
        alert('Jewellery added successfully');
        navigate('/admindashboard/jewellery-details');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Jewellery
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          label="Weight (in grams)"
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gold Standard (e.g. 24K)"
          variant="outlined"
          value={goldStandard}
          onChange={(e) => setGoldStandard(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          variant="outlined"
          select
          SelectProps={{ native: true }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
        >
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </TextField>
        <TextField
          select
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory(''); // Reset subcategory when category changes
          }}
          fullWidth
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        {category && (
          <TextField
            select
            label="Subcategory"
            variant="outlined"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            fullWidth
            margin="normal"
          >
            {categories.find(cat => cat.name === category)?.subcategories.map((subcat) => (
              <MenuItem key={subcat} value={subcat}>
                {subcat}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Jewellery
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

export default AddJewellery;
