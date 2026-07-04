import { useState } from "react";
import socket from "../socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TextBubble from "../components/TextBubble";
import Notification from "../components/Notification";

export default function Room() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [participantsList, setParticipantsList] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const username = localStorage.getItem("username") ?? "Anonymus";

    const { roomCode } = useParams();

    const handleSendMessage = () => {
        const text = message.trim();
        if (!text) return;

        const now = new Date();
        const timeStamp = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        socket.emit("send-message", {
            message: text,
            roomCode,
            sender: username,
            timeStamp,
        });
        setMessage("");
    };

    const handleReceiveMessage = (data) => {
        setChat((prev) => [...prev, data]);
    };

    const handleRoomNotification = (data) => {
        const newUser = data.username;
        const id = crypto.randomUUID();
        setNotifications((prev) => [...prev, { id, text: `${newUser} ${data.text}` }]);

        setTimeout(() => {
            setNotifications((prev) => {
                return prev.filter((p) => p.id !== id);
            });
        }, 3000);
    };

    const handleParticipationUpdate = (participants) => {
        setParticipantsList(participants);
    };

    useEffect(() => {
        socket.emit("join-room", { roomCode, username });

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
            socket.emit("leave-room");
        };
    }, [roomCode, username]);

    useEffect(() => {
        socket.on("notify-room", handleRoomNotification);

        socket.on("update-participants", handleParticipationUpdate);

        return () => {
            socket.off("notify-room", handleRoomNotification);
            socket.off("handleParticipationUpdate", handleParticipationUpdate);
        };
    }, []);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#0d0d0f",
            }}>
            {/* Main stage */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}>
                    <h3 style={{ color: "#e4e4e7", fontWeight: 600, margin: 0 }}>
                        Room: {roomCode}
                    </h3>
                    <button
                        onClick={() => setIsChatOpen((prev) => !prev)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #2a2a2e",
                            background: isChatOpen ? "#6366f1" : "#1c1c1f",
                            color: "#f4f4f5",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}>
                        {isChatOpen ? "Close chat" : "Open chat"}
                    </button>
                </div>

                <div
                    style={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "16px",
                        alignContent: "start",
                    }}>
                    {participantsList.map((p, index) => {
                        const name = p.username;
                        const initials = name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase();

                        return (
                            <div
                                key={p.id ?? index}
                                style={{
                                    position: "relative",
                                    background: "#1c1c1f",
                                    borderRadius: "12px",
                                    aspectRatio: "16 / 10",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #2a2a2e",
                                }}>
                                <div
                                    style={{
                                        width: "72px",
                                        height: "72px",
                                        borderRadius: "50%",
                                        background: "#3f3f46",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "22px",
                                        fontWeight: 600,
                                        color: "#e4e4e7",
                                    }}>
                                    {initials}
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        left: "12px",
                                        background: "rgba(0,0,0,0.5)",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                        color: "#f4f4f5",
                                    }}>
                                    {name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isChatOpen && (
                <div
                    style={{
                        width: "320px",
                        borderLeft: "1px solid #2a2a2e",
                        background: "#111114",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                    }}>
                    <h3 style={{ color: "#e4e4e7", fontWeight: 600, margin: "0 0 12px" }}>
                        In-call messages
                    </h3>
                    <div
                        style={{
                            height: "1px",
                            background: "#2a2a2e",
                            marginBottom: "16px",
                        }}
                    />

                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            marginBottom: "12px",
                        }}>
                        {chat.map((data, index) => {
                            return (
                                <TextBubble data={data} id={socket.id} index={index} key={index} />
                            );
                        })}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Send a message"
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: "10px",
                                border: "1px solid #2a2a2e",
                                background: "#1c1c1f",
                                color: "#e4e4e7",
                                fontSize: "13px",
                                outline: "none",
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            style={{
                                padding: "10px 16px",
                                borderRadius: "10px",
                                border: "none",
                                background: "#6366f1",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "13px",
                                cursor: "pointer",
                            }}>
                            Send
                        </button>
                    </div>
                </div>
            )}

            {notifications.length !== 0 &&
                notifications.map((noti) => <Notification text={noti.text} key={noti.id} />)}
        </div>
    );
}
