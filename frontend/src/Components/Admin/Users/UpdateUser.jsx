import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/users";

function UpdateUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({
    userName: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '', // Added gender field
    birthday: '', // Added birthday field
    type: 'user' // Default to 'user'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        console.log('Fetched User:', response.data); // Check the data
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log('Update Payload:', user); // Check the payload
      await axios.put(`${URL}/${id}`, user);
      alert('User updated successfully');
      navigate('/admindashboard/user-management'); // Redirect to the user management page
    } catch (error) {
      console.error("Error updating user:", error);
      alert('Error updating user');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update User</Typography>
      <TextField
        label="Username"
        name="userName"
        value={user.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>User Type</InputLabel>
        <Select
          name="type"
          value={user.type}
          onChange={handleChange}
          label="User Type"
        >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={user.gender}
          onChange={handleChange}
          label="Gender"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="bot">Bot</MenuItem>
          </Select>
      </FormControl>
      <TextField
        label="Birthday"
        name="birthday"
        type="date"
        value={user.birthday}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      /><br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update
      </Button>
    </Box>
  );
}

export default UpdateUser;
