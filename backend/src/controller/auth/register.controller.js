const bcrypt = require("bcrypt");
const player = require("../../models/player");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

/**
 * @route POST /api/auth/register
 * @desc Register User by Email Password and User-Name
 * @access public
 */
const register = async (req, res) => {
    const user = await player.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            message: "Email Already Registered. Kindly Login!",
            success: false,
        });
    }
    const refreshToken = jwt.sign(
        { email: req.body.email, name: req.body.name },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" },
    );
    const newUser = await player.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        refreshToken,
    });

    if (newUser) {
        const url = `${process.env.CLIENT_URL}/login/verify/?token=${user.refreshToken}`;
        return res.status(200).json({
            message: "Please Verify your account as Next Step.",
            success: true,
        });
    }

    return res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
};

module.exports = register;
