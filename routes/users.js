const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate(['super_admin']), userController.createUser);
router.get('/', authenticate(['super_admin']), userController.getUsers);

module.exports = router;