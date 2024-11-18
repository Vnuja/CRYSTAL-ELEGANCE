import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddInventory from './AddInventory';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/inventory";

const fetchInventory = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function InventoryDetails() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getInventory = async () => {
      try {
        const data = await fetchInventory();
        setInventory(data);
        filterLowStockItems(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    getInventory();
  }, []);

  const filterLowStockItems = (inventoryData) => {
    const lowStock = inventoryData.filter(item => item.quantity <= item.minStock);
    setLowStockItems(lowStock);
  };

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-inventory/${id}`);
  };

  const deleteInventory = async (id) => {
    try {
      console.log(`Attempting to delete inventory with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        console.log(`Successfully deleted inventory with ID: ${id}`);
        setInventory(prev => {
          const updatedList = prev.filter(item => item.InvID !== id);
          filterLowStockItems(updatedList);
          return updatedList;
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting inventory:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Details Report", 10, 10);

    doc.autoTable({
      head: [['InvID', 'GID', 'Quantity', 'Min Stock', 'Status']],
      body: inventory.map(item => [item.InvID, item.GID, item.quantity, item.minStock, item.status]),
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

    doc.save('inventory-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchInventory().then(data => {
        setInventory(data);
        filterLowStockItems(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching inventory:", error);
      });
      return;
    }

    const filteredInventory = inventory.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setInventory(filteredInventory);
    filterLowStockItems(filteredInventory);
    setNoResults(filteredInventory.length === 0);
  };

  const handleAddInventory = () => {
    setShowAddInventoryForm(true);
  };

  const handleBack = () => {
    setShowAddInventoryForm(false);
  };
  const placeOrder = () => {
    navigate(`/admindashboard/add-quantity-description`); // Navigate to the PlaceOrder page with the InvID
  };

  return (
    <Box>
      {showAddInventoryForm ? (
        <Box>
          <AddInventory onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '200px',
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
              color="secondary"
              onClick={handleAddInventory}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Inventory
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>InvID</TableCell>
                    <TableCell>GID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Min Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No inventory found.</TableCell>
                    </TableRow>
                  ) : (
                    inventory.map((item) => (
                      <TableRow key={item.InvID}>
                        <TableCell>{item.InvID}</TableCell>
                        <TableCell>{item.GID}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item.InvID)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteInventory(item.InvID)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
                          {item.quantity <= item.minStock && (
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() => placeOrder(item.InvID)}
                              sx={{ marginLeft: 1 }}
                            >
                              Place Order
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePDF}
              sx={{ marginTop: 2 }}
            >
              Generate PDF
            </Button>

            <Box sx={{ marginTop: 2 }}>
              <h3>Low Stock Items</h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>InvID</TableCell>
                    <TableCell>GID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Min Stock</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStockItems.map((item) => (
                    <TableRow key={item.InvID}>
                      <TableCell>{item.InvID}</TableCell>
                      <TableCell>{item.GID}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default InventoryDetails;
