const Installation = require('../models/Installation');
const Assignment = require('../models/Assignment');
const Meter = require('../models/Meter');

exports.createInstallation = async (req, res) => {
    const { assignment_id, location } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Photo required' });

    try {
        const assignment = await Assignment.findById(assignment_id);
        if (!assignment) return res.status(400).json({ message: 'Invalid assignment' });
        if (req.user.role === 'installer' && assignment.installer_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not assigned to you' });
        }
        const meter = await Meter.findById(assignment.meter_id);
        if (meter.status !== 'available') {
            return res.status(400).json({ message: 'Meter already installed' });
        }

        const photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const installation = new Installation({ assignment_id, location, photo });
        await installation.save();
        meter.status = 'installed';
        await meter.save();

        res.status(201).json({ message: 'Installation recorded', id: installation._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getInstallations = async (req, res) => {
    try {
        const query = req.user.role === 'installer' ? { 'assignment_id.installer_id': req.user.id } : {};
        const installations = await Installation.find(query).populate({
            path: 'assignment_id',
            populate: [
                { path: 'meter_id', select: 'serial_number' },
                { path: 'customer_id', select: 'name address' },
                { path: 'installer_id', select: 'username' }
            ]
        });
        const response = installations.map(install => ({
            id: install._id,
            meter: install.assignment_id.meter_id,
            customer: install.assignment_id.customer_id,
            installer: install.assignment_id.installer_id,
            location: install.location,
            installation_date: install.installation_date,
            photo: req.user.role !== 'installer' ? install.photo : undefined
        }));
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};