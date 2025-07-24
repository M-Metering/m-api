const Meter = require('../models/Meter');

exports.createMeter = async (req, res) => {
    const { serial_number, model } = req.body;
    try {
        const meter = new Meter({ serial_number, model });
        await meter.save();
        res.status(201).json({ message: 'Meter created', id: meter._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getMeters = async (req, res) => {
    try {
        const meters = await Meter.find();
        res.json(meters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};