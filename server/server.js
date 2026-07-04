import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    },
});

const roomsToUser = new Map();

const generateUniqueRoomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";
    for (let l = 1; l <= 6; l++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

    if (roomsToUser.has(code)) return generateUniqueRoomCode();

    return code;
};

function removeUser(socket) {
    const users = roomsToUser
        .get(socket.data.roomCode)
        .filter((user) => user.socketId !== socket.id);

    if (users.length === 0) roomsToUser.delete(socket.data.roomCode);
    else roomsToUser.set(socket.data.roomCode, users);

    socket.to(socket.data.roomCode).emit("notify-room", {
        roomCode: socket.data.roomCode,
        username: socket.data.username,
        text: "has left the meet",
    });
}

app.use(cors());
app.use(express.json());

app.get("/roomCode", (req, res) => {
    const roomCode = generateUniqueRoomCode();
    res.json({ roomCode });
});

app.post("/joinRoom", (req, res) => {
    const data = req.body;
    const roomCode = data.roomCode;

    res.json({
        success: roomsToUser.has(roomCode),
    });
});

io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
        socket.data.roomCode = data.roomCode;
        socket.data.username = data.username;

        const users = roomsToUser.get(socket.data.roomCode) ?? [];

        users.push({
            socketId: socket.id,
            username: socket.data.username,
        });

        roomsToUser.set(socket.data.roomCode, users);

        socket.join(socket.data.roomCode);

        socket
            .to(socket.data.roomCode)
            .emit("notify-room", { ...data, text: "has joined the meet" });

        io.to(socket.data.roomCode).emit(
            "update-participants",
            roomsToUser.get(socket.data.roomCode) ?? [],
        );
    });

    socket.on("leave-room", () => {
        removeUser(socket);
        socket.leave(socket.data.roomCode);

        io.to(socket.data.roomCode).emit(
            "update-participants",
            roomsToUser.get(socket.data.roomCode) ?? [],
        );

        socket.data.roomCode = undefined;
        socket.data.username = undefined;
    });

    socket.on("send-message", (data) => {
        io.to(data.roomCode).emit("receive-message", {
            ...data,
            socketID: socket.id,
        });
    });

    socket.on("disconnect", () => {
        if (!roomsToUser.has(socket.data.roomCode)) return;
        removeUser(socket);

        io.to(socket.data.roomCode).emit(
            "update-participants",
            roomsToUser.get(socket.data.roomCode) ?? [],
        );
    });
});

httpServer.listen(5000, () => {
    console.log("Server Running At Port 5000");
});
