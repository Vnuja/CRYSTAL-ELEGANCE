const Appointment = require('../Model/AppointmentModel');

// Generate Appointment ID with leading zeros
const generateAppointmentId = async () => {
    const lastAppointment = await Appointment.findOne().sort({ appointmentID: -1 }).limit(1);
    
    // Handle case when there are no appointments in the database
    if (!lastAppointment || !lastAppointment.appointmentID) {
        return 'A001';  // If no appointment exists, start with A001
    }
    
    // Extract the numeric part and increment it
    const lastId = parseInt(lastAppointment.appointmentID.replace('A', ''), 10);
    const newId = `A${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    
    return newId;
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes } = req.body;
        
        const appointmentID = await generateAppointmentId(); // Generate new appointment ID
        const newAppointment = new Appointment({ appointmentID, customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes });
        await newAppointment.save();
        
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error Details:', error); // Log the full error object for debugging
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appointments', error: error.message });
    }
};

// Get a single appointment by ID
// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appointment', error: error.message });
    }
};


// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
        const { customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes, status } = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { customerName, contactNumber, email, appointmentDate, appointmentTime, serviceType, notes, status },
            { new: true } // Return the updated appointment
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment', error: error.message });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
};
