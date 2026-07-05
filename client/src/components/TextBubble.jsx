export default function TextBubble({ data, id, index }) {
    const isMine = data.socketID === id;

    return (
        <div
            key={index}
            style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: isMine ? "flex-end" : "flex-start",
                maxWidth: "80%",
            }}>
            <span
                style={{
                    fontSize: "10px",
                    color: "#6b6b72",
                    textAlign: "right",
                    paddingRight: "2px",
                }}>
                {data.timeStamp}
            </span>

            <div
                style={{
                    position: "relative",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    background: isMine ? "#4f46e5" : "#18181b",
                    border: isMine ? "none" : "1px solid #232326",
                    color: "#e4e4e7",
                }}>
                {!isMine && (
                    <div
                        style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#8a8a92",
                            marginBottom: "2px",
                        }}>
                        {data.sender}
                    </div>
                )}

                <span
                    style={{
                        fontSize: "13px",
                        lineHeight: 1.4,
                        wordBreak: "break-word",
                        display: "block",
                    }}>
                    {data.message}
                </span>
            </div>
        </div>
    );
}
