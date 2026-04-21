const {Router} = require('express');
const register = require('../controller/auth/register.controller');
const login = require('../controller/auth/login.controller');
const accessToken = require('../controller/auth/token.controller');
const verifyUser = require('../controller/auth/verify.controller');
const logout = require('../controller/auth/logout.controller');

const router = Router();
/**
 * @desc Register the User using Email Address, Password, and name of the user
 * @route POST /api/auth/register
 * @access public
 */
router.post('/register', register);

/**
 * @desc Login the user using the credential like Email Address and Password
 * @route POST /api/auth/login
 * @access public
 */
router.post('/login', login);

/**
 * @desc Refreshing the session using the refresh token to generate new Access Token
 * @route POST /api/auth/refresh
 * @access public
 */
router.post('/refresh', accessToken);

/**
 * @desc Verify account by sending verification link in the mail through BREVO API
 * @route POST /api/auth/verify/token
 * @access public
 */
router.post('/verify/:token', verifyUser);

/**
 * @desc Logout user and remove all the cookies that have access tokens and refresh tokens
 * @route POST /api/auth/logout
 * @access public
 */
router.post('/logout', logout);

module.exports = router