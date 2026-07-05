export default function ParticipantTile({ username }) {
    const initials = username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div
            className="participant-tile"
            style={{
                position: "relative",
                background: "#131315",
                borderRadius: "10px",
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #1f1f22",
                overflow: "hidden",
            }}>
            <div
                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#232326",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#c9c9cd",
                    flexShrink: 0,
                }}>
                {initials}
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "rgba(10,10,11,0.7)",
                    padding: "3px 9px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#e4e4e7",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "calc(100% - 20px)",
                }}>
                {username}
            </div>
        </div>
    );
}
