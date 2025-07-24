const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
    serial_number: { type: String, required: true, unique: true },
    model: { type: String },
    status: { type: String, required: true, enum: ['available', 'installed'], default: 'available' }
});

module.exports = mongoose.model('Meter', meterSchema);