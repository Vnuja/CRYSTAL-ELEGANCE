import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/appointments";

const UpdateAppointment = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        const appointment = response.data;
        
        // Set the state with the fetched appointment details
        setCustomerName(appointment.customerName);
        setContactNumber(appointment.contactNumber);
        setEmail(appointment.email);
        setAppointmentDate(appointment.appointmentDate.split('T')[0]); // Format date as YYYY-MM-DD
        setServiceType(appointment.serviceType);
        setStatus(appointment.status);
      } catch (err) {
        console.error("Error fetching appointment details:", err.response ? err.response.data : err.message);
        setError('Error fetching appointment details. Please try again.');
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedAppointment = {
        customerName,
        contactNumber,
        email,
        appointmentDate,
        serviceType,
        status,
      };
      const response = await axios.put(`${URL}/${id}`, updatedAppointment);
      console.log('Appointment updated:', response.data);
      navigate('/admindashboard/appointment-management'); // Redirect after update
    } catch (err) {
      console.error("Error updating appointment:", err.response ? err.response.data : err.message);
      setError('Error updating appointment. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <h2>Update Appointment</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleUpdate}>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          required
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Appointment Date"
          type="date"
          variant="outlined"
          fullWidth
          required
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Service Type"
          variant="outlined"
          fullWidth
          required
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Update Appointment
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/admindashboard/appointment-management')} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default UpdateAppointment;
