import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/employees";

function UpdateEmployee() {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [salary, setSalary] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPosition(response.data.position);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setNic(response.data.NIC);
        setSalary(response.data.salary);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedEmployee = {
        name,
        email,
        position,
        phone,
        address,
        NIC: nic,
        salary,
      };

      const response = await axios.put(`${URL}/${id}`, updatedEmployee);
      if (response.status === 200) {
        alert('Employee updated successfully!');
        navigate('/admindashboard/employee-details'); // Adjust the path if necessary
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert('Error updating employee. Please try again.');
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://rawayat.com.pk/cdn/shop/files/WhatsAppImage2023-11-17at3.55.06PM_700x.jpg?v=1700218682')`,
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          padding: 3,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Update Employee
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="NIC"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: 2 }}
        >
          Update Employee
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateEmployee;
