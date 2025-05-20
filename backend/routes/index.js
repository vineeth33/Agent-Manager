const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../controllers/authController');
const agent = require('../controllers/agentController');
const uploadCtrl = require('../controllers/uploadController');

// Configure multer for upload if not already defined in controller
const upload = multer({ dest: 'uploads/' });

// Authentication routes
router.post('/login', auth.login);

// Agent routes
router.post('/agents', agent.addAgent);
router.get('/agents', agent.getAgents);

// Upload routes
router.post('/upload', uploadCtrl.uploadMiddleware || upload.single('file'), uploadCtrl.uploadCSV);

// Lists route - this should match what the frontend is requesting
router.get('/lists', uploadCtrl.getDistributedLists);

module.exports = router;