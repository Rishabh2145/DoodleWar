const mongoose = require("mongoose");

/**
 * Creating the Schema for Room
 * Random Room Code
 * Host
 * Players or Participants
 * Current Word
 * Round Time
 * Current Round
 * Maximum Round
 * Chatting System
 * @access private
 */
const roomSchema = new mongoose.Schema(
    {
        roomCode: {
            type: String,
            required: true,
            unique: true,
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },

        players: [
            {
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Player",
                },
                username: String,
                score: {
                    type: Number,
                    default: 0,
                },
                isDrawing: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        currentWord: {
            type: String,
            default: null,
        },

        roundTime: {
            type: Number,
            default: 30,
        },

        currentRound: {
            type: Number,
            default: 1,
        },

        maxRounds: {
            type: Number,
            default: 10,
        },

        chat: [
            {
                username: String,
                message: String,
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() +  24 * 60 * 60 * 1000),
            index: { expires: 0 },
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
