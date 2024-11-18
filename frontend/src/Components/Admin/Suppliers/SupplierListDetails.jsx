import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SupplierListDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();
  const URL = "http://localhost:4000/api/suppliers"; // Adjust the URL as necessary

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(URL);
        setSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleEdit = (supId) => {
    navigate(`/admindashboard/update-supplier-list/${supId}`);
  };
  
  const handleDelete = async (supId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await axios.delete(`${URL}/${supId}`);
        setSuppliers((prev) => prev.filter((supplier) => supplier.SupId !== supId));
      } catch (error) {
        console.error("Error deleting supplier:", error.message);
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setNoResults(false);
      return;
    }

    const filteredSuppliers = suppliers.filter(supplier =>
      Object.values(supplier).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setSuppliers(filteredSuppliers);
    setNoResults(filteredSuppliers.length === 0);
  };

  const handleViewOrders = () => {
    navigate('/admindashboard/supplier-management'); // Link to supplier management
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Supplier List
      </Typography>
      
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        Total Suppliers: {suppliers.length}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexShrink: 1, width: '200px', backgroundColor: 'white', borderRadius: 1 }}
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
          onClick={handleViewOrders}
          sx={{ borderRadius: 2 }}
        >
          View Orders
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admindashboard/add-supplier-list')}
          sx={{ borderRadius: 2 }}
        >
          Add Supplier
        </Button>
      </Box>

      <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>NIC</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noResults ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">No suppliers found.</TableCell>
                </TableRow>
              ) : (
                suppliers.map((supplier) => (
                  <TableRow key={supplier.SupId}>
                    <TableCell>{supplier.SupId}</TableCell>
                    <TableCell>{supplier.SupName}</TableCell>
                    <TableCell>{supplier.description}</TableCell>
                    <TableCell>{supplier.NIC}</TableCell>
                    <TableCell>{supplier.Contact}</TableCell>
                    <TableCell>{supplier.Adress}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(supplier.SupId)} sx={{ color: 'primary.main' }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(supplier.SupId)} sx={{ color: 'error.main' }}>
                        <Delete />
                      </IconButton>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/admindashboard/add-supplier/${supplier.SupId}`)}
                        sx={{ marginLeft: 1 }}
                      >
                        Place Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SupplierListDetails;
