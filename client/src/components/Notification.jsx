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
                padding: "11px 15px",
                borderRadius: "10px",
                background: "#131315",
                border: "1px solid #232326",
                color: "#e4e4e7",
                fontSize: "13px",
                fontWeight: 500,
                maxWidth: "280px",
                zIndex: 50,
            }}>
            <div
                style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#4f46e5",
                    flexShrink: 0,
                }}
            />
            <span style={{ lineHeight: 1.4, wordBreak: "break-word" }}>{text}</span>
        </div>
    );
}
