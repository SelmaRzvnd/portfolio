"use client";

import { useEffect, useState } from "react";

export default function TransmissionPanel({ isOpen, onClose }) {
  const [render, setRender] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  if (isOpen && !render) {
    setRender(true);
  }

  if (!isOpen && visible) {
    setVisible(false);
  }

  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(() => setVisible(true), 10);
    } else if (render) {
      timeoutId = setTimeout(() => setRender(false), 400);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, render]);

  // Handle escape key closure
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!render) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 5, 0.6)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          width: "min(400px, 90vw)",
          background: "rgba(8, 12, 24, 0.9)",
          border: "1px solid rgba(100, 150, 255, 0.3)",
          borderRadius: "4px",
          padding: "2rem",
          boxShadow: "0 0 30px rgba(100, 150, 255, 0.05), inset 0 0 20px rgba(100, 150, 255, 0.05)",
          transform: visible ? "translateY(0)" : "translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          color: "rgba(220, 230, 255, 0.9)",
          fontFamily: "'Courier New', monospace",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(100, 150, 255, 0.2)",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#82aaff",
            textShadow: "0 0 8px rgba(130, 170, 255, 0.4)",
          }}>
            Incoming Transmission
          </h2>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ width: "6px", height: "6px", background: "#f43f5e", borderRadius: "50%" }} />
            <div style={{ width: "6px", height: "6px", background: "#f97316", borderRadius: "50%" }} />
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
            [ SYSTEM NOTES ]
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            fontSize: "0.85rem",
            lineHeight: 1.5,
          }}>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#82aaff" }}>•</span>
              Starfield uses real celestial coordinates (RA/Dec → Alt/Az)
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#82aaff" }}>•</span>
              Brightness scaled via apparent magnitude
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#82aaff" }}>•</span>
              Doppler shift simulated based on camera velocity
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#82aaff" }}>•</span>
              Zenith-centered sky projection
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#82aaff" }}>•</span>
              Local sidereal time (Vancouver-based)
            </li>
          </ul>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(100, 150, 255, 0.4)",
              color: "#82aaff",
              fontFamily: "inherit",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(100, 150, 255, 0.1)";
              e.currentTarget.style.borderColor = "#82aaff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(100, 150, 255, 0.4)";
            }}
          >
            [ Close ]
          </button>
        </div>
      </div>
    </div>
  );
}