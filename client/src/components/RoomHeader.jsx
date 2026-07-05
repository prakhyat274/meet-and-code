import { ChatIcon } from "./icons";

export default function RoomHeader({ roomCode, participantCount, isChatOpen, onToggleChat }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexShrink: 0,
            }}>
            <div>
                <h3
                    style={{
                        color: "#f2f2f3",
                        fontWeight: 500,
                        fontSize: "15px",
                        margin: 0,
                        letterSpacing: "0.2px",
                    }}>
                    {roomCode}
                </h3>
                <p
                    style={{
                        color: "#6b6b72",
                        fontSize: "12.5px",
                        margin: "2px 0 0",
                    }}>
                    {participantCount} in call
                </p>
            </div>
            <button
                onClick={onToggleChat}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: isChatOpen ? "#3a3a40" : "#1f1f22",
                    background: isChatOpen ? "#1a1a1d" : "transparent",
                    color: "#d4d4d8",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                }}>
                <ChatIcon />
                Chat
            </button>
        </div>
    );
}
