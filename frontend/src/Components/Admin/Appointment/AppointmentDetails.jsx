import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import AddAppointment from './AddAppointment'; // Import the AddAppointment component

const URL = "http://localhost:4000/appointments";

const fetchAppointments = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function AppointmentDetails() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddAppointmentForm, setShowAddAppointmentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    getAppointments();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-appointment/${id}`);
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setAppointments(prev => prev.filter(item => item._id !== id));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment Details Report", 10, 10);

    doc.autoTable({
      head: [['Appointment ID', 'Customer Name', 'Contact Number', 'Email', 'Appointment Date', 'Service Type', 'Status']],
      body: appointments.map(item => [
        item.appointmentID, 
        item.customerName, 
        item.contactNumber, 
        item.email, 
        new Date(item.appointmentDate).toLocaleDateString(), 
        item.serviceType, 
        item.status
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

    doc.save('appointment-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchAppointments().then(data => {
        setAppointments(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching appointments:", error);
      });
      return;
    }

    const filteredAppointments = appointments.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setAppointments(filteredAppointments);
    setNoResults(filteredAppointments.length === 0);
  };

  const handleAddAppointment = () => {
    setShowAddAppointmentForm(true);
  };

  const handleBack = () => {
    setShowAddAppointmentForm(false);
  };

  return (
    <Box>
      {showAddAppointmentForm ? (
        <Box>
          <AddAppointment onBack={handleBack} />
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
              onClick={handleAddAppointment}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Appointment
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Appointment ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Appointment Date</TableCell>
                    <TableCell>Service Type</TableCell>
                    
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No appointments found.</TableCell>
                    </TableRow>
                  ) : (
                    appointments.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.appointmentID}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.contactNumber}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{new Date(item.appointmentDate).toLocaleDateString()}</TableCell>
                        <TableCell>{item.serviceType}</TableCell>
                        
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteAppointment(item._id)} sx={{ color: 'error.main' }}>
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
              sx={{ marginTop: 2 }}
            >
              Generate PDF
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AppointmentDetails;
