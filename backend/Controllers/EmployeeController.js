const Employee = require('../Model/EmployeeModel');

// Generate employee ID with leading zeros
const generateEmployeeId = async () => {
    const lastEmployee = await Employee.findOne().sort({ EMPID: -1 }).limit(1);
    const lastId = lastEmployee ? parseInt(lastEmployee.EMPID.replace('E', ''), 10) : 0;
    const newId = `E${(lastId + 1).toString().padStart(3, '0')}`;
    return newId;
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, position, phone, address, salary, NIC } = req.body; // Added NIC

        const EMPID = await generateEmployeeId(); // Generate new employee ID
        const newEmployee = new Employee({ EMPID, name, email, position, phone, address, salary, NIC }); // Included NIC
        await newEmployee.save();

        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employees', error: error.message });
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employee', error: error.message });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, position, phone, address, salary, NIC } = req.body; // Added NIC
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, position, phone, address, salary, NIC }, // Included NIC
            { new: true }
        );

        if (updatedEmployee) {
            res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (deletedEmployee) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};

// Calculate employee salary
exports.calculateSalary = async (req, res) => {
    try {
        const { salary, otRate, otHours, leaveDays, dailyRate } = req.body;

        // Calculate total salary
        const totalSalary = salary + (otRate * otHours) - (leaveDays * dailyRate);

        res.status(200).json({ totalSalary });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating salary', error: error.message });
    }
};
