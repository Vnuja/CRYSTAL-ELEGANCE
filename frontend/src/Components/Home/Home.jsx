/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar'; // Ensure the path is correct
import backgroundImage1 from '../Images/Rectangle2.png';
import backgroundImage2 from '../Images/Rectangle3.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay for initial fade-in effect
    return () => clearTimeout(timer);
  }, []);

  const handleShopNowClick = () => {
    navigate('/jewellery'); // Navigate to /jewellery
  };

  return (
    <div style={{ 
      height: '100vh', 
      margin: 0,
      overflow: 'hidden',
      opacity: fadeIn ? 1 : 0,
      transition: 'opacity 2s ease-out',
    }}>
      <Navbar /> {/* Include the Navbar component */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundImage1}), url(${backgroundImage2})`,
          backgroundPosition: 'left center, right center',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '51% 100%, 51% 100%',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 2s ease-out',
        }}
      >
        {/* Main Title */}
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            color: '#FAF2F2',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '6rem',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            padding: '20px',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: fadeIn ? 'translateY(0)' : 'translateY(-50px)',
            opacity: fadeIn ? 1 : 0,
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
        >
          <span style={{ position: 'relative', left: '-0.1em' }}>CRYSTAL</span>
          <span style={{ position: 'relative', right: '-1em', transition: 'transform 2s ease-out' }}>ELEGANCE</span>
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            color: '#FAF2F2',
            fontFamily: '"Allura", cursive', // Apply the custom font
            fontWeight: 400, // Apply the font weight
            fontStyle: 'normal', // Apply the font style
            marginTop: '50px',
            marginBottom: '-60px',
            textAlign: 'center',
            fontSize: '3rem',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
        >
          We add elegance to your freedom
        </Typography>

        {/* Shopping Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ShoppingCartIcon />}
          sx={{
            position: 'absolute',
            bottom: '90px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#F0F0F0',
              transform: 'scale(1.1)',
              transition: 'transform 0.3s',
            },
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
          onClick={handleShopNowClick} // Navigate on click
        >
          Shop Now
        </Button>
      </Box>
    </div>
  );
}

export default Home;
