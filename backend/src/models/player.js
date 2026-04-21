const mongoose = require("mongoose");

/**
 * Schema of the player in the MongoDB
 * Player Name
 * Email ID
 * Password
 * isVerified
 * isOnline
 * currentRoom
 * socketId
 * score
 * refreshToken
 * auto expiry and creation
 * @access private
 */
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    currentRoom: {
        type: String,
        default: null,
    },
    socketID: {
        type: String,
        default: null,
    },
    score: {
        type: Number,
        default: 0,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        index: { expires: 0 },
    },
});

module.exports = mongoose.model("Player", playerSchema);
