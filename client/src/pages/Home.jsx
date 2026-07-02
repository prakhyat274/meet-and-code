import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "../App.css";

const socket = io("http://localhost:5000");

function Home() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleStartMeet = async () => {
    const response = await fetch("http://localhost:5000/roomCode");
    const data = await response.json();
    const code = data.roomCode;

    handleJoinMeet(code);
  };

  const handleJoinMeet = async (code) => {
    const response = await fetch(`http://localhost:5000/joinRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomCode: code,
      }),
    });

    const data = await response.json();
    const success = data.success;

    if (success) {
      console.log(`Joined Room ${code}`);
      socket.emit("join-room", { roomCode: code });
      navigate(`/room/${code}`);
    } else console.log("Invalid Room Code");
  };

  return (
    <>
      <button
        style={{ margin: "5px", width: "150px", padding: "10px 20px" }}
        onClick={handleStartMeet}>
        Start Meet
      </button>
      <hr style={{ width: "100%" }} />
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
        style={{ margin: "5px", width: "200px", padding: "10px 20px" }}
      />
      <button
        style={{ margin: "5px", width: "150px", padding: "10px 20px" }}
        onClick={() => handleJoinMeet(roomCode)}>
        Join Meet
      </button>
    </>
  );
}

export default Home;
