const player = require("../../models/player");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

/**
 * @desc Sending the link for reseting the password of the user through tokens
 * @access public
 */
const resetLink = async (req, res) => {
    try {
        const user = await player.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(409).json({
                message: "Email address not registered.",
                success: false,
            });
        }

        if (user.expiresAt != null) {
            return res.status(409).json({
                message: "Please verify the account first.",
                success: false,
            });
        }
        const accessToken = await jwt.sign(
            {
                email: req.body.email,
                name: user.name,
            },
            process.env.ACCESS_SECRET,
            {
                expiresIn: "15m",
            },
        );
        const url = `${process.env.CLIENT_URL}/reset/${accessToken}`;
        
        await sendEmail(req.body.email, user.name, 4, url);
        
        return res.status(200).json({
            message:
                "Reset link is sent to registered mail. Please check to update password.",
            success: true,
            accessToken,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong.",
            success: false,
            err,
        });
    }
};

module.exports = resetLink;
