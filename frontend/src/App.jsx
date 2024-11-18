/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home Components
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Jewellery from './Components/Home/Jewellery';
import Gems from './Components/Home/Gems';
import AboutUs from './Components/Home/AboutUs';
import Contact from './Components/Home/ContactUs';
import Register from './Components/Login/Register';
import UserProfile from './Components/pages/UserProfile';
import Appointments from './Components/pages/Appointment';
import PrivacyPolicy from './Components/pages/PrivacyPolicy';
import TermsOfUse from './Components/pages/TermsOfUse';

// Admin Components
import AdminDashboard from './Components/Admin/AdminDashboard';
import Dashboard  from './Components/Admin/Dashboard';
import UserDetails from './Components/Admin/Users/UserDetails';
import AddUser from './Components/Admin/Users/AddUser';
import UpdateUser from './Components/Admin/Users/UpdateUser';

import JewelleryDetails from './Components/Admin/Jewellery/JewelleryDetails';
import AddJewellery from './Components/Admin/Jewellery/AddJewellery';
import UpdateJewellery from './Components/Admin/Jewellery/UpdateJewellery';
import JewelleryManagement from './Components/Admin/Jewellery/JewelleryDashboard';

import GemDetails from './Components/Admin/Gem/GemDetails';  
import AddGem from './Components/Admin/Gem/AddGem';        
import UpdateGem from './Components/Admin/Gem/UpdateGem'; 
import Gem from './Components/Admin/Gem/Gem';
import GemProfile from './Components/pages/GemProfile';

import InventoryDetails from './Components/Admin/Inventory/InventoryDetails';
import AddInventory from './Components/Admin/Inventory/AddInventory';
import UpdateInventory from './Components/Admin/Inventory/UpdateInventory';
import Inventory from './Components/Admin/Inventory/Inventory';
import PlaceOrder from './Components/Admin/Inventory/PlaceOrder';
import AddQuantityDescription from './Components/Admin/Inventory/AddQuantityDescription';

import EmployeeDetails from './Components/Admin/Employees/EmployeeDetails';
import AddEmployee from './Components/Admin/Employees/AddEmployee';
import UpdateEmployee from './Components/Admin/Employees/UpdateEmployee';
import Employee from './Components/Admin/Employees/Employee';
import AddSalary from './Components/Admin/Employees/AddSalary';
import EmployeeDashboard from './Components/Admin/Employees/EmployeeDashboard';
import EmployeeProfile from './Components/Admin/Employees/EmployeeProfile';

import SupplierDetails from './Components/Admin/Suppliers/SupplierOrderDetails';
import AddSupplierOrder from './Components/Admin/Suppliers/AddSupplierOrder';
import UpdateSupplier from './Components/Admin/Suppliers/UpdateSupplierOrder';
import AddSupplierList from './Components/Admin/Suppliers/AddSupplierList';
import SupplierDashboard from './Components/Admin/Suppliers/SupplierListDetails';
import SupplierList from './Components/Admin/Suppliers/SupplierList';
import UpdateSupplierList from './Components/Admin/Suppliers/UpdateSupplierList';
import QuantityDescription from './Components/Admin/Suppliers/QuantityDescriptionList';
import EditQuantityDescription from './Components/Admin/Suppliers/EditQuantityDescription';


import FeedbackDetails from './Components/Admin/Feedback/FeedbackDetails';
import AddFeedback from './Components/Admin/Feedback/AddFeedback';
import UpdateFeedback from './Components/Admin/Feedback/UpdateFeedback';
import Feedback from './Components/Admin/Feedback/Feedback';

import SupportDetails from './Components/Admin/Support/SupportDetails';

import AppointmentDetails from './Components/Admin/Appointment/AppointmentDetails';
import AddAppointment from './Components/Admin/Appointment/AddAppointment';
import UpdateAppointment from './Components/Admin/Appointment/UpdateAppointment';

import OrderDetails from './Components/Admin/Order/OrderDetails';

