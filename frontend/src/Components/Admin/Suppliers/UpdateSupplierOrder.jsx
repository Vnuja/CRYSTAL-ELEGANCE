import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/suppliers/orders"; // Adjust the URL as necessary

function UpdateSupplierOrder() {
    const { id } = useParams(); // Order ID from the URL
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({
        SupOrderID: '',
        quantity: '',
        InvID: '',
        SupID: '',
        status: '',
        description: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${URL}/${id}`);
                setOrderDetails(response.data);
            } catch (error) {
                setError('Error fetching order details.');
            }
        };
        fetchOrderDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/${id}`, orderDetails); // Sending all updated fields to the backend
            navigate('/admindashboard/supplier-management'); // Redirect to supplier management after update
        } catch (error) {
            setError('Error updating order details.');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Update Supplier Order</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Quantity"
                    name="quantity"
                    variant="outlined"
                    fullWidth
                    value={orderDetails.quantity}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Inventory ID"
                    name="InvID"
                    variant="outlined"
                    fullWidth
                    value={orderDetails.InvID}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Supplier ID"
                    name="SupID"
                    variant="outlined"
                    fullWidth
                    value={orderDetails.SupID}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Status"
                    name="status"
                    variant="outlined"
                    fullWidth
                    value={orderDetails.status}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={orderDetails.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Update Order
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)} // Go back to the previous page
                    sx={{ marginTop: 2, marginLeft: 2 }}
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
}

export default UpdateSupplierOrder;
