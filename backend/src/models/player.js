const mongoose = require("mongoose");

/**
 * Schema of the player in the MongoDB
 * Player Name
 * Email ID
 * Password
 * isOnline
 * currentRoom
 * socketId
 * score
 * refreshToken
 * @access private
 */
const playerSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true },
);

module.exports = mongoose.model("Player", playerSchema);