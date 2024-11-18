import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, Box } from '@mui/material';
import background from '../Images/t1.png'; // Ensure this path is correct and the image exists

export default class TermsOfUse extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`, // Use backticks to inject the image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensures the background covers the full page
        }}
      >
        <Navbar />

        <Container
          maxWidth="md"
          sx={{
            mt: 4,
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          {/* Terms of Use Content */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Terms of Use
            </Typography>
            <Typography variant="subtitle1">Last Updated: October 05, 2024</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Agreement to Terms
            </Typography>
            <Typography variant="body1">
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity
              you and CRYSTAL ELEGANCE, concerning your access to and use of the crystalelegance.com website as
              well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected
              thereto (collectively, the “Site”).
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Intellectual Property Rights
            </Typography>
            <Typography variant="body1">
              Unless otherwise indicated, the Site and all content, including but not limited to, the text, graphics, images, and code are
              owned by us. You are granted a limited license to access and use the Site for your personal, non-commercial use only.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Representations
            </Typography>
            <Typography variant="body1">
              By using the Site, you represent and warrant that: (1) all registration information you submit is truthful and accurate; (2)
              you will maintain the accuracy of such information; (3) you have the legal capacity and agree to comply with these Terms of
              Use.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prohibited Activities
            </Typography>
            <Typography variant="body1">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be
              used in connection with any commercial endeavors except those specifically endorsed or approved by us.
            </Typography>
            <ul>
              <Typography component="li" variant="body2">
                You will not engage in unauthorized framing of or linking to the Site.
              </Typography>
              <Typography component="li" variant="body2">
                You will not make improper use of our support services or submit false reports of abuse or misconduct.
              </Typography>
            </ul>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Limitation of Liability
            </Typography>
            <Typography variant="body1">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other
              damages arising from your use of the site.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Governing Law
            </Typography>
            <Typography variant="body1">
              These Terms shall be governed by and defined following the laws of Sri Lanka. CRYSTAL ELEGANCE and yourself irrevocably
              consent that the courts of [your location] shall have exclusive jurisdiction to resolve any dispute.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              If you have any questions regarding these Terms of Use, you can contact us:
            </Typography>
            <Typography variant="body2">Email: support@crystalelegance.com</Typography>
          </Box>
        </Container>

        <Footer />
      </div>
    );
  }
}
