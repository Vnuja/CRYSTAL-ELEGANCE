const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/EmployeeController');

// Routes for employee operations
router.post('/create', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// Route for salary calculation
router.post('/calculate-salary', employeeController.calculateSalary);

module.exports = router;
