export default function TextBubble({ data, id, index }) {
    const isMine = data.socketID === id;

    return (
        <div
            key={index}
            style={{
                position: "relative",
                alignSelf: isMine ? "flex-end" : "flex-start",
                maxWidth: "65%",
                padding: "6px 8px 8px 9px",
                borderRadius: "8px",
                background: isMine ? "#6366f1" : "#26262a",
                color: "#f4f4f5",
                boxShadow: "0 1px 1px rgba(0,0,0,0.3)",
            }}>
            {!isMine && (
                <div
                    style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: "#8ab4f8",
                        marginBottom: "2px",
                    }}>
                    {data.sender}
                </div>
            )}

            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <span
                    style={{
                        fontSize: "14px",
                        lineHeight: 1.4,
                        wordBreak: "break-word",
                    }}>
                    {data.message}
                </span>
                <span
                    style={{
                        fontSize: "10px",
                        color: isMine ? "#d9d9ff" : "#8a8a92",
                        whiteSpace: "nowrap",
                        marginLeft: "auto",
                        paddingTop: "2px",
                    }}>
                    {data.timeStamp}
                </span>
            </div>
        </div>
    );
}