import { AuthProvider } from './Components/Auth/AuthContext';  // Import AuthProvider
import JewelleryProfile from './Components/pages/JewelleryProfile';
import MakePayment from './Components/pages/MakePayment';

// Import new Summary Report and EmployeeDetails components
import SummaryReport from './Components/Admin/Employees/SummaryReport'; // Adjust path as necessary

function App() {
  return (
    <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Home Page as the default route */}
          <Route path="/" element={<Home />} />


          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path='/jewellery' element={<Jewellery />} />
          <Route path='/gems' element={<Gems />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/userprofile' element={<UserProfile />} />


          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jewellery" element={<Jewellery />} />
          <Route path="/gems" element={<Gems />} />

          <Route path="/jewellery/:id" element={<JewelleryProfile />} />
          <Route path="/makepayment/:id" element={<MakePayment />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />


          

          {/* Admin Dashboard Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
            {/* User Management */}

            <Route path="user-management" element={<UserDetails />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="update-user/:id" element={<UpdateUser />} />

            {/* Jewellery Management */}
            <Route path="jewellery-management" element={<JewelleryManagement />} />
            <Route path="add-jewellery" element={<AddJewellery />} />
            <Route path="update-jewellery/:JID" element={<UpdateJewellery />} />
            <Route path="jewellery-details" element={<JewelleryDetails />} />
            

            {/* Gem Management */}
            <Route path="gem-management" element={<GemDetails />} />  
            <Route path="add-gem" element={<AddGem />} />            
            <Route path="update-gem/:GID" element={<UpdateGem />} /> 
            <Route path="gem/:GID" element={<Gem />} />
            <Route path="gem-profile/:GID" element={<GemProfile />} />

            {/* Inventory Management */}
            <Route path="inventory-management" element={<InventoryDetails />} />
            <Route path="inventory/:id" element={<Inventory />} />
            <Route path="add-inventory" element={<AddInventory />} />
            <Route path="update-inventory/:InvID" element={<UpdateInventory />} />
            <Route path="place-order/:InvID" element={<PlaceOrder />} />
            <Route path="add-quantity-description" element={<AddQuantityDescription />} />

            {/* Employee Management */}
            <Route path="employee-management" element={<EmployeeDashboard />} />
            <Route path="employee/:id" element={<Employee />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="update-employee/:id" element={<UpdateEmployee />} />
            <Route path="add-salary/:id" element={<AddSalary />} />
            <Route path="employee-details" element={<EmployeeDetails />} />
            <Route path="summary-report" element={<SummaryReport />} />
            <Route path="employee-profile/:id" element={<EmployeeProfile />} />



            {/* Supplier Management */}

            <Route path="supplier-management" element={<SupplierDetails />} />
            <Route path="add-supplier/:supId" element={<AddSupplierOrder />} />
            <Route path="update-supplier/:id" element={<UpdateSupplier />} />
            <Route path="add-supplier-list" element={<AddSupplierList />} />
            <Route path="supplier-list-details" element={<SupplierDashboard />} />
            <Route path="supplier-list" element={<SupplierList />} />     
            <Route path="update-supplier-list/:supId" element={<UpdateSupplierList />} />
            <Route path="quantity-description" element={<QuantityDescription />} />
            <Route path="edit-quantity-description/:id" element={<EditQuantityDescription />} />


                    
            {/* Feedback Management */}
            <Route path="feedback-management" element={<FeedbackDetails />} />
            <Route path="feedback/:id" element={<Feedback />} />
            <Route path="add-feedback" element={<AddFeedback />} />
            <Route path="update-feedback/:id" element={<UpdateFeedback />} />

            <Route path="support-management" element={<SupportDetails />} />
            <Route path="order-management" element={<OrderDetails />} />
            <Route path="appointment-management" element={<AppointmentDetails />} />
            <Route path="add-appointment" element={<AddAppointment />} />
            <Route path="update-appointment/:id" element={<UpdateAppointment />} />
          </Route>

          {/* Summary Report Route */}
          
          
          {/* EmployeeDetails Page */}
          <Route path="/employee-details" element={<EmployeeDetails />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
