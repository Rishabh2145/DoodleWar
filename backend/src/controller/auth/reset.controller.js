const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const player = require('../../models/player');

/**
 * @desc Reseting the password by verifying the user from the access token
 * @access private
 */
const resetPass = async (req, res) => {
    const token = req.body.token;
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        
        const user = await player.findOne({email: decoded.email});
        
        user.password = await bcrypt.hash(req.body.password, 12);
        await user.save();
        return res.status(200).json({
            message: "Password Updated Successfully.",
            success: false
        })   
    } catch(err){
        return res.status(400).json({
            message: "Link expired. Please try again later.",
            success: false
        })
    }
}

module.exports = resetPass