import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/quantity-description";

const AddQuantityDescription = () => {
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending'); // Set default status to "Pending"
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
    const navigate = useNavigate();

    // Only "Pending" status available
    const statuses = ['Pending'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URL, { quantity, description, status });
            setOpenSnackbar(true); // Show success message
            setTimeout(() => {
                navigate('/admindashboard/inventory-management'); // Redirect after a brief moment
            }, 2000); // Wait 2 seconds before redirecting
        } catch (error) {
            console.error("Error adding quantity description:", error);
        }
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    // Function to handle back button
    const handleBack = () => {
        navigate(-1); // Go back one page
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Add Quantity Description
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Quantity"
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                    >
                        {statuses.map((statusOption) => (
                            <MenuItem key={statusOption} value={statusOption}>
                                {statusOption}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#4caf50',
                            '&:hover': {
                                backgroundColor: '#45a049',
                            },
                        }}
                    >
                        Add Quantity Description
                    </Button>
                </Box>
            </form>

            {/* Back button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    Back
                </Button>
            </Box>

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Quantity description added successfully!"
            />
        </Box>
    );
};

export default AddQuantityDescription;
