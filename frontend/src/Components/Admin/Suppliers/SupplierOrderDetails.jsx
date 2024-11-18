import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton, Paper } from '@mui/material';
import { Edit, Delete, Print } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddSupplier from './AddSupplierOrder';

const URL = "http://localhost:4000/suppliers/orders";

const fetchSuppliers = async () => {
    try {
        const response = await axios.get(URL);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const abbreviateId = (id) => {
    return id.length > 8 ? `${id.substring(0, 8)}...` : id;
};

function SupplierDetails() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSuppliers().then(data => {
            setSuppliers(data);
            setNoResults(data.length === 0);
        }).catch(error => {
            console.error("Error fetching suppliers:", error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/admindashboard/update-supplier/${id}`);
    };

    const deleteSupplier = async (id) => {
        try {
            const response = await axios.delete(`${URL}/${id}`);
            if (response.status === 204) {
                setSuppliers(prev => prev.filter(item => item._id !== id));
                setNoResults(suppliers.length === 1);
            }
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("Supplier Details Report", 10, 10);

        doc.autoTable({
            head: [['Order ID', 'Type', 'Quantity', 'Inventory ID', 'Supplier ID', 'Status', 'Description']],
            body: suppliers.map(item => [
                abbreviateId(item.SupOrderID),
                item.type,
                item.quantity,
                abbreviateId(item.InvID),
                abbreviateId(item.SupID),
                item.status,
                item.description || 'No Description'
            ]),
            startY: 20,
            margin: { top: 20 },
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
            },
        });

        doc.save('supplier-details.pdf');
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchSuppliers().then(data => {
                setSuppliers(data);
                setNoResults(data.length === 0);
            }).catch(error => {
                console.error("Error fetching suppliers:", error);
            });
            return;
        }

        const filteredSuppliers = suppliers.filter(item =>
            Object.values(item).some(field =>
                field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setSuppliers(filteredSuppliers);
        setNoResults(filteredSuppliers.length === 0);
    };

    const handleBack = () => {
        setShowAddSupplierForm(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            {showAddSupplierForm ? (
                <AddSupplier onBack={handleBack} />
            ) : (
                <>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Supplier Order Details
                    </Typography>

                    <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                        Total Number of Supply Orders: {suppliers.length}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: '250px',
                                backgroundColor: 'white',
                                borderRadius: 1,
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
                            color="primary"
                            onClick={handleSearch}
                            sx={{ borderRadius: 2 }}
                        >
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePDF}
                            startIcon={<Print />}
                            sx={{ borderRadius: 2 }}
                        >
                            Download
                        </Button>
                    </Box>

                    <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Inventory ID</TableCell>
                                    <TableCell>Supplier ID</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {noResults ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography>No supplier orders found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    suppliers.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{abbreviateId(item.SupOrderID)}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{abbreviateId(item.InvID)}</TableCell>
                                            <TableCell>{abbreviateId(item.SupID)}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell>{item.description || 'No Description'}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteSupplier(item._id)} sx={{ color: 'error.main' }}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
}

export default SupplierDetails;
