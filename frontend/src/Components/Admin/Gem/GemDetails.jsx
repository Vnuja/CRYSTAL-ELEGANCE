/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddGem from './AddGem'; // Make sure you have this component
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/gems";

const fetchGems = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function GemDetails() {
  const [gems, setGems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddGemForm, setShowAddGemForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchGems().then(data => {
      setGems(data);
    }).catch(error => {
      console.error("Error fetching gems:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-gem/${id}`);
  };

  const deleteGem = async (id) => {
    try {
      console.log(`Attempting to delete gem with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);

      console.log('Delete response:', response);

      if (response.status === 204) {
        console.log(`Successfully deleted gem with ID: ${id}`);
        setGems(prev => prev.filter(item => item.GID !== id)); // Adjusted to use GID
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting gem:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Gem Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Color', 'Price', 'Weight', 'Category', 'Quantity', 'Status']],
      body: gems.map(item => [item.GID, item.name, item.color, item.price, item.weight, item.category, item.quantity, item.status]),
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

    doc.save('gem-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchGems().then(data => {
        setGems(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching gems:", error);
      });
      return;
    }

    const filteredGems = gems.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setGems(filteredGems);
    setNoResults(filteredGems.length === 0);
  };

  const handleAddGem = () => {
    setShowAddGemForm(true);
  };

  const handleBack = () => {
    setShowAddGemForm(false);
  };

  return (
    <Box>
      {showAddGemForm ? (
        <Box>
          <AddGem onBack={handleBack} />
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
              onClick={handleAddGem}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Gem
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">No gems found.</TableCell>
                    </TableRow>
                  ) : (
                    gems.map((item) => (
                      <TableRow key={item.GID}> {/* Updated to use GID */}
                        <TableCell>{item.GID}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.color}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item.GID)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteGem(item.GID)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
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
              sx={{ marginTop: 2, borderRadius: 2 }}
            >
              <Print /> Download
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default GemDetails;
