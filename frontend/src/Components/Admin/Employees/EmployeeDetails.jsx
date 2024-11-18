import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddEmployee from './AddEmployee'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/employees";

const fetchEmployees = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees().then(data => {
      setEmployees(data);
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-employee/${id}`);
  };

  const deleteEmployee = async (employee) => {
    if (window.confirm(`Are you sure you want to delete employee ${employee.EMPID} (${employee.name})?`)) {
      try {
        const response = await axios.delete(`${URL}/${employee._id}`);
        if (response.status === 200) {
          setEmployees(prev => prev.filter(emp => emp._id !== employee._id));
          alert(`Employee ${employee.EMPID} (${employee.name}) deleted successfully.`);
        }
      } catch (error) {
        console.error("Error deleting employee:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address', 'NIC', 'Salary']],
      body: employees.map(employee => [employee.EMPID, employee.name, employee.email, employee.position, employee.phone, employee.address, employee.nic, employee.salary]),
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

    doc.save('employee-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchEmployees().then(data => {
        setEmployees(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching employees:", error);
      });
      return;
    }

    const filteredEmployees = employees.filter(employee =>
      Object.values(employee).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEmployees(filteredEmployees);
    setNoResults(filteredEmployees.length === 0);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeForm(true);
  };

  const handleBack = () => {
    setShowAddEmployeeForm(false);
  };

  const handleAddSalary = (id) => {
    navigate(`/admindashboard/add-salary/${id}`);
  };

  const handleSummaryReport = () => {
    navigate('/admindashboard/summary-report');
  };

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://rawayat.com.pk/cdn/shop/files/WhatsAppImage2023-11-17at3.55.06PM_700x.jpg?v=1700218682')`,
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 3,
      }}
    >
      {showAddEmployeeForm ? (
        <Box>
          <AddEmployee onBack={handleBack} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1600px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center', marginTop: 4 }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '300px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEmployee}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Employee
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>NIC</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">No employee found.</TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell>{employee.EMPID}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.address}</TableCell>
                        <TableCell>{employee.NIC}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(employee._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteEmployee(employee)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
                          <Button
                            variant="contained"
                            color="info"
                            onClick={() => handleAddSalary(employee._id)}
                            sx={{ marginLeft: 1 }}
                          >
                            Add Salary
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handlePDF}>
              Generate PDF Report
            </Button>
            <Button variant="contained" color="primary" onClick={handleSummaryReport}>
              Summary Report
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default EmployeeDetails;
