const { Router } = require('express');
const middleware = require('../middleware/auth');
const randomRoom = require('../controller/room/randomRoom.controller');
const router = Router();

/**
 * @desc Generating the Random code for the Room
 * @route GET /api/room/create
 * @access protected
 */
router.get('/create', randomRoom);

module.exports = router;