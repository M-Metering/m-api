const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    const { name, address, phone, email } = req.body;
    try {
        const customer = new Customer({ name, address, phone, email });
        await customer.save();
        res.status(201).json({ message: 'Customer created', id: customer._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};