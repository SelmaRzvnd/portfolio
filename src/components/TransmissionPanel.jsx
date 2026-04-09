"use client";

import { useEffect, useState } from "react";

const facts = [
  {
    glyph: "✦",
    color: "#c4b5fd",
    title: "A Real Sky, Not a Simulation",
    body: "Every star above you is exactly where it should be — right now. I converted real catalogue coordinates (RA/Dec) into altitude and azimuth, factored in your location on Earth, and computed the local sidereal time live. You're looking at the actual sky.",
  },
  {
    glyph: "◎",
    color: "#82aaff",
    title: "You're Standing at the Zenith",
    body: "The centre of the canvas is the point directly above your head. Stars drift outward as they approach the horizon, just as they do when you lie on your back on a clear night and let the universe spin around you.",
  },
  {
    glyph: "★",
    color: "#f5d98c",
    title: "Brightness That Means Something",
    body: "Those faint specks aren't random. Each star's size and opacity is scaled from its apparent magnitude — the same number astronomers have used since Hipparchus in 129 BC. Sirius blazes. Distant dwarfs whisper.",
  },
  {
    glyph: "〜",
    color: "#f87171",
    title: "Scroll and Tear Through Spacetime",
    body: "When you scroll, you're not just moving — you're accelerating. Stars blueshift as you dive forward, redshift as you pull back. It's an exaggeration, yes, but the physics is real: this is exactly what a relativistic traveller would see.",
  },
];

function SignalDot({ delay = 0, color }) {
  return (
    <span style={{
      display: "inline-block",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 6px ${color}`,
      animation: `pulse 1.4s ease-in-out ${delay}s infinite`,
    }} />
  );
}

export default function TransmissionPanel({ isOpen, onClose }) {
  const [render, setRender] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  if (isOpen && !render) setRender(true);
  if (!isOpen && visible) setVisible(false);

  useEffect(() => {
    let t;
    if (isOpen) t = setTimeout(() => setVisible(true), 10);
    else if (render) t = setTimeout(() => setRender(false), 400);
    return () => clearTimeout(t);
  }, [isOpen, render]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!render) return null;

  const active = facts[activeIdx];

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.7; }
          98% { opacity: 0.85; }
        }
        .tx-tab:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .tx-tab-active {
          background: rgba(255,255,255,0.07) !important;
        }
        .close-btn:hover {
          background: rgba(130,170,255,0.12) !important;
          border-color: #82aaff !important;
          color: #fff !important;
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9998,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: visible ? "auto" : "none",
      }}>
        {/* Backdrop */}
        <div onClick={onClose} style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,8,0.65)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          backdropFilter: "blur(3px)",
        }} />

        {/* Panel */}
        <div style={{
          position: "relative",
          width: "min(520px, 92vw)",
          background: "rgba(6, 9, 20, 0.97)",
          border: "1px solid rgba(130,170,255,0.25)",
          borderRadius: "6px",
          boxShadow: "0 0 60px rgba(100,140,255,0.08), inset 0 0 40px rgba(100,140,255,0.03)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          opacity: visible ? 1 : 0,
          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          color: "rgba(220,230,255,0.88)",
          fontFamily: "'Courier New', monospace",
          overflow: "hidden",
          animation: visible ? "flicker 8s ease-in-out 2s infinite" : "none",
        }}>

          {/* Scanline effect */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: "30%",
              background: "linear-gradient(to bottom, transparent, rgba(130,170,255,0.025), transparent)",
              animation: "scanline 6s linear infinite",
            }} />
          </div>

          {/* Header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "1.2rem 1.5rem",
            borderBottom: "1px solid rgba(130,170,255,0.15)",
            background: "rgba(130,170,255,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* Animated signal */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <SignalDot delay={0}   color="#82aaff" />
                <SignalDot delay={0.2} color="#82aaff" />
                <SignalDot delay={0.4} color="#82aaff" />
              </div>
              <h2 style={{
                margin: 0, fontSize: "0.75rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#82aaff",
                textShadow: "0 0 10px rgba(130,170,255,0.5)",
              }}>
                Transmission Received
              </h2>
            </div>

            {/* Traffic lights */}
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <div style={{ width: 7, height: 7, background: "#f43f5e", borderRadius: "50%", opacity: 0.8 }} />
              <div style={{ width: 7, height: 7, background: "#f97316", borderRadius: "50%", opacity: 0.8 }} />
              <div style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", opacity: 0.8 }} />
            </div>
          </div>

          {/* Tab row */}
          <div style={{
            display: "flex", gap: "0",
            borderBottom: "1px solid rgba(130,170,255,0.12)",
            overflowX: "auto",
          }}>
            {facts.map((f, i) => (
              <button
                key={i}
                className={`tx-tab${i === activeIdx ? " tx-tab-active" : ""}`}
                onClick={() => setActiveIdx(i)}
                style={{
                  flex: 1,
                  background: i === activeIdx ? "rgba(255,255,255,0.07)" : "transparent",
                  border: "none",
                  borderBottom: i === activeIdx ? `2px solid ${f.color}` : "2px solid transparent",
                  color: i === activeIdx ? f.color : "rgba(255,255,255,0.3)",
                  fontFamily: "inherit",
                  fontSize: "1rem",
                  padding: "0.7rem 0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textShadow: i === activeIdx ? `0 0 8px ${f.color}80` : "none",
                }}
              >
                {f.glyph}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding: "1.5rem", minHeight: "180px" }}>
            <h3 style={{
              margin: "0 0 0.85rem",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active.color,
              textShadow: `0 0 10px ${active.color}60`,
            }}>
              {active.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: "0.87rem",
              lineHeight: 1.75,
              color: "rgba(210,220,255,0.75)",
              transition: "opacity 0.2s",
            }}>
              {active.body}
            </p>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0.9rem 1.5rem",
            borderTop: "1px solid rgba(130,170,255,0.1)",
            background: "rgba(0,0,0,0.2)",
          }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {facts.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: i === activeIdx ? 18 : 5,
                    height: 5,
                    borderRadius: 3,
                    background: i === activeIdx ? active.color : "rgba(255,255,255,0.15)",
                    boxShadow: i === activeIdx ? `0 0 6px ${active.color}` : "none",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {activeIdx > 0 && (
                <button
                  onClick={() => setActiveIdx(i => i - 1)}
                  className="close-btn"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(130,170,255,0.25)",
                    color: "rgba(130,170,255,0.7)",
                    fontFamily: "inherit",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    padding: "0.4rem 1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "2px",
                  }}
                >
                  ← prev
                </button>
              )}
              {activeIdx < facts.length - 1 ? (
                <button
                  onClick={() => setActiveIdx(i => i + 1)}
                  className="close-btn"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(130,170,255,0.25)",
                    color: "rgba(130,170,255,0.7)",
                    fontFamily: "inherit",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    padding: "0.4rem 1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "2px",
                  }}
                >
                  next →
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="close-btn"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(130,170,255,0.25)",
                    color: "rgba(130,170,255,0.7)",
                    fontFamily: "inherit",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "0.4rem 1.2rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "2px",
                  }}
                >
                  [ close ]
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}