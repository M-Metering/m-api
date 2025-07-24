const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate(['super_admin', 'admin']), meterController.createMeter);
router.get('/', authenticate(['super_admin', 'admin', 'installer']), meterController.getMeters);

module.exports = router;