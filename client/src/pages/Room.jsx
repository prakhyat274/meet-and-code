import { useState } from "react";
import { useParams } from "react-router-dom";
import Notification from "../components/Notification";
import RoomHeader from "../components/RoomHeader";
import ParticipantsGrid from "../components/ParticipantsGrid";
import ControlBar from "../components/ControlBar";
import ChatPanel from "../components/ChatPanel";
import useRoomSocket from "../hooks/useRoomSocket";

export default function Room() {
    const { roomCode } = useParams();
    const username = localStorage.getItem("username") ?? "Anonymus";

    const { chat, notifications, participantsList, sendMessage, toggleMic, toggleCamera } =
        useRoomSocket(roomCode, username);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);

    console.log(participantsList);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#0a0a0b",
                overflow: "hidden",
                position: "relative",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px 28px",
                    minWidth: 0,
                    minHeight: 0,
                    overflow: "hidden",
                    position: "relative",
                }}>
                <RoomHeader
                    roomCode={roomCode}
                    participantCount={participantsList.length}
                    isChatOpen={isChatOpen}
                    onToggleChat={() => setIsChatOpen((prev) => !prev)}
                />

                <ParticipantsGrid participants={participantsList} />

                <ControlBar
                    isMicOn={isMicOn}
                    onToggleMic={() => {
                        setIsMicOn((prev) => !prev);
                        toggleMic();
                    }}
                    isCameraOn={isCameraOn}
                    onToggleCamera={() => {
                        setIsCameraOn((prev) => !prev);
                        toggleCamera();
                    }}
                />
            </div>

            {isChatOpen && <ChatPanel chat={chat} onSendMessage={sendMessage} />}

            {notifications.map((noti) => (
                <Notification text={noti.text} key={noti.id} />
            ))}
        </div>
    );
}
