import React, { Component } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';

const URL = "http://localhost:4000/appointments";

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      contactNumber: '',
      email: '',
      appointmentDate: '',
      appointmentTime: '',
      serviceType: '',
      notes: '',
      error: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes } = this.state;

    try {
      const response = await axios.post(URL, {
        customerName,
        contactNumber,
        email,
        appointmentDate,
        appointmentTime,
        serviceType,
        notes,
      });
      console.log('Appointment added:', response.data);
      // Optionally, you can call a prop function here to refresh the list or redirect
      this.props.onBack(); // Assuming you want to go back to the previous page
    } catch (error) {
      console.error("Error adding appointment:", error.response ? error.response.data : error.message);
      this.setState({ error: 'Error adding appointment. Please try again.' });
    }
  };

  render() {
    const { customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes, error } = this.state;

    return (
      <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <h2>Add Appointment</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Customer Name"
            name="customerName"
            variant="outlined"
            fullWidth
            required
            value={customerName}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            variant="outlined"
            fullWidth
            required
            value={contactNumber}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Appointment Date"
            name="appointmentDate"
            type="date"
            variant="outlined"
            fullWidth
            required
            value={appointmentDate}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          
          <TextField
            label="Service Type"
            name="serviceType"
            variant="outlined"
            fullWidth
            required
            value={serviceType}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Notes"
            name="notes"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={this.handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Appointment
          </Button>
          <Button variant="outlined" color="secondary" onClick={this.props.onBack} sx={{ marginLeft: 2 }}>
            Back
          </Button>
        </form>
      </Box>
    );
  }
}
