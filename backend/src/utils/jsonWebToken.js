const jwt = require("jsonwebtoken");

const refreshToken = async (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "7d" });
    
};
