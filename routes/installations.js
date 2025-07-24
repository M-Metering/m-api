const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const authenticate = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', authenticate(['super_admin', 'admin', 'installer']), upload.single('photo'), installationController.createInstallation);
router.get('/', authenticate(['super_admin', 'admin', 'installer']), installationController.getInstallations);

module.exports = router;