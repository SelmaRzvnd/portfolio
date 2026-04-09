"use client";

export default function UIControls({ onOpenIntro, onOpenTransmission }) {
  return (
    <>
      {/* ───── Intro Trigger (top-right) ───── */}
      <button
        onClick={onOpenIntro}
        aria-label="Open intro"
        style={{
          position: "fixed",
          top: "28px",
          right: "28px",
          zIndex: 1000,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          opacity: 0.7,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.7";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div style={{ width: "44px", height: "44px", position: "relative" }}>
          {/* brighter outer ring */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(255,190,80,0.6)",
            boxShadow: "0 0 12px rgba(255,190,80,0.4)",
            animation: "rotateSlow 18s linear infinite",
          }} />

          {/* crosshair */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,190,80,0.5)",
          }} />
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(255,190,80,0.5)",
          }} />

          {/* center core */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ffd97d",
            boxShadow: "0 0 16px rgba(255,217,125,1)",
            animation: "zenithPulse 2s ease-in-out infinite",
          }} />
        </div>
      </button>

      {/* ───── Transmission Trigger (bottom-right) ───── */}
      <button
        onClick={onOpenTransmission}
        aria-label="Open transmission"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 1000,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          opacity: 0.75,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.75";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div style={{
          width: "42px",
          height: "42px",
          position: "relative",
        }}>
          {/* core emitter */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "#82aaff",
            boxShadow: "0 0 14px rgba(130,170,255,1)",
          }} />

          {/* radio waves (stronger + visible now) */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "1.5px solid rgba(130,170,255,0.6)",
                transform: "translate(-50%, -50%) scale(0.4)",
                animation: `radioWave 2.2s ease-out ${i * 0.5}s infinite`,
              }}
            />
          ))}
        </div>
      </button>

      {/* ───── Animations ───── */}
      <style>{`
        @keyframes zenithPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes radioWave {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.9;
          }
          70% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}