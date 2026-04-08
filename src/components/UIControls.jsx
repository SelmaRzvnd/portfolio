"use client";

export default function UIControls({ onOpenIntro, onOpenTransmission }) {
  const buttonStyle = {
    background: "rgba(10, 15, 30, 0.4)",
    border: "1px solid rgba(100, 150, 255, 0.2)",
    color: "rgba(200, 220, 255, 0.8)",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "4px",
    fontFamily: "'Courier New', monospace",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem", // Changed from left: "2rem"
        zIndex: 9997,
        display: "flex",
        flexDirection: "row-reverse", // Reverses the order so they align nicely against the right edge
        gap: "1rem",
      }}
    >
      <button
        onClick={onOpenIntro}
        style={buttonStyle}
        title="Reopen Intro"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(10, 15, 30, 0.7)";
          e.currentTarget.style.borderColor = "rgba(100, 150, 255, 0.6)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(100, 150, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10, 15, 30, 0.4)";
          e.currentTarget.style.borderColor = "rgba(100, 150, 255, 0.2)";
          e.currentTarget.style.color = "rgba(200, 220, 255, 0.8)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        ?
      </button>

      <button
        onClick={onOpenTransmission}
        style={buttonStyle}
        title="Open Transmission"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(10, 15, 30, 0.7)";
          e.currentTarget.style.borderColor = "rgba(100, 150, 255, 0.6)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(100, 150, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10, 15, 30, 0.4)";
          e.currentTarget.style.borderColor = "rgba(100, 150, 255, 0.2)";
          e.currentTarget.style.color = "rgba(200, 220, 255, 0.8)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        ◉
      </button>
    </div>
  );
}