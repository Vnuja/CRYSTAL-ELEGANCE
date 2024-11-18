
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faGem, faBoxOpen, faClipboardList, faComments, faShoppingCart, faSignOutAlt, faHeadset, faRing, faTruck } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

// URL for the background image
const sidebarBackground = 'https://wallpapers.com/images/hd/blank-white-vertical-grains-mcf32g28ary3jdej.jpg'; // Replace with your image URL

const menuItems = [
  { text: 'Dashboard', icon: <FontAwesomeIcon icon={faTachometerAlt} />, path: '/admindashboard/dashboard' },
  { text: 'Customer Management', icon: <FontAwesomeIcon icon={faUsers} />, path: '/admindashboard/user-management' },
  { text: 'Jewellery Management', icon: <FontAwesomeIcon icon={faRing} />, path: '/admindashboard/jewellery-management' },
  { text: 'Gem Management', icon: <FontAwesomeIcon icon={faGem} />, path: '/admindashboard/gem-management' },
  { text: 'Inventory Management', icon: <FontAwesomeIcon icon={faBoxOpen} />, path: '/admindashboard/inventory-management' },
  { text: 'Employee Management', icon: <FontAwesomeIcon icon={faUsers} />, path: '/admindashboard/employee-management' },
  { text: 'Supplier Management', icon: <FontAwesomeIcon icon={faTruck} />, path: '/admindashboard/quantity-description' },
  { text: 'Appointment Management', icon: <FontAwesomeIcon icon={faClipboardList} />, path: '/admindashboard/appointment-management' },
  { text: 'Order Management', icon: <FontAwesomeIcon icon={faShoppingCart} />, path: '/admindashboard/order-management' },
  { text: 'Feedback Management', icon: <FontAwesomeIcon icon={faComments} />, path: '/admindashboard/feedback-management' },
  
];

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState('');


  const [showSupplierListButton, setShowSupplierListButton] = useState(false);


  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
      setShowSupplierListButton(currentItem.text === 'Supplier Management');
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSupplierListButtonClick = () => {
    navigate('/admindashboard/supplier-list-details'); // Navigate to the Supplier List page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: `url(${sidebarBackground})`, // Use the URL for the image
            backgroundSize: 'cover', // Adjust as needed
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ marginBottom: 0 }} /> {/* Remove margin */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => handleMenuClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black' }} /> {/* Change text color to black */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // No padding
          backgroundColor: '#f4f6f8',
          minHeight: '100vh',
          overflow: 'hidden', // Prevent scrolling
        }}
      >
        <Toolbar sx={{ margin: 0, padding: 0 }} /> {/* Set margin and padding to 0 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1976d2', padding: '10px 20px', color: 'white', height: '60px' }}>
          <Typography variant="h5">{currentTab}</Typography>
          <div>
            {showSupplierListButton && (
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={handleSupplierListButtonClick}>
                View Supplier List
              </Button>
            )}
            <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft: 2, color: 'white', borderColor: 'white' }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Button>
          </div>
        </Box>
        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
