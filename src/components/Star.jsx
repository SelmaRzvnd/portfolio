"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei"; // Added Html import
import * as THREE from "three";

/* ─── Star Hover Label ───────────────────────────────────────────────── */
function StarLabel({ text, visible }) {
  const starColor = "#ffcc00"; // Intense Gold/Yellow
  const accentColor = "#ff4d00"; // Plasma Orange/Red

  const finalTransform = visible
    ? "translate(-50%, -50%) scale(1)"
    : "translate(-50%, -50%) scale(0.9) translateY(10px)";

  return (
    <Html
      center
      distanceFactor={80} // Adjusted for the larger star size
      zIndexRange={[100, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: finalTransform,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Solar Flare Connector */}
        <div
          style={{
            width: "2px",
            height: "25px",
            background: `linear-gradient(to bottom, transparent, ${starColor}, ${accentColor})`,
            boxShadow: `0 0 15px ${accentColor}`,
            opacity: 0.8,
            marginBottom: "10px"
          }}
        />

        {/* Main Label Box */}
        <div
          style={{
            position: "relative",
            padding: "10px 24px",
            fontFamily: "'Courier New', monospace",
            fontSize: "18px", // Larger for the Star
            fontWeight: 800,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#fff",
            background: "rgba(15, 5, 0, 0.95)", // Very dark red-black
            border: `1px solid ${accentColor}aa`,
            backdropFilter: "blur(10px)",
            whiteSpace: "nowrap",
            // Intense heat glow
            boxShadow: `0 0 35px ${accentColor}60, inset 0 0 20px ${accentColor}20`,
          }}
        >
          {/* Heat Brackets */}
          <span style={{
            position: "absolute", top: -3, left: -3, width: 12, height: 12,
            borderTop: `3px solid ${starColor}`, borderLeft: `3px solid ${starColor}`
          }} />
          <span style={{
            position: "absolute", bottom: -3, right: -3, width: 12, height: 12,
            borderBottom: `3px solid ${starColor}`, borderRight: `3px solid ${starColor}`
          }} />

          <span style={{ color: starColor, marginRight: "12px", textShadow: `0 0 10px ${starColor}` }}>☀</span>
          {text}
        </div>

        <div style={{
          marginTop: "8px",
          fontSize: "10px",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.2em",
          color: "rgba(0, 0, 0, 0.8)",
          opacity: 0.8,
          textShadow: `0 0 5px ${starColor}`
        }}>
          [ INITIATE CORE ACCESS ]
        </div>
      </div>
    </Html>
  );
}

/* ─── Main Star Component ────────────────────────────────────────────── */
export default function Star({ position = [0, -35, 200], onClick = () => {} }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  const size = 30;
  const hoverText = "About Me";

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  const materialArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0.0 },
      uHover: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;
      varying vec3 vPosition;

      vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289_4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289_4(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289_3(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
          i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
          i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      float fbm(vec3 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; ++i) {
          v += a * snoise(p);
          p = p * 2.1 + vec3(31.4, 17.3, 44.2);
          a *= 0.5;
        }
        return v;
      }

      float granulation(vec2 uv, float time) {
        vec3 p1 = vec3(uv * 4.5, time * 0.18);
        vec3 p2 = vec3(uv * 9.0, time * 0.28 + 10.0);
        float cell = snoise(p1) + snoise(p2) * 0.4;
        return clamp(pow(abs(cell), 0.5), 0.0, 1.0);
      }

      void main() {
        vec2 disc = vUv * 2.0 - 1.0;
        float r = length(disc);
        if (r > 1.0) discard;
        float depth = sqrt(max(0.0, 1.0 - r * r));
        float limb = mix(0.45, 1.0, pow(depth, 0.75));
        float plasma = fbm(vPosition * 0.3 + uTime * 0.12) * 0.5 + 0.5;
        float cells  = granulation(disc, uTime);
        float combined = plasma * 0.6 + cells * 0.4;
        vec3 cDark   = vec3(0.80, 0.18, 0.00);
        vec3 cMid    = vec3(1.00, 0.55, 0.05);
        vec3 cBright = vec3(1.00, 0.95, 0.70);
        vec3 photoColor = combined < 0.5
          ? mix(cDark, cMid, combined * 2.0)
          : mix(cMid, cBright, (combined - 0.5) * 2.0);
        photoColor *= limb;
        vec3 coronaColor = vec3(1.0, 0.65, 0.1);
        float blend = smoothstep(0.68, 0.76, r);
        vec3 color = mix(photoColor, coronaColor, blend);
        color += uHover * 0.2;
        float alpha = smoothstep(1.0, 0.70, r);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.quaternion.copy(state.camera.quaternion);
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
      meshRef.current.material.uniforms.uHover.value,
      hovered ? 1.0 : 0.0,
      0.1
    );
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={[size, size, 1]}
        renderOrder={1001}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          args={[materialArgs]}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      <StarLabel text={hoverText} visible={hovered} />
    </group>
  );
}