const {Router} = require('express');
const auth  = require('./auth.route')
const profile  = require('./profile.route');
const middleware = require('../middleware/auth');
const router = Router();

/**
 * @desc Authentication API's for Login and Signup
 * @route /api/auth
 * @access public 
 */
router.use('/auth', auth)

/**
 * @desc User details Section from the JWT Tokens
 * @route /api/profile
 * @access protected
 */
router.use('/profile', middleware, profile)

module.exports = router