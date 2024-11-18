import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function UpdateSupplier() {
  const { supId } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    SupName: '',
    items: '',
    description: '',
    NIC: '',
    Contact: '',
    Adress: ''
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${URL}/${supId}`);
        const { SupName, items, description, NIC, Contact, Adress } = response.data;
        setFormData({
          SupName,
          items: items.join(', '), // Convert items array to comma-separated string
          description,
          NIC,
          Contact,
          Adress
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching supplier data.');
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supId]);

  const validate = () => {
    let tempErrors = {};
    
    // Supplier Name validation
    tempErrors.SupName = formData.SupName.trim() === '' ? 'Supplier name is required.' : 
                          formData.SupName.length < 3 ? 'Supplier name must be at least 3 characters.' : '';
    
    // Items validation
    const itemsArray = formData.items.split(',').map(item => item.trim());
    const uniqueItems = new Set(itemsArray);
    tempErrors.items = itemsArray.length === 0 ? 'At least one item is required.' : 
                       uniqueItems.size !== itemsArray.length ? 'Items must be unique.' : '';
    
    // Description validation
    tempErrors.description = formData.description.length > 200 ? 'Description should not exceed 200 characters.' : '';
    
    // NIC validation (must be 10 digits)
    tempErrors.NIC = formData.NIC.trim() === '' ? 'NIC is required.' : 
                     !/^\d{12}$/.test(formData.NIC) ? 'NIC must be a valid 10-digit number.' : '';
    
    // Contact validation (basic phone number format)
    tempErrors.Contact = formData.Contact.trim() === '' ? 'Contact is required.' : 
                         !/^\d{10}$/.test(formData.Contact) ? 'Contact must be a valid 10-digit number.' : '';
    
    // Address validation
    tempErrors.Adress = formData.Adress.trim() === '' ? 'Address is required.' : 
                        formData.Adress.length < 5 ? 'Address must be at least 5 characters.' : '';
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === ''); // Returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const itemsArray = formData.items.split(',').map(item => item.trim()); // Convert items string to array
        const response = await axios.put(`${URL}/${supId}`, {
          ...formData,
          items: itemsArray
        });
        setSnackbarMessage('Supplier updated successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/admindashboard/supplier-list-details'), 2000);
      } catch (error) {
        setSnackbarMessage('Error updating supplier: ' + (error.response ? error.response.data.message : error.message));
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/admindashboard/supplier-list-details'); // Navigate back to the supplier list
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>Update Supplier</Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Supplier Name"
            name="SupName"
            value={formData.SupName}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.SupName)}
            helperText={errors.SupName}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Items (comma-separated)"
            name="items"
            value={formData.items} // Display as comma-separated string
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.items)}
            helperText={errors.items}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            error={Boolean(errors.description)}
            helperText={errors.description}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="NIC"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.NIC)}
            helperText={errors.NIC}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Contact"
            name="Contact"
            value={formData.Contact}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.Contact)}
            helperText={errors.Contact}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Address"
            name="Adress"
            value={formData.Adress}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.Adress)}
            helperText={errors.Adress}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            Update Supplier
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Back
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default UpdateSupplier;
