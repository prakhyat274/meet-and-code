import { MicIcon, MicOffIcon, CameraIcon, CameraOffIcon } from "./icons";

export default function ControlBar({ isMicOn, onToggleMic, isCameraOn, onToggleCamera }) {
    return (
        <div
            style={{
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
                background: "#131315",
                border: "1px solid #232326",
                borderRadius: "14px",
                padding: "8px",
            }}>
            <button
                className="control-btn"
                onClick={onToggleMic}
                style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    border: "none",
                    background: isMicOn ? "transparent" : "#e5484d",
                    color: isMicOn ? "#d4d4d8" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                title={isMicOn ? "Mute mic" : "Unmute mic"}>
                {isMicOn ? <MicIcon /> : <MicOffIcon />}
            </button>

            <button
                className="control-btn"
                onClick={onToggleCamera}
                style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    border: "none",
                    background: isCameraOn ? "transparent" : "#e5484d",
                    color: isCameraOn ? "#d4d4d8" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                title={isCameraOn ? "Turn off camera" : "Turn on camera"}>
                {isCameraOn ? <CameraIcon /> : <CameraOffIcon />}
            </button>
        </div>
    );
}
