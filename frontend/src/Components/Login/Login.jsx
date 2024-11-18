import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../Images/3.png'; // Your logo
import BackgroundImage from '../Images/l1.png'; // Import your background image

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [user, setUser] = useState({
        name: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/auth/login", {
                name: user.name,
                password: user.password,
            });

            if (response.status === 200) {
                const { token, user: loggedInUser } = response.data;

                login(token, loggedInUser);

                if (loggedInUser.type === "admin") {
                    alert("Admin Login Successful");
                    navigate("/admindashboard/dashboard");
                } else {
                    alert("User Login Successful");
                    navigate("/userprofile");
                }
            } else {
                alert("Login Error: " + response.data.message);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert("User not found");
            } else if (err.response && err.response.status === 400) {
                alert("Invalid credentials");
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingY: 5, paddingRight: 4 }}>
                <Paper
                    elevation={6}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with transparency
                        padding: 4,
                        borderRadius: 2,
                        maxWidth: 900,
                        backdropFilter: 'blur(10px)', // Adds a blur effect
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8D9D9', borderRadius: 2 }}>
                            <img src={Logo} alt="Crystal Elegance" style={{ maxWidth: '100%', paddingRight: 30, height: '50vh', paddingBottom: 30 }} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                LOGIN
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: 2, color: '#666' }}>
                                We add elegance to your freedom
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Username or Email"
                                    variant="outlined"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <PersonIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                    aria-label="Username or Email"
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <LockIcon color="disabled" />,
                                        sx: { backgroundColor: '#FDF2F2', borderRadius: 2 }
                                    }}
                                    sx={{ marginBottom: 3 }}
                                    aria-label="Password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: '#F8B9B7', color: '#fff', paddingY: 1.5, borderRadius: 2, boxShadow: 'none', textTransform: 'none', fontWeight: 'bold' }}
                                >
                                    Login Now
                                </Button>
                                <Divider sx={{ marginY: 2}}>
                                    <Typography variant="body2">Login with Others</Typography>
                                </Divider>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default Login;
