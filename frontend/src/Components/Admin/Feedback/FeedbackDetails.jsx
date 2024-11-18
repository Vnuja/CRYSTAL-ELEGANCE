import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas'; // Import html2canvas
import AddFeedback from './AddFeedback'; // Ensure path is correct
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; // Only Bar chart for PDF
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables from chart.js

// Register the necessary components
Chart.register(...registerables);

const URL = "http://localhost:4000/feedback";

const fetchFeedbacks = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function FeedbackDetails() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const navigate = useNavigate();
  const [chartRef, setChartRef] = useState(null); // To store chart reference for PDF

  useEffect(() => {
    fetchFeedbacks().then(data => {
      console.log("Fetched feedbacks:", data);
      setFeedbacks(data);
    }).catch(error => {
      console.error("Error fetching feedbacks:", error);
    });
  }, []);

  const analyzeFeedbacks = () => {
    const ratings = feedbacks.map(feedback => feedback.rating);
    const averageRating = (ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length).toFixed(2);

    const ratingCounts = ratings.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    return { averageRating, ratingCounts };
  };

  const { averageRating, ratingCounts } = analyzeFeedbacks();

  const analyzeFeedbacksByJewellery = () => {
    const jewelleryStats = feedbacks.reduce((acc, feedback) => {
      const { jewelleryId, rating } = feedback;
      if (!acc[jewelleryId]) {
        acc[jewelleryId] = { totalRating: 0, count: 0 };
      }
      acc[jewelleryId].totalRating += rating;
      acc[jewelleryId].count += 1;
      return acc;
    }, {});

    const jewelleryAverages = Object.entries(jewelleryStats).map(([jewelleryId, { totalRating, count }]) => ({
      jewelleryId,
      averageRating: (totalRating / count).toFixed(2),
      feedbackCount: count,
    }));

    return jewelleryAverages;
  };

  const jewelleryAverages = analyzeFeedbacksByJewellery();

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-feedback/${id}`);
  };

  const deleteFeedback = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setFeedbacks(prev => prev.filter(feedback => feedback._id !== id));
      }
    } catch (error) {
      console.error("Error deleting feedback:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Customer ID', 'Jewellery ID', 'Rating', 'Comment']],
      body: feedbacks.map(feedback => [feedback.feedbackId, feedback.customerId, feedback.jewelleryId, feedback.rating, feedback.comment]),
      startY: 20,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('feedback-details.pdf');
  };

  const handleStatsPDF = async () => {
    const doc = new jsPDF();
    doc.text("Feedback Analysis Report", 10, 10);
    doc.text(`Average Rating: ${averageRating}`, 10, 20);

    // Get chart canvas and convert it to image
    if (chartRef) {
      const canvas = await html2canvas(chartRef);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 30, 190, 100); // Add image to PDF
    }

    doc.autoTable({
      head: [['Jewellery ID', 'Average Rating', 'Feedback Count']],
      body: jewelleryAverages.map(jewellery => [jewellery.jewelleryId, jewellery.averageRating, jewellery.feedbackCount]),
      startY: 140,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('feedback-stats.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchFeedbacks().then(data => {
        setFeedbacks(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching feedbacks:", error);
      });
      return;
    }

    const filteredFeedbacks = feedbacks.filter(feedback =>
      Object.values(feedback).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFeedbacks(filteredFeedbacks);
    setNoResults(filteredFeedbacks.length === 0);
  };

  const handleAddFeedback = () => {
    setShowAddFeedbackForm(true);
  };

  const handleBack = () => {
    setShowAddFeedbackForm(false);
  };

  const chartData = {
    labels: Object.keys(ratingCounts),
    datasets: [
      {
        label: 'Number of Feedbacks',
        data: Object.values(ratingCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      {showAddFeedbackForm ? (
        <Box>
          <AddFeedback onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '200px',
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              Search
            </Button>
            <Button variant="contained" color="primary" onClick={handlePDF} sx={{ borderRadius: 2 }}>
              Export PDF <Print />
            </Button>
            <Button variant="contained" color="primary" onClick={handleStatsPDF} sx={{ borderRadius: 2 }}>
              Export Stats PDF <Print />
            </Button>
            <Button
              variant="outlined"
              onClick={() => setViewMode(prev => (prev === 'table' ? 'graph' : 'table'))}
              sx={{ borderRadius: 2 }}
            >
              {viewMode === 'table' ? 'Show Stats' : 'Show Table'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddFeedback}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Feedback
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <Typography align="center" variant="h6">Feedback Analysis</Typography>
            <Typography align="center" variant="body1">Average Rating: {averageRating}</Typography>

            {viewMode === 'graph' ? (
              <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 1 }}>
                <Box sx={{ width: '100%', height: 400, marginRight: 2 }} ref={setChartRef}>
                  <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Feedback Ratings Breakdown' },
                    },
                  }} />
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Jewellery ID</TableCell>
                        <TableCell>Average Rating</TableCell>
                        <TableCell>Feedback Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jewelleryAverages.length > 0 ? (
                        jewelleryAverages.map((jewellery) => (
                          <TableRow key={jewellery.jewelleryId}>
                            <TableCell>{jewellery.jewelleryId}</TableCell>
                            <TableCell>{jewellery.averageRating}</TableCell>
                            <TableCell>{jewellery.feedbackCount}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">No jewellery feedback statistics available.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Customer ID</TableCell>
                      <TableCell>Jewellery ID</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Comment</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {noResults ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">No feedback found.</TableCell>
                      </TableRow>
                    ) : (
                      feedbacks.map((feedback) => (
                        <TableRow key={feedback._id}>
                          <TableCell>{feedback.feedbackId}</TableCell>
                          <TableCell>{feedback.customerId}</TableCell>
                          <TableCell>{feedback.jewelleryId}</TableCell>
                          <TableCell>{feedback.rating}</TableCell>
                          <TableCell>{feedback.comment}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEdit(feedback._id)} sx={{ color: 'primary.main' }}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => deleteFeedback(feedback._id)} sx={{ color: 'error.main' }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default FeedbackDetails;
