const player = require("../../models/player");
const jwt = require("jsonwebtoken");

/**
 * @desc Controller for verification of the user account
 * @access public
 */
const verifyUser = async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await player.findOne({email: decoded.email});
        user.isVerified = true;
        user.expiresAt = null;
        await user.save();
    } catch (err) {
        return res.status(500).json({
            message:
                "Your verification link is invalid or expired. Please try creating your account again.",
            error: err,
        });
    }
    return res.status(200).json({
        message: "Account Verified Successfully!",
        success: true,
    });
};

module.exports = verifyUser;
