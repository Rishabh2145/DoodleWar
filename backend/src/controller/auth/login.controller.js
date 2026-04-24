const bcrypt = require("bcrypt");
const player = require("../../models/player");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

const login = async (req, res) => {
    try {
        const user = await player.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Email not Registered.",
                success: false,
            });
        }

        if (!user.isVerified) {
            const url = `${process.env.CLIENT_URL}/login/verify/?token=${user.refreshToken}`;
            await sendEmail(req.body.email, req.body.name, 2, url);
            return res.status(400).json({
                message: "Kindly Verify your account from the email link.",
                success: false,
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid Credentials. Please check and Retry!",
                success: false,
            });
        }

        const accessToken = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.REFRESH_SECRET,
            { expiresIn: "7d" },
        );
        user.refreshToken = refreshToken;

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        await user.save();
        return res.status(200).json({
            message: "Logged IN",
            accessToken,
            refreshToken,
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
    }
};

module.exports = login;
