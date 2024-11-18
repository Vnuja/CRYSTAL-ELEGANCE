import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';

const EmployeeProfile = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employee data by ID
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/employees/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employee data');
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: '50%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Employee Profile
        </Typography>
        {employee && (
          <>
            <Typography variant="h6">Employee ID: {employee.EMPID}</Typography>
            <Typography variant="h6">Name: {employee.name}</Typography>
            <Typography variant="h6">Email: {employee.email}</Typography>
            <Typography variant="h6">Position: {employee.position}</Typography>
            <Typography variant="h6">Phone: {employee.phone}</Typography>
            <Typography variant="h6">Address: {employee.address}</Typography>
            <Typography variant="h6">NIC: {employee.NIC}</Typography>
            <Typography variant="h6">Salary: {employee.salary}</Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default EmployeeProfile;
