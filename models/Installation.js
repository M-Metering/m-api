const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
    assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    location: { type: String, required: true },
    photo: { type: String, required: true }, // Base64 string
    installation_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Installation', installationSchema);