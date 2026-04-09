"use client";

export default function UIControls({ onOpenIntro, onOpenTransmission }) {
  return (
    <>
      {/* ───── Transmission Trigger (bottom-left) ───── */}
      <button
        onClick={onOpenTransmission}
        aria-label="Open transmission"
        style={{
          position: "fixed",
          left: "28px",
          bottom: "28px",
          zIndex: 1000,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "6px",
          fontFamily: "'Courier New', monospace",
          color: "#82aaff",
          opacity: 0.6,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.6";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* waveform */}
        <div style={{
          display: "flex",
          alignItems: "end",
          gap: "2px",
          height: "20px",
          position: "relative",
        }}>
          {[0.35, 0.75, 0.5, 1, 0.6, 0.85, 0.4].map((h, i) => (
            <span
              key={i}
              style={{
                width: "2px",
                height: `${h * 20}px`,
                background: "#82aaff",
                boxShadow: "0 0 6px rgba(130,170,255,0.6)",
                transformOrigin: "bottom",
                animation: `pulseHeight 1.6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}

          {/* drifting signal particle */}
          <span style={{
            position: "absolute",
            left: "-8px",
            top: "50%",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#82aaff",
            boxShadow: "0 0 10px #82aaff",
            transform: "translateY(-50%)",
            animation: "signalDrift 3s linear infinite",
          }} />
        </div>

        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontSize: "0.52rem", letterSpacing: "0.28em" }}>
            SIGNAL_LOCK
          </div>
          <div style={{ fontSize: "0.48rem", opacity: 0.45, letterSpacing: "0.22em" }}>
            TRANSMISSION ACTIVE
          </div>
        </div>
      </button>

      {/* ───── Intro Trigger (zenith, top-center) ───── */}
      <button
        onClick={onOpenIntro}
        aria-label="Open intro"
        style={{
          position: "fixed",
          top: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          fontFamily: "'Courier New', monospace",
          color: "#ffd97d",
          opacity: 0.55,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateX(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.55";
          e.currentTarget.style.transform = "translateX(-50%) scale(1)";
        }}
      >
        <div style={{
          width: "42px",
          height: "42px",
          position: "relative",
        }}>
          {/* rotating ring */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(255,190,80,0.25)",
            animation: "rotateSlow 14s linear infinite",
          }} />

          {/* inner ring */}
          <div style={{
            position: "absolute",
            inset: "6px",
            borderRadius: "50%",
            border: "1px solid rgba(255,190,80,0.15)",
          }} />

          {/* crosshair */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,190,80,0.2)",
          }} />
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(255,190,80,0.2)",
          }} />

          {/* center pulse */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ffd97d",
            boxShadow: "0 0 12px rgba(255,217,125,0.9)",
            animation: "zenithPulse 2.2s ease-in-out infinite",
          }} />
        </div>
      </button>

      {/* animations */}
      <style>{`
        @keyframes pulseHeight {
          0%, 100% { transform: scaleY(0.6); opacity: 0.5; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }

        @keyframes signalDrift {
          0% { transform: translate(-8px, -50%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(80px, -50%); opacity: 0; }
        }

        @keyframes zenithPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}