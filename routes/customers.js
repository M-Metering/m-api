const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate(['super_admin', 'admin']), customerController.createCustomer);
router.get('/', authenticate(['super_admin', 'admin', 'installer']), customerController.getCustomers);

module.exports = router;