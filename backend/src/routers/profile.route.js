const { Router } = require('express');
const middleware = require('../middleware/auth');
const getProfile = require('../controller/user/getProfile.controller')
const router = Router();

/**
 * @desc Accessing the user details from the access token provided
 * @route GET /api/profile/me
 * @access protected
 */
router.get('/me', getProfile);

module.exports = router;