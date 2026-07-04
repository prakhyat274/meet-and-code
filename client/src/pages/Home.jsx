import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

function Home() {
    const [roomCode, setRoomCode] = useState("");
    const [username, setUsername] = useState(localStorage.getItem("username") ?? "");
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const navigate = useNavigate();

    const handleStartMeet = async () => {
        if (username.trim() === "") {
            setIsUsernameEmpty(true);
            return;
        }
        localStorage.setItem("username", username.trim());

        const response = await fetch(`${import.meta.env.VITE_API_URL}/roomCode`);
        const data = await response.json();
        const code = data.roomCode;

        navigate(`/room/${code}`);
    };

    const handleJoinMeet = async (code) => {
        if (username.trim() === "") {
            setIsUsernameEmpty(true);
            return;
        }
        localStorage.setItem("username", username.trim());

        const response = await fetch(`${import.meta.env.VITE_API_URL}/joinRoom`, {
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
            navigate(`/room/${code}`);
        } else console.log("Invalid Room Code");
    };

    return (
        <>
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value.trim() !== "") {
                        setIsUsernameEmpty(false);
                    }
                }}
                placeholder="Enter Username"
                style={{ margin: "5px", width: "200px", padding: "10px 20px" }}
            />
            <p style={{ display: !isUsernameEmpty ? "none" : "block", color: "red" }}>
                *username required*
            </p>
            <hr style={{ width: "100%" }} />
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
