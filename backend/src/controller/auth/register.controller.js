const bcrypt = require('bcrypt');
const player = require('../../models/player');
const jwt = require('jsonwebtoken');


/**
 * @route POST /api/auth/register
 * @desc Register User by Email Password and User-Name
 * @access public 
 */
const register = async(req, res) => {
    const user = await player.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({
            message: "Email Already Registered. Kindly Login!",
            success: false
        })
    }
    
    const newUser = await player.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
    })

    if (newUser) {
        return res.status(200).json({
            message: "User Registered Successfully",
            user: newUser,
            success: true
        })
    }

    return res.status(500).json({
        message: "Something went wrong",
        success: false
    })
}

module.exports = register