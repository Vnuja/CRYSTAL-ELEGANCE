import React, { useState } from 'react';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import contactUsImage from '../Images/coverc.png'; // Adjust path as needed
import userImage from '../Images/t2.png'; // Add a user image here

function ContactUs() {
  const [open, setOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all items. Please contact us for more details.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'You can change or cancel your order within 24 hours of purchase. Please contact our support for assistance.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to many countries. Shipping costs will vary based on location.',
    },
    {
      question: 'How do I return an item?',
      answer: 'To return an item, please contact our customer support to receive a return authorization and instructions.',
    },
  ];

  const handleClickOpen = (faq) => {
    setSelectedFAQ(faq);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFAQ(null);
  };

  return (
    <Box sx={{ backgroundColor: '#FAF2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Image at the top with fade-in animation */}
      <Box
        component="img"
        src={contactUsImage}
        alt="Contact Us"
        sx={{
          width: '100%',
          height: 'auto',
          animation: 'fadeIn 1s ease-in-out', // Apply fade-in animation
        }}
      />
      
      {/* Background area with user image */}
      <Box
        sx={{
          backgroundImage: `url(${userImage})`, // Set the background image here
          backgroundSize: 'cover', // Cover the entire box
          backgroundPosition: 'center',
          height: '100vh', // Set height to cover full viewport height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align items to the top
          paddingTop: '20px', // Optional: add some padding at the top
          margin: '0', // Remove margin to ensure full coverage
          borderRadius: '0', // Remove rounding if full coverage is desired
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 5 }}>
          
          {/* FAQ Section with slide-in animation */}
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 2,
              width: '100%',
              animation: 'slideIn 0.5s ease-in-out', // Slide-in animation
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set transparent background
              backdropFilter: 'blur(10px)', // Optional: add a blur effect for better readability
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom align="center">
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Box key={index} sx={{ marginBottom: '15px' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ cursor: 'pointer', color: '#007bff', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => handleClickOpen(faq)}
                >
                  {faq.question}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* FAQ Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectedFAQ?.question}</DialogTitle>
            <DialogContent>
              <Typography>{selectedFAQ?.answer}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default ContactUs;
