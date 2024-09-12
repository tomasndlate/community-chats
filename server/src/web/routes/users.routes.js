const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const profile = require('../controllers/rest/profileController');
const router = express.Router();

router.get('/', authMiddleware, profile.profile);

module.exports = router;
