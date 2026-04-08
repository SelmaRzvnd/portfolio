"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function VoyagerDisc() {
  const discRef = useRef();
  const textRef = useRef();
  const [open, setOpen] = useState(null);

  useFrame((state, delta) => {
    if (discRef.current) {
      discRef.current.rotation.y -= delta * 0.25;
      discRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 1.2;
      if (discRef.current.material?.uniforms?.uTime) {
        discRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
    if (textRef.current) {
      textRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <group position={[0, 0, -250]}>
        {/* Voyager Gold Disc */}
        <mesh ref={discRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[10, 10, 0.15, 128, 1, false]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
              uColor: { value: new THREE.Color("#d4af37") },
              uTime: { value: 0 },
            }}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Engraved Voyager Lines */}
        <VoyagerEngraving />

        {/* Rotating quote text on the disc */}
        <VoyagerQuoteText ref={textRef} />

        {/* --- INTERACTIVE ZONES --- */}
        <Zone y={5} label="MUSIC" onClick={() => setOpen("music")} />
        <Zone y={0} label="QUOTES" onClick={() => setOpen("quotes")} />
        <Zone y={-5} label="PHOTOS" onClick={() => setOpen("photos")} />

        {/* --- PANELS (overlay HTML) --- */}
        {open === "music" && <MusicPanel onClose={() => setOpen(null)} />}
        {open === "quotes" && <QuotePanel onClose={() => setOpen(null)} />}
        {open === "photos" && <PhotoPanel onClose={() => setOpen(null)} />}
      </group>
    </>
  );
}

/* ---------------- SHADER ---------------- */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;

  void main() {
    vec2 centered = vUv - 0.5;
    float r = length(centered);
    float angle = atan(centered.y, centered.x);

    float grooves = smoothstep(0.0, 0.02, abs(sin(r * 800.0 + uTime * 0.5)));
    vec3 gold = uColor * (0.6 + 0.4 * sin(angle * 4.0 + uTime * 0.2));
    gold *= 0.8 + 0.2 * grooves;

    gl_FragColor = vec4(gold, 1.0);
  }
`;

/* ---------------- ENGRAVING LINES ---------------- */

function VoyagerEngraving() {
  const points = [];
  for (let i = 0; i <= 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    points.push(new THREE.Vector3(0, 0, 0.11));
    points.push(new THREE.Vector3(Math.cos(angle) * 6, Math.sin(angle) * 6, 0.11));
  }

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <lineSegments>
        <bufferGeometry attach="geometry" setFromPoints={points} />
        <lineBasicMaterial color="#f5d98c" linewidth={1} />
      </lineSegments>
    </group>
  );
}

/* ---------------- QUOTE TEXT ON DISC (SDF / sprite text) ---------------- */

function VoyagerQuoteText({ ref }) {
  const quotes = [
    "Somewhere, something incredible is waiting to be known. — Sagan",
    "We are a way for the cosmos to know itself. — Sagan",
    "Not all those who wander are lost. — Tolkien",
    "The cosmos is within us. — Sagan",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // 8 seconds, as requested

    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, 0, 0.12]} ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <Html center>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.3rem",
            color: "#fff",
            textShadow: "0 0 4px #f5d98c",
            textAlign: "center",
            width: "100%",
            lineHeight: "1.1",
          }}
        >
          {quotes[index]}
        </div>
      </Html>
    </group>
  );
}

/* ---------------- INTERACTIVE ZONE LABELS ---------------- */

function Zone({ y, label, onClick }) {
  return (
    <mesh
      position={[0, y, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <circleGeometry args={[3, 32]} />
      <meshBasicMaterial transparent opacity={0.001} />
      <Html center>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            color: "#DAA520",
            textShadow: "0 0 4px #000",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </div>
      </Html>
    </mesh>
  );
}

/* ---------------- MUSIC PANEL (Spotify) ---------------- */

function MusicPanel({ onClose }) {
  return (
    <Html center position={[0, -14, 0]}>
      <div className="voyager-panel beautiful-panel">
        <h3>MUSIC_ARCHIVE</h3>

        {/* Spotify Embed: "Celestial – Birdy" */}
        <div className="spotify-player">
          <iframe
            src="https://open.spotify.com/embed/track/1NW1Emgyr1Ah2hjbnW1qQ9?utm_source=generator"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <button className="voyager-close" onClick={onClose}>
          close
        </button>
      </div>
      <VoyagerStyles />
    </Html>
  );
}

/* ---------------- QUOTE PANEL (info only) ---------------- */

function QuotePanel({ onClose }) {
  return (
    <Html center position={[0, -14, 0]}>
      <div className="voyager-panel beautiful-panel">
        <h3>QUOTE_STREAM INFO</h3>
        <p style={{ fontSize: "0.8rem", margin: "6px 0" }}>
          Quotes are encoded directly <br />
          <span
            style={{
              color: "#DAA520",
            }}
          >
            on the Voyager disc itself
          </span>
        </p>
        <p style={{ fontSize: "0.7rem", opacity: 0.7, margin: "8px 0" }}>
          Click anywhere on the canvas to close.
        </p>
        <button className="voyager-close" onClick={onClose}>
          back to disc
        </button>
      </div>
    </Html>
  );
}

/* ---------------- PHOTO PANEL (stub with styling) ---------------- */

function PhotoPanel({ onClose }) {
  return (
    <Html center position={[0, -14, 0]}>
      <div className="voyager-panel beautiful-panel">
        <h3>PHOTO_ARCHIVE</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
            gap: "6px",
            width: "100%",
            height: "160px",
            overflowY: "auto",
            padding: "4px 0",
            borderRadius: "6px",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                height: "70px",
                background: "#222",
                borderRadius: "4px",
                border: "1px solid rgba(218,165,32,0.3)",
              }}
            />
          ))}
        </div>
        <button className="voyager-close" onClick={onClose}>
          close
        </button>
      </div>
    </Html>
  );
}

/* ---------------- STYLES (shared + enhanced) ---------------- */

function VoyagerStyles() {
  return (
    <style jsx>{`
      .voyager-panel {
        width: 320px;
        background: rgba(10, 10, 15, 0.92);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(218, 165, 32, 0.5);
        color: #fff;
        padding: 20px;
        border-radius: 12px;
        font-family: monospace;
        text-align: center;
        animation: fadeIn 0.4s ease;
      }

      .beautiful-panel {
        box-shadow: 0 0 20px rgba(218, 165, 32, 0.25);
        border: 1px solid rgba(218, 165, 32, 0.6);
      }

      .voyager-panel h3 {
        color: #d4af37;
        margin-bottom: 10px;
        font-size: 0.9rem;
        letter-spacing: 0.1em;
        text-shadow: 0 0 2px rgba(218, 165, 32, 0.5);
      }

      .voyager-panel p {
        font-size: 0.8rem;
        margin: 6px 0;
      }

      .voyager-close {
        margin-top: 14px;
        background: transparent;
        border: 1px solid rgba(218, 165, 32, 0.45);
        color: rgba(218, 165, 32, 0.95);
        padding: 6px 14px;
        font-size: 0.7rem;
        cursor: pointer;
        border-radius: 4px;
        transition: 0.2s;
        font-family: monospace;
      }

      .voyager-close:hover {
        background: rgba(218, 165, 32, 0.15);
        border-color: rgba(218, 165, 32, 0.85);
        color: #ffd97d;
      }

      .spotify-player {
        margin: 10px 0 16px 0;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid rgba(218, 165, 32, 0.3);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  );
}