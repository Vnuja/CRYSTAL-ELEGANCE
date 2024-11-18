const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Appointment Schema
const appointmentSchema = new Schema({
    appointmentID: { type: String, required: true, unique: true }, // Custom Appointment ID
    customerName: { type: String, required: true }, // Customer Name
    contactNumber: { type: String, required: true }, // Customer's Contact Number
    email: { type: String, required: true }, // Customer's Email Address
    appointmentDate: { type: Date, required: true }, // Appointment Date
    appointmentTime: { type: String, required: true }, // Appointment Time (can be in 'HH:mm' format)
    serviceType: { type: String, required: true }, // Type of service (e.g., repair, consultation)
    status: { type: String, required: true, default: 'Pending' }, // Status of the appointment
    notes: { type: String } // Additional notes or special requests
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
