const player = require("../../models/player");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

/**
 * @desc Controller for verification of the user account
 * @access public
 */
const verifyUser = async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await player.findOne({email: decoded.email});
        if(user.refreshToken != token || user.expiresAt == null){
            return res.status(409).json({
                message: "Account already verified or Link not valid.",
                success: false
            })
        }
        user.isVerified = true;
        user.expiresAt = null;
        await user.save();
        await sendEmail(user.email, user.name, 3, `${process.env.CLIENT_URL}/battleground`);
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
