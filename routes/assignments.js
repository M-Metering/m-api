const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate(['super_admin', 'admin']), assignmentController.createAssignment);
router.get('/', authenticate(['super_admin', 'admin', 'installer']), assignmentController.getAssignments);

module.exports = router;