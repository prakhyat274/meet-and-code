import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(cors());

app.use("/", (req, res) => {
  res.send("hello form server", 200);
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(5000, () => {
  console.log("Server Running At Port 5000");
});
