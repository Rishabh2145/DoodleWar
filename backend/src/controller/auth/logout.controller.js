/**
 * @desc Logging out the user and clearing the tokens from the cookies
 * @access public
 */

const logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "Logged out", success: true });
};

module.exports = logout