import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import footerLogo from '../Images/3.png'; // Adjust the path for footer logo
import backgroundImage from '../Images/b3.jpg'; // Import your background image
import { Container, Typography, Box, Grid } from '@mui/material';

function AboutUs() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent image repetition
        minHeight: '100vh', // Ensure full height
        animation: 'fadeIn 1.5s ease-in-out', // Add fade-in animation to the entire page
      }}
    >
      <Header />
      <Container maxWidth="md" sx={{ paddingY: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            color: 'white',
            opacity: 0,
            animation: 'fadeInText 1.5s forwards',
            animationDelay: '0.5s',
          }}
        >
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={10}>
            <Box sx={{ textAlign: 'left', paddingX: 2 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'white',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1s',
                }}
              >
                Welcome to Crystal Elegance, your number one source for exquisite jewelry and gemstones.
                We are dedicated to giving you the very best of luxury with a focus on quality, customer service, and uniqueness.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'white',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1.2s',
                }}
              >
                Founded in 2002, Crystal Elegance has come a long way from its beginnings. When we first started out,
                our passion for beautiful gemstones and elegant designs drove us to start our own business.
                We hope you enjoy our products as much as we enjoy offering them to you.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'white',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1.4s',
                }}
              >
                If you have any questions or comments, please don't hesitate to{' '}
                <Link to="/Contact" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                  contact us
                </Link>.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', opacity: 0, animation: 'zoomIn 2s forwards', animationDelay: '2s' }}>
              <img
                src={footerLogo}
                alt="Logo"
                style={{
                  height: '20vh',
                  objectFit: 'contain',
                  paddingBottom: 70,
                }}
              />
              <Typography variant="body2" sx={{ color: 'white' }}>
                &copy; {new Date().getFullYear()} Crystal Elegance.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default AboutUs;
