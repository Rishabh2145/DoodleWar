/**
 * @desc Get users details from the access token 
 * @route GET /api/profile/me
 * @access protected
 */
const getProfile = async (req, res) => {
    return res.json({
        user: req.user,
        success: true
    })
}
module.exports = getProfile