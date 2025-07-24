const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.registerSuperAdmin = async (req, res) => {
    if (process.env.ALLOW_SUPER_ADMIN_REGISTRATION !== 'true') {
        return res.status(403).json({ message: 'Super admin registration is disabled' });
    }

    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, password, role: 'super_admin' });
        await user.save();
        res.status(201).json({ message: 'Super admin created', id: user._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};