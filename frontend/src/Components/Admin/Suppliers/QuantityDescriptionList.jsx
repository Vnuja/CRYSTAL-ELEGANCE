import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/quantity-description";

const QuantityDescriptionList = () => {
    const [entries, setEntries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    // Fetch Quantity Description entries from the backend
    const fetchQuantityDescriptions = async () => {
        try {
            const response = await axios.get(URL);
            setEntries(response.data);
            setNoResults(response.data.length === 0);
        } catch (error) {
            console.error("Error fetching quantity descriptions:", error);
        }
    };

    useEffect(() => {
        fetchQuantityDescriptions();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admindashboard/edit-quantity-description/${id}`);
    };

    const deleteQuantityDescription = async (id) => {
        try {
            const response = await axios.delete(`${URL}/${id}`);
            if (response.status === 204) {
                setEntries(entries.filter(entry => entry._id !== id));
                setNoResults(entries.length === 1);
            }
        } catch (error) {
            console.error("Error deleting quantity description entry:", error);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchQuantityDescriptions();
            return;
        }

        const filteredEntries = entries.filter(entry =>
            Object.values(entry).some(field =>
                field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setEntries(filteredEntries);
        setNoResults(filteredEntries.length === 0);
    };

    

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Quantity Description List
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: '250px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey.300',
                            },
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{ borderRadius: 2 }}
                >
                    Search
                </Button>
                
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Quantity</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {noResults ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography>No quantity descriptions found.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            entries.map((entry) => (
                                <TableRow key={entry._id}>
                                    <TableCell>{entry.quantity}</TableCell>
                                    <TableCell>{entry.description}</TableCell>
                                    <TableCell>{entry.status}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(entry._id)} sx={{ color: 'primary.main' }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => deleteQuantityDescription(entry._id)} sx={{ color: 'error.main' }}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default QuantityDescriptionList;
