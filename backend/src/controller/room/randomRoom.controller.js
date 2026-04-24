const room = require("../../models/room");

const generateRoomCode = (length = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};

const randomRoom = async (req, res) => {
    let code;
    let exist = true;
    const user = await room.findOne({ host: req.user.id });
    if (user) {
        user.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        return res.status(201).json({
            room: user,
            message: "Room already Created.",
            success: true
        });
    }
    while (exist) {
        code = generateRoomCode();
        exist = await room.exists({ roomCode: code });
    }

    try {
        const newRoom = await room.create({
            roomCode: code,
            host: req.user.id,
            players: [
                {
                    player: req.user.id,
                    username: req.user.name,
                },
            ],
        });

        return res.status(200).json({
            success: true,
            message: "Room Generated",
            room: newRoom,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
};

module.exports = randomRoom;
