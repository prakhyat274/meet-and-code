import { useState } from "react";
import socket from "../socket";
import TextBubble from "./TextBubble";
import { SendIcon } from "./icons";

export default function ChatPanel({ chat, onSendMessage }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        onSendMessage(message);
        setMessage("");
    };

    return (
        <div
            className="chat-panel"
            style={{
                width: "300px",
                borderLeft: "1px solid #1f1f22",
                background: "#0d0d0f",
                display: "flex",
                flexDirection: "column",
                padding: "22px 20px",
                minHeight: 0,
                overflow: "hidden",
            }}>
            <h3
                style={{
                    color: "#e4e4e7",
                    fontWeight: 500,
                    fontSize: "14px",
                    margin: "0 0 14px",
                    flexShrink: 0,
                    letterSpacing: "0.2px",
                }}>
                Messages
            </h3>
            <div
                style={{
                    height: "1px",
                    background: "#1f1f22",
                    marginBottom: "16px",
                    flexShrink: 0,
                }}
            />

            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column-reverse",
                    gap: "4px",
                    marginBottom: "14px",
                }}>
                {[...chat].reverse().map((data, index) => (
                    <div className="message-wrapper" key={index}>
                        <TextBubble data={data} id={socket.id} index={index} />
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "10px 13px",
                        borderRadius: "8px",
                        border: "1px solid #232326",
                        background: "#131315",
                        color: "#e4e4e7",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        width: "38px",
                        height: "38px",
                        flexShrink: 0,
                        borderRadius: "8px",
                        border: "1px solid #232326",
                        background: "#1a1a1d",
                        color: "#d4d4d8",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
