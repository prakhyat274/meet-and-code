export default function Notification({ id, text }) {
    return (
        <div
            key={id}
            style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "#1c1c1f",
                border: "1px solid #2a2a2e",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                color: "#f4f4f5",
                fontSize: "13.5px",
                maxWidth: "280px",
                zIndex: 50,
            }}>
            <div
                style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    flexShrink: 0,
                }}
            />
            <span style={{ lineHeight: 1.4, wordBreak: "break-word" }}>{text}</span>
        </div>
    );
}
