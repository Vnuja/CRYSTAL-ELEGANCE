/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function AddSupplierList() {
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
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        const nicRegex = /^(?:\d{9}V|\d{12})$/; // NIC pattern: 9 digits followed by "V" or 10 digits
        const contactRegex = /^[0-9]{10}$/; // Contact must be 10 digits

        tempErrors.SupName = formData.SupName.trim() === '' ? 'Supplier name is required.' : '';
        tempErrors.items = formData.items.trim() === '' ? 'At least one item is required.' : '';
        tempErrors.description = formData.description.length > 200 ? 'Description should not exceed 200 characters.' : '';
        tempErrors.NIC = !nicRegex.test(formData.NIC) ? 'NIC is invalid. Must be 9 digits followed by "V" or 10 digits without "V".' : '';
        tempErrors.Contact = !contactRegex.test(formData.Contact) ? 'Contact must be 10 digits.' : '';
        tempErrors.Adress = formData.Adress.trim() === '' ? 'Address is required.' : '';

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
                const itemsArray = formData.items.split(',').map(item => item.trim());
                const response = await axios.post(URL, {
                    ...formData,
                    items: itemsArray
                });
                setSnackbarMessage('Supplier list added successfully');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admindashboard/supplier-list-details'), 2000);
            } catch (error) {
                setSnackbarMessage('Error adding supplier list: ' + (error.response ? error.response.data.message : error.message));
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Add Supplier List</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Supplier Name"
                    name="SupName"
                    variant="outlined"
                    fullWidth
                    value={formData.SupName}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={Boolean(errors.SupName)}
                    helperText={errors.SupName}
                />
                <TextField
                    label="Items (comma-separated)"
                    name="items"
                    variant="outlined"
                    fullWidth
                    value={formData.items}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={Boolean(errors.items)}
                    helperText={errors.items}
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                />
                <TextField
                    label="NIC"
                    name="NIC"
                    variant="outlined"
                    fullWidth
                    value={formData.NIC}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={Boolean(errors.NIC)}
                    helperText={errors.NIC}
                />
                <TextField
                    label="Contact"
                    name="Contact"
                    variant="outlined"
                    fullWidth
                    value={formData.Contact}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={Boolean(errors.Contact)}
                    helperText={errors.Contact}
                />
                <TextField
                    label="Address"
                    name="Adress"
                    variant="outlined"
                    fullWidth
                    value={formData.Adress}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={Boolean(errors.Adress)}
                    helperText={errors.Adress}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Add Supplier List
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)} 
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
        </Box>
    );
}

export default AddSupplierList;
