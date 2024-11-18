import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const URL = "http://localhost:4000/suppliers/orders";

function AddSupplierOrder() {
    const { supId } = useParams(); // Get the supplier ID from the URL
    const [formData, setFormData] = useState({
        SupOrderID: '', // Now set by user
        InvID: '',
        SupID: supId || '', // Pre-fill SupID with the supplier ID from URL
        quantity: '',
        status: 'Pending',
        description: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false); // Set initial loading state to false
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errors = { ...formErrors };

        switch (name) {
            case 'SupOrderID':
                errors.SupOrderID = !value.match(/^[a-zA-Z0-9]+$/)
                    ? 'SupOrderID must be alphanumeric.'
                    : '';
                break;
            case 'InvID':
                errors.InvID = !value.match(/^[a-zA-Z0-9]+$/)
                    ? 'InvID must be alphanumeric.'
                    : '';
                break;
            case 'quantity':
                errors.quantity = value <= 0 || isNaN(value)
                    ? 'Quantity must be a positive number.'
                    : '';
                break;
            case 'description':
                errors.description = value.length > 200
                    ? 'Description must be less than 200 characters.'
                    : '';
                break;
            default:
                break;
        }

        setFormErrors(errors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any validation errors exist
        if (Object.values(formErrors).some(error => error)) {
            setSnackbarMessage('Please fix the validation errors before submitting.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true); // Start loading state
        try {
            await axios.post(URL, formData);
            setSnackbarMessage('Order added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setFormData({ // Clear form data after successful submission
                SupOrderID: '',
                InvID: '',
                SupID: supId || '',
                quantity: '',
                status: 'Pending',
                description: ''
            });
            navigate('/admindashboard/supplier-management'); // Redirect after successful submission
        } catch (error) {
            setSnackbarMessage('Error adding order: ' + (error.response?.data?.message || error.message));
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // End loading state
        }
    };

    // Function to handle closing the snackbar
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Add Supplier Order</Typography>
            {loading ? ( // Display loading spinner
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="SupOrderID"
                        name="SupOrderID"
                        variant="outlined"
                        fullWidth
                        value={formData.SupOrderID}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!formErrors.SupOrderID}
                        helperText={formErrors.SupOrderID}
                    />
                    <TextField
                        label="InvID (Inventory ID)"
                        name="InvID"
                        variant="outlined"
                        fullWidth
                        value={formData.InvID}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!formErrors.InvID}
                        helperText={formErrors.InvID}
                    />
                    <TextField
                        label="SupID (Supplier ID)"
                        name="SupID"
                        variant="outlined"
                        fullWidth
                        value={formData.SupID}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled // Disable editing for SupID
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.quantity}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!formErrors.quantity}
                        helperText={formErrors.quantity}
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Description"
                        name="description"
                        variant="outlined"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Add Order
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/admindashboard/supplier-list-details')}
                        sx={{ marginTop: 2, marginLeft: 2 }}
                    >
                        Back
                    </Button>
                </form>
            )}
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

export default AddSupplierOrder;
