import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/roomCode", (req, res) => {
  //Called a Function to generate room code
  const roomCode = "ABC123";
  res.json({ roomCode });
});

app.post("/joinRoom", (req, res) => {
  const data = req.body;
  const roomCode = data.roomCode;

  res.json({
    success: roomCode === "ABC123" ? true : false,
  });
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join-room", (data) => {
    const roomCode = data.roomCode;
    socket.join(roomCode);
    console.log(`${socket.id} has joined room ${roomCode}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
  });
});

httpServer.listen(5000, () => {
  console.log("Server Running At Port 5000");
});
