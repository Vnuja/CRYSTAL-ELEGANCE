import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, Box } from '@mui/material';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: 'url(https://c0.wallpaperflare.com/preview/984/867/753/jewellery-gold-wedding-indian.jpg', // Replace with your image link
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensures the background covers the entire height of the page
        }}
      >
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Privacy Policy
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Introduction
            </Typography>
            <Typography variant="body1">
              Welcome to CRYSTAL ELEGANCE. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at support@crystalelegance.com
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Information We Collect
            </Typography>
            <Typography variant="body1">
              We collect personal information that you voluntarily provide to us when registering at the website, expressing an interest in obtaining information about us or our products, when participating in activities on the website, or otherwise contacting us.
            </Typography>
            <ul>
              <Typography component="li" variant="body2">
                Name and Contact Data: We collect your first and last name, email address, postal address, phone number, and other similar contact data.
              </Typography>
              <Typography component="li" variant="body2">
                Payment Data: We collect data necessary to process your payment if you make purchases, such as your payment instrument number.
              </Typography>
            </ul>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography variant="body1">
              We use the information we collect or receive:
            </Typography>
            <ul>
              <Typography component="li" variant="body2">
                To facilitate account creation and the login process.
              </Typography>
              <Typography component="li" variant="body2">
                To process your orders and manage payments.
              </Typography>
              <Typography component="li" variant="body2">
                To send you marketing and promotional communications.
              </Typography>
              <Typography component="li" variant="body2">
                To enforce our terms, conditions, and policies for business purposes and to comply with legal and regulatory requirements.
              </Typography>
            </ul>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sharing Your Information
            </Typography>
            <Typography variant="body1">
              We only share your information with your consent, to comply with laws, to provide you with services, or to fulfill business obligations.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Privacy Rights
            </Typography>
            <Typography variant="body1">
              You may review, change, or terminate your account at any time. Based on the laws of some regions, you may have additional rights like accessing or deleting your personal data.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              If you have any questions about this Privacy Policy, please contact us:
            </Typography>
            <Typography variant="body2">
              Email: support@crystalelegance.com
            </Typography>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }
}
