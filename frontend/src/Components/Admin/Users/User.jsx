import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const URL = "http://localhost:4000/users";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${URL}/${userId}`);
                setUser(response.data);
                setLoading(false); // Stop loading when data is fetched
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Error fetching user details.'); // Set error message
                setLoading(false); // Stop loading on error
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">ID: {user.userId}</Typography>
                <Typography variant="h6">Username: {user.userName}</Typography>
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Typography variant="h6">Phone: {user.phone}</Typography>
                <Typography variant="h6">Type: {user.type}</Typography>
                <Typography variant="h6">Gender: {user.gender}</Typography> {/* Added gender */}
                <Typography variant="h6">Birthday: {new Date(user.birthday).toLocaleDateString()}</Typography> {/* Added birthday */}
            </Paper>
        </Box>
    );
}

export default User;
