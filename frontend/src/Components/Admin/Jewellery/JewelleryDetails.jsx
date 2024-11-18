/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add, Download } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddJewellery from './AddJewellery';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

const fetchJewellery = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function JewelleryDetails() {
  const [jewellery, setJewellery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddJewelleryForm, setShowAddJewelleryForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJewellery().then(data => {
      setJewellery(data);
    }).catch(error => {
      console.error("Error fetching jewellery:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-jewellery/${id}`);
  };

  const deleteJewellery = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setJewellery(prev => prev.filter(item => item._id !== id));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting jewellery:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Jewellery Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Price', 'Quantity', 'Status', 'Weight', 'Gold Standard']],
      body: jewellery.map(item => [
        item.JID,
        item.name,
        item.price,
        item.quantity,
        item.status,
        item.weight,
        item.goldStandard
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

    doc.save('jewellery-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchJewellery().then(data => {
        setJewellery(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching jewellery:", error);
      });
      return;
    }

    const filteredJewellery = jewellery.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setJewellery(filteredJewellery);
    setNoResults(filteredJewellery.length === 0);
  };

  const handleAddJewellery = () => {
    setShowAddJewelleryForm(true);
  };

  const handleBack = () => {
    setShowAddJewelleryForm(false);
  };

  return (
    <Box>
      {showAddJewelleryForm ? (
        <Box>
          <AddJewellery onBack={handleBack} />
        </Box>
      ) : (
        <>
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
              onClick={handlePDF}
              sx={{ borderRadius: 2 }}
              startIcon={<Download />}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddJewellery}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Jewellery
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            {noResults ? (
              <Typography align="center" variant="h6">No jewellery found.</Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {jewellery.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.image || 'default-image-path'} // Replace with actual image path
                          alt={item.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: {item.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Status: {item.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Weight: {item.weight}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Gold Standard: {item.goldStandard}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteJewellery(item._id)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default JewelleryDetails;
