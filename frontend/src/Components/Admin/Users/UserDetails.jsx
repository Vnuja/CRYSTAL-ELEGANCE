import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddUser from './AddUser';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const URL = 'http://localhost:4000/users';

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

function UserDetails() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [userTypeStats, setUserTypeStats] = useState([]);
  const [userGenderStats, setUserGenderStats] = useState([]);
  const [ageStats, setAgeStats] = useState([]);
  const [analysisView, setAnalysisView] = useState('table'); // toggle for table/chart view
  const [chartType, setChartType] = useState('pie'); // toggle for pie/bar chart view

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setAllUsers(data);
        setUsers(data);
        calculateUserTypeStats(data);
        calculateUserGenderStats(data);
        calculateAgeStats(data); // Calculate age stats
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admindashboard/update-user/${userId}`);
  };
  
  const handlefeedback = () =>{
    navigate(`/admindashboard/feedback-management`);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${URL}/${userId}`);
      if (response.status === 200) {
        setAllUsers((prev) => prev.filter((user) => user.userId !== userId));
        setUsers((prev) => prev.filter((user) => user.userId !== userId));
        calculateUserTypeStats(allUsers);
        calculateUserGenderStats(allUsers);
        calculateAgeStats(allUsers); // Recalculate age stats
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error(
        'Error deleting user:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text('User Details Report', 10, 10);

    doc.autoTable({
      head: [
        [
          'User ID',
          'Username',
          'Name',
          'Email',
          'Phone',
          'Type',
          'Gender',
          'Birthday',
        ],
      ],
      body: users.map((user) => [
        user.userId,
        user.userName,
        user.name,
        user.email,
        user.phone,
        user.type,
        user.gender,
        user.birthday,
      ]),
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

    doc.save('user-details.pdf');
  };

  const calculateUserTypeStats = (data) => {
    const typeCounts = data.reduce((acc, user) => {
      acc[user.type] = (acc[user.type] || 0) + 1;
      return acc;
    }, {});
    const formattedData = Object.entries(typeCounts).map(
      ([type, count]) => ({ name: type, value: count })
    );
    setUserTypeStats(formattedData);
  };

  const calculateUserGenderStats = (data) => {
    const genderCounts = data.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});
    const formattedData = Object.entries(genderCounts).map(
      ([gender, count]) => ({ name: gender, value: count })
    );
    setUserGenderStats(formattedData);
  };

  const calculateAgeStats = (data) => {
    const currentYear = new Date().getFullYear();
    const ageCounts = data.reduce((acc, user) => {
      const birthYear = new Date(user.birthday).getFullYear();
      const age = currentYear - birthYear;
      const ageGroup =
        age < 20
          ? 'Under 20'
          : age < 30
            ? '20-29'
            : age < 40
              ? '30-39'
              : age < 50
                ? '40-49'
                : '50+';
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});
    const formattedData = Object.entries(ageCounts).map(
      ([ageGroup, count]) => ({ name: ageGroup, value: count })
    );
    setAgeStats(formattedData);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setUsers(allUsers);
      setNoResults(false);
      return;
    }

    const filteredUsers = allUsers.filter((user) =>
      Object.values(user).some((field) =>
        field &&
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleBack = () => {
    setShowAddUserForm(false);
  };

  const toggleAnalysisView = () => {
    setAnalysisView((prev) => (prev === 'table' ? 'chart' : 'table'));
  };

  const toggleChartType = () => {
    setChartType((prev) => (prev === 'pie' ? 'bar' : 'pie'));
  };

  const handlePDFStats = () => {
    const doc = new jsPDF();
    doc.text('User Statistics Report', 10, 10);

    // User type statistics
    doc.autoTable({
      head: [['User Type', 'Count']],
      body: userTypeStats.map(stat => [stat.name, stat.value]),
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

    // Gender statistics
    const genderStatsYPosition = doc.autoTable.previous.finalY + 10;
    doc.text('Gender Statistics', 10, genderStatsYPosition);
    
    doc.autoTable({
      head: [['Gender', 'Count']],
      body: userGenderStats.map(stat => [stat.name, stat.value]),
      startY: genderStatsYPosition + 10,
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

    // Age statistics
    const ageStatsYPosition = doc.autoTable.previous.finalY + 10;
    doc.text('Age Statistics', 10, ageStatsYPosition);
    
    doc.autoTable({
      head: [['Age Group', 'Count']],
      body: ageStats.map(stat => [stat.name, stat.value]),
      startY: ageStatsYPosition + 10,
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

    doc.save('user-statistics.pdf');
  };

  return (
    <Box>
      {showAddUserForm ? (
        <Box>
          <AddUser onBack={handleBack} />
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
            <br></br>
            <Button variant="outlined" onClick={toggleAnalysisView}>
               {analysisView === 'table' ? 'Chart' : 'Table'} View
            </Button>
            <Button variant="contained" onClick={handlePDF} sx={{ marginLeft: 2 }}>
              Export User Data
            </Button>
            <Button variant="contained" color="warning" onClick={handlePDFStats} sx={{ marginLeft: 2 }}>
              Export User Stats
            </Button>
            <Button variant="contained" color="secondary" onClick={handlefeedback} sx={{ marginLeft: 2}}>
              Feedbacks
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddUser}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add User
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', marginBottom: 2 }}>
              {analysisView === 'table' ? (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Birthday</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {noResults ? (
                        <TableRow>
                          <TableCell colSpan={9} align="center">No users found.</TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.userId}>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.type}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{new Date(user.birthday).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleEdit(user.userId)} sx={{ color: 'primary.main' }}>
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => deleteUser(user.userId)} sx={{ color: 'error.main' }}>
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </>
              ) : (

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom>User Distribution</Typography>
                    {chartType === 'pie' ? (
                      <PieChart width={300} height={300}>
                        <Pie
                          data={userTypeStats}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {userTypeStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    ) : (
                      <BarChart width={300} height={200} data={userTypeStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6">Gender Distribution</Typography>
                    {chartType === 'pie' ? (
                      <PieChart width={300} height={300}>
                        <Pie
                          data={userGenderStats}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#82ca9d"
                          label
                        >
                          {userGenderStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    ) : (
                      <BarChart width={300} height={200} data={userGenderStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6">Age Distribution</Typography>
                    {chartType === 'pie' ? (
                      <PieChart width={300} height={300}>
                        <Pie
                          data={ageStats}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#ff7300"
                          label
                        >
                          {ageStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    ) : (
                      <BarChart width={300} height={200} data={ageStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#ff7300" />
                      </BarChart>
                    )}<Button variant="outlined" onClick={toggleChartType}>
                     {chartType === 'pie' ? 'Bar' : 'Pie'} Chart
                  </Button>
                  </Box>
                </Box>
              )}
            </TableContainer>
          </Box>
          
        </>
      )}
    </Box>
  );
}

export default UserDetails;
