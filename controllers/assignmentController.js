const Assignment = require('../models/Assignment');
const Meter = require('../models/Meter');
const Customer = require('../models/Customer');
const User = require('../models/User');

exports.createAssignment = async (req, res) => {
    const { meter_id, customer_id, installer_id } = req.body;
    try {
        const meter = await Meter.findById(meter_id);
        if (!meter || meter.status !== 'available') {
            return res.status(400).json({ message: 'Invalid or unavailable meter' });
        }
        const customer = await Customer.findById(customer_id);
        const installer = await User.findById(installer_id);
        if (!customer || !installer || installer.role !== 'installer') {
            return res.status(400).json({ message: 'Invalid customer or installer' });
        }
        const assignment = new Assignment({ meter_id, customer_id, installer_id });
        await assignment.save();
        res.status(201).json({ message: 'Assignment created', id: assignment._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const query = req.user.role === 'installer' ? { installer_id: req.user.id } : {};
        const assignments = await Assignment.find(query).populate('meter_id customer_id installer_id');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};