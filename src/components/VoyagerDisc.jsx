"use client";

import { useRef, useState, useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function VoyagerDisc() {
  const groupRef = useRef();
  const discRef = useRef();
  const materialRef = useRef();
  const linesRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const distance = state.camera.position.distanceTo(groupRef.current.position);

    const targetOpacity = THREE.MathUtils.clamp(1 - distance / 200, 0, 1);

    document.documentElement.style.setProperty(
      "--voyager-fade",
      targetOpacity.toString()
    );

    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = targetOpacity;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (linesRef.current?.material) {
      linesRef.current.material.opacity = targetOpacity * 0.6;
    }

    // Move entire group (so everything sticks together)
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 1.5;
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, -200]}>
        {/* Disc */}
        <mesh ref={discRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[12, 12, 0.2, 128]} />
          <shaderMaterial
            ref={materialRef}
            transparent
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
              uColor: { value: new THREE.Color("#d4af37") },
              uTime: { value: 0 },
              uOpacity: { value: 0 },
            }}
            side={THREE.DoubleSide}
          />
        </mesh>

        <VoyagerEngraving linesRef={linesRef} />
        <VoyagerQuoteText />
      </group>

      <VoyagerStyles />
    </>
  );
}

/* ---------------- SHADERS ---------------- */

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
  uniform float uOpacity;

  void main() {
    vec2 centered = vUv - 0.5;
    float r = length(centered);
    float angle = atan(centered.y, centered.x);

    float grooves = smoothstep(0.0, 0.03, abs(sin(r * 600.0 + uTime * 0.3)));
    vec3 gold = uColor * (0.7 + 0.3 * sin(angle * 2.0 + uTime * 0.1));
    gold *= 0.9 + 0.1 * grooves;

    gl_FragColor = vec4(gold, uOpacity);
  }
`;

/* ---------------- ENGRAVING ---------------- */

function VoyagerEngraving({ linesRef }) {
  const points = [];
  for (let i = 0; i <= 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    points.push(new THREE.Vector3(0, 0, 0.15));
    points.push(new THREE.Vector3(Math.cos(angle) * 8, Math.sin(angle) * 8, 0.15));
  }

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <lineSegments ref={linesRef}>
        <bufferGeometry attach="geometry" setFromPoints={points} />
        <lineBasicMaterial color="#f5d98c" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

/* ---------------- QUOTE ---------------- */

const VoyagerQuoteText = forwardRef((props, ref) => {
  const quotes = [
    "Somewhere, something incredible is waiting to be known.",
    "We are a way for the cosmos to know itself.",
    "The cosmos is within us. We are made of star-stuff.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, 0.3, 0.2]} ref={ref}>
      <Html
        center
        transform
        distanceFactor={30}
        wrapperClass="voyager-proximity-fade"
      >
        <div className="voyager-quote-container">
          <div className="voyager-quote-box">
            <div className="corner-tl" />
            <div className="corner-br" />
            <p>{quotes[index]}</p>
          </div>
        </div>
      </Html>
    </group>
  );
});

VoyagerQuoteText.displayName = "VoyagerQuoteText";

/* ---------------- STYLES ---------------- */

function VoyagerStyles() {
  return (
    <style jsx global>{`
      :root {
        --voyager-fade: 0;
        --voyager-gold: #e6b93f;
      }

      .voyager-proximity-fade {
        opacity: var(--voyager-fade);
        transform: scale(calc(0.9 + var(--voyager-fade) * 0.1));
        transition: opacity 0.4s ease, transform 0.4s ease;
        pointer-events: none;
      }

      .voyager-quote-container {
        width: 270px;
      }

      .voyager-quote-box {
        position: relative;
        padding: 26px 28px;
        text-align: center;

        background: radial-gradient(
          circle at center,
          rgba(255, 230, 150, 0.18),
          rgba(120, 90, 20, 0.25)
        );

        backdrop-filter: blur(6px);
        border: 1px solid rgba(230, 185, 63, 0.35);
        border-radius: 6px;

        box-shadow:
          0 0 25px rgba(230, 185, 63, 0.15),
          inset 0 0 20px rgba(255, 220, 120, 0.08);
      }

      .voyager-quote-box p {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1rem;
        letter-spacing: 0.5px;
        line-height: 1.6;
        color: #fff3c4;

        text-shadow:
          0 0 6px rgba(245, 217, 140, 0.5),
          0 0 18px rgba(230, 185, 63, 0.25);
      }

      .corner-tl {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 22px;
        height: 22px;
        border-top: 2px solid var(--voyager-gold);
        border-left: 2px solid var(--voyager-gold);
      }

      .corner-br {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 22px;
        height: 22px;
        border-bottom: 2px solid var(--voyager-gold);
        border-right: 2px solid var(--voyager-gold);
      }
    `}</style>
  );
}