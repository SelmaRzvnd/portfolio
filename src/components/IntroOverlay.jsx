"use client";

import { useState } from "react";

export default function IntroOverlay({ isOpen, onClose }) {
  const [phase, setPhase] = useState(isOpen ? "visible" : "gone");

  if (isOpen && phase === "gone") {
    setPhase("visible");
  }

  const handleEnter = () => {
    setPhase("fading");
    setTimeout(() => {
      setPhase("gone");
      onClose();
    }, 1200);
  };

  if (phase === "gone" && !isOpen) return null;

  return (
    <div
      className="intro-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 60%, rgba(8,6,20,0.72) 0%, rgba(2,2,5,0.97) 100%)",
        backdropFilter: "blur(2px)",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: phase === "fading" ? "none" : "auto",
        padding: "2rem",
      }}
    >

      {/* Thin horizontal rule */}
      <div style={{
        width: 1,
        height: 48,
        background: "linear-gradient(to bottom, transparent, rgba(255,200,100,0.5))",
        marginBottom: "2rem",
        animation: "fadeSlideDown 1.2s 0.2s both",
      }} />

      {/* Eyebrow */}
      <p style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.35em",
        color: "rgba(255, 190, 80, 0.7)",
        textTransform: "uppercase",
        margin: "0 0 1.2rem",
        animation: "fadeSlideDown 1s 0.5s both",
      }}>
        49.28° N · 123.12° W · {new Date().toUTCString().slice(17, 22)} UTC
      </p>

      {/* Main heading */}
      <h1 style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: "clamp(2rem, 6vw, 4rem)",
        fontWeight: 300,
        color: "#fff",
        textAlign: "center",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        margin: "0 0 2rem",
        animation: "fadeSlideDown 1s 0.8s both",
        maxWidth: 640,
      }}>
        You are looking at<br />
        <span style={{
          fontStyle: "italic",
          background: "linear-gradient(90deg, #ffd97d, #ff9a3c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}> my interactive portfolio.
        </span>
      </h1>

      {/* Body */}
      <div style={{
        maxWidth: 440,
        textAlign: "center",
        animation: "fadeSlideDown 1s 1.1s both",
        marginBottom: "2.8rem",
      }}>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(0.85rem, 2.2vw, 1rem)",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.8,
          margin: "0 0 1rem",
          fontWeight: 300,
        }}>
          Every star above is rendered from its real position in your sky right now.
          Each planet marks a piece of my story; the things I’ve built, studied, and explored.
          <br/><br/>
          <span style={{ color: "rgba(255, 190, 80, 0.85)", fontStyle: "italic" }}>
              Scroll to move. Click to explore.
          </span>
        </p>
      </div>

      {/* Divider line */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2.4rem",
        animation: "fadeSlideDown 1s 1.3s both",
        width: "min(320px, 80vw)",
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,190,80,0.5)" }} />
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Enter button */}
    <button
    onClick={handleEnter}
    style={{
        animation: "fadeSlideDown 1s 1.5s both",
        background: "transparent",
        border: "1px solid rgba(255,190,80,0.4)",
        color: "rgba(255,190,80,0.9)",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        padding: "0.85rem 2.4rem",
        cursor: "pointer",
        borderRadius: 2,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",

        /* FIX: keep text centered */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }}

        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(255,190,80,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,190,80,0.8)";
          e.currentTarget.style.color = "#ffd97d";
          e.currentTarget.style.letterSpacing = "0.4em";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "rgba(255,190,80,0.4)";
          e.currentTarget.style.color = "rgba(255,190,80,0.9)";
          e.currentTarget.style.letterSpacing = "0.3em";
        }}
      >
        Begin exploring
      </button>

      {/* Bottom rule */}
      <div style={{
        width: 1,
        height: 48,
        background: "linear-gradient(to top, transparent, rgba(255,200,100,0.3))",
        marginTop: "2rem",
        animation: "fadeSlideDown 1s 1.6s both",
      }} />

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          50%       { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}