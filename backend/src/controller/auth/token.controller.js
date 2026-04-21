const jwt = require("jsonwebtoken");
const player = require("../../models/player");

/**
 * @desc Refresh JWT Token from Refresh Token to Access Token
 * @access private
 */
const accessToken = async (req, res) => {
    try {
        const data = req.cookies.refreshToken;
        const decoded = await jwt.verify(
            data,
            process.env.REFRESH_SECRET,
        );

        const user = await player.findOne({email : decoded.email});

        if (!user) {
            return res.status(403).json({
                message: "Invalid Token",
                success: false,
            });
        }

        const accessToken = await jwt.sign(
            {
                email: user.email,
                name: user.name,
            },
            process.env.ACCESS_SECRET,
            {
                expiresIn: "15m",
            },
        );

        return res.status(200).json({
            accessToken
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong in Refresh Token!",
            success: false,
            error: err
        });
    }
};

module.exports = accessToken