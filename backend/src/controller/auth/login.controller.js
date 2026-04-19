const bcrypt = require("bcrypt");
const player = require("../../models/player");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const user = await player.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Email not Registered.",
                success: false
            });
        }
        
        const match = await bcrypt.compare(req.body.password, user.password);
        
        if(!match){
            return res.status(401).json({
                message:"Invalid Credentials. Please check and Retry!",
                success: false
            })
        }

        const accessToken = jwt.sign(
            {email : user.email, name: user.name},
            process.env.ACCESS_SECRET,
            {expiresIn: '15m'}
        )

        const refreshToken = jwt.sign(
            {email : user.email, name: user.name},
            process.env.REFRESH_SECRET,
            {expiresIn: '7d'}
        )
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            message: "Logged IN",
            accessToken,
            refreshToken,
            success : true
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
    }
};

module.exports = login;