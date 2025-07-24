const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    meter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    installer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);