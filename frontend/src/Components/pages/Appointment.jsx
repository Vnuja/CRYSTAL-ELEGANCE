import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Alert,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import Logo from '../Images/3.png'; // Use the same logo as in the Login component

const URL = "http://localhost:4000/appointments";

function Appointment() {
  const [appointment, setAppointment] = useState({
    customerName: '',
    contactNumber: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    notes: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, appointment);
      console.log('Appointment added:', response.data);
      setSuccess(true); // Show success message
      // Clear the form after submission
      setAppointment({
        customerName: '',
        contactNumber: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: '',
        notes: '',
      });
    } catch (err) {
      setError('Error adding appointment. Please try again.');
      console.error("Error:", err.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Box sx={{ backgroundColor: '#FAF2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
        <Paper elevation={6} sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4, borderRadius: 2, maxWidth: 900 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8D9D9', borderRadius: 2 }}>
              <img src={Logo} alt="Crystal Elegance" style={{ maxWidth: '100%', height: '50vh', paddingBottom: 30, paddingRight: 30 }} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Schedule an Appointment
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                We add elegance to your freedom
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Customer Name"
                  variant="outlined"
                  name="customerName"
                  value={appointment.customerName}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <PersonIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Contact Number"
                  variant="outlined"
                  name="contactNumber"
                  value={appointment.contactNumber}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <PhoneIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  value={appointment.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <EmailIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Appointment Date"
                  type="date"
                  variant="outlined"
                  name="appointmentDate"
                  value={appointment.appointmentDate}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <DateRangeIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Appointment Time"
                  type="time"
                  variant="outlined"
                  name="appointmentTime"
                  value={appointment.appointmentTime}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <AccessTimeIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <InputLabel id="service-type-label">Service Type</InputLabel>
                <Select
                  fullWidth
                  labelId="service-type-label"
                  variant="outlined"
                  name="serviceType"
                  value={appointment.serviceType}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FDF2F2', borderRadius: 2 }}
                >
                  <MenuItem value="" disabled>Select a Service</MenuItem>
                  <MenuItem value="buy_gem">Buy a Gem</MenuItem>
                  <MenuItem value="repair_jewelry">Repair a Jewelry</MenuItem>
                  <MenuItem value="visit">Visit</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  placeholder="Notes"
                  variant="outlined"
                  name="notes"
                  multiline
                  rows={4}
                  value={appointment.notes}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <DescriptionIcon color="disabled" />,
                    sx: { backgroundColor: '#FDF2F2', borderRadius: 2 },
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#F8B9B7',
                    color: '#fff',
                    paddingY: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Schedule Appointment
                </Button>
                <Divider sx={{ marginY: 2 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Appointment scheduled successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
}

export default Appointment;
