const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    if (!['admin', 'installer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'User created', id: user._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username role');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSuperAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ username, password, role: 'super_admin' });
        await user.save();
        res.status(201).json({ message: 'Super admin created', id: user._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
