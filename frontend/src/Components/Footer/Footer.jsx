/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import footerLogo from '../Images/3.png'; // Adjust the path according to your project structure

function Footer() {
  return (
    <Box
      sx={{
        py: 3, // Adjust padding as needed
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        height: '150px', // Set the height of the footer
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      component="footer"
    >
      <Grid container spacing={0.5} justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={3.5}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <img src={footerLogo} alt="Logo" style={{ height: '17vh', objectFit: 'contain' }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Quick Links
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link href="/about" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                About
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/support" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                Support
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/gallery" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                Gallery
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            Legal
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link href="/privacypolicy" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/termsofuse" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                Terms of Use
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/refunds" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
                Sales and Refunds
              </Link>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={-8}>
        <Link href="https://instagram.com" target="_blank" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
          Instagram
        </Link>{' '}
        |{' '}
        <Link href="https://facebook.com" target="_blank" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
          Facebook
        </Link>{' '}
        |{' '}
        <Link href="https://twitter.com" target="_blank" variant="body2" sx={{ color: 'black', textDecoration: 'none' }}>
          Twitter
        </Link>
      </Box>
      <Box textAlign="center" mt={1}>
        <Typography variant="body2" sx={{ color: 'black' }}>
          © {new Date().getFullYear()} Crystal Elegance. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
