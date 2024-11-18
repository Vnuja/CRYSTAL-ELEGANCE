import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/quantity-description";

const EditQuantityDescription = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [statuses] = useState(['Completed', 'canceled', 'Pending']); // Sample statuses
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
    const navigate = useNavigate();

    // Fetch the existing quantity description data
    const fetchQuantityDescription = async () => {
        try {
            const response = await axios.get(`${URL}/${id}`);
            const { quantity, description, status } = response.data;
            setQuantity(quantity);
            setDescription(description);
            setStatus(status);
        } catch (error) {
            console.error("Error fetching quantity description:", error);
        }
    };

    useEffect(() => {
        fetchQuantityDescription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/${id}`, { quantity, description, status });
            setOpenSnackbar(true); // Show success message
            setTimeout(() => {
                navigate('/admindashboard/quantity-description'); // Redirect after a brief moment
            }, 2000); // Wait 2 seconds before redirecting
        } catch (error) {
            console.error("Error updating quantity description:", error);
        }
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Edit Quantity Description
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
                        Update Quantity Description
                    </Button>
                </Box>
            </form>

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Quantity description updated successfully!"
            />
        </Box>
    );
};

export default EditQuantityDescription;
