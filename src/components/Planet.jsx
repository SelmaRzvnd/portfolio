"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const NEARBY_THRESHOLD = 60;

function HoverLabel({ text, color }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const finalTransform = visible
    ? "translate(-50%, -50%) translateY(0px)"
    : "translate(-50%, -50%) translateY(8px)";

  return (
    <Html center distanceFactor={60} zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          opacity: visible ? 1 : 0,
          transform: finalTransform,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          width: "max-content",
          height: "max-content",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "18px",
            background: `linear-gradient(to bottom, transparent, ${color})`,
            opacity: 0.6,
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "7px 18px",
            fontFamily: "'Courier New', monospace",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#fff",
            background: "rgba(5, 8, 20, 0.92)",
            border: `1px solid ${color}66`,
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            boxShadow: `0 0 25px ${color}40, inset 0 0 15px ${color}10`,
          }}
        >
          <span style={{ position: "absolute", top: -2, left: -2, width: 8, height: 8, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
          <span style={{ position: "absolute", bottom: -2, right: -2, width: 8, height: 8, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
          <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderTop: `2px solid ${color}66`, borderRight: `2px solid ${color}66` }} />
          <span style={{ position: "absolute", bottom: -2, left: -2, width: 8, height: 8, borderBottom: `2px solid ${color}66`, borderLeft: `2px solid ${color}66` }} />
          <span style={{ color, marginRight: "8px", opacity: 0.8 }}>◈</span>
          {text}
        </div>

        <div
          style={{
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.18em",
            color: color,
            opacity: 0.6,
            textTransform: "uppercase",
          }}
        >
          [ click to open ]
        </div>
      </div>
    </Html>
  );
}

function OrbitRing({ size, color, hoverProgress }) {
  const ringRef = useRef();
  const outerRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.004;
      ringRef.current.material.opacity = hoverProgress.current * 0.7;
    }
    if (outerRef.current) {
      outerRef.current.rotation.z -= 0.0018;
      outerRef.current.material.opacity = hoverProgress.current * 0.3;
    }
  });

  const innerPoints = useMemo(() => {
    const pts = [];
    const r = size * 1.28;
    const gap = 0.18;
    for (let i = 0; i <= 80; i++) {
      const a = (i / 80) * Math.PI * 2;
      if (a > 0.3 && a < 0.3 + gap) continue;
      if (a > Math.PI + 0.1 && a < Math.PI + 0.1 + gap * 0.6) continue;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    return pts;
  }, [size]);

  const outerPoints = useMemo(() => {
    const pts = [];
    const r = size * 1.52;
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      if (a > 1.0 && a < 1.4) continue;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    return pts;
  }, [size]);

  return (
    <group>
      <line ref={ringRef}>
        <bufferGeometry setFromPoints={innerPoints} />
        <lineBasicMaterial color={color} transparent opacity={0} />
      </line>
      <line ref={outerRef}>
        <bufferGeometry setFromPoints={outerPoints} />
        <lineBasicMaterial color={color} transparent opacity={0} />
      </line>
    </group>
  );
}

export default function Planet({ position, color = "#4f46e5", size = 5, hoverText = "Planet", onClick }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [nearby, setNearby] = useState(false);
  const hoveredRef = useRef(false);
  const nearbyRef = useRef(false);
  const isVisibleRef = useRef(true);
  const hoverProgress = useRef(0);
  const planetPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  const materialArgs = useMemo(() => {
    const baseColor = new THREE.Color(color);
    return {
      uniforms: {
        uColor: { value: baseColor },
        uDeepColor: { value: baseColor.clone().multiplyScalar(0.1).add(new THREE.Color(0x110022)) },
        uHighlightColor: { value: baseColor.clone().add(new THREE.Color(0x444444)) },
        uOpacity: { value: 1.0 },
        uHover: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uDeepColor;
        uniform vec3 uHighlightColor;
        uniform float uOpacity;
        uniform float uHover;
        uniform float uTime;
        varying vec2 vUv;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i+vec2(0,0)),hash(i+vec2(1,0)),u.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
        }
        float fbm(vec2 p) {
          float v=0.0; float amp=0.5;
          for(int i=0;i<6;i++){v+=amp*noise(p);p*=2.1;amp*=0.5;}
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 disc = uv*2.0-1.0;
          float r = length(disc);
          if(r>1.0) discard;

          vec2 q = vec2(fbm(uv*2.5+uTime*0.02), fbm(uv*3.0));
          vec2 warp = vec2(fbm(uv*1.5+5.0*q+uTime*0.05));
          float pattern = fbm(uv*3.0+4.0*warp);

          vec3 col = mix(uDeepColor, uColor, smoothstep(0.0,0.4,pattern));
          col = mix(col, uHighlightColor, smoothstep(0.4,0.7,pattern));
          col = mix(col, vec3(1.0), smoothstep(0.7,1.0,pattern));

          vec3 normal = normalize(vec3(disc, sqrt(1.0-r*r)));
          vec3 lightDir = normalize(vec3(1.0,1.0,1.0));
          float diff = max(dot(normal,lightDir),0.0);
          float rim = pow(1.0-normal.z, 3.5);

          vec3 finalColor = col*(diff*0.8+0.3)+(rim*0.4);
          finalColor += uHover*0.18;

          float edgeGlow = pow(1.0-r,0.4)*uHover*0.35;
          finalColor += uColor*edgeGlow;

          gl_FragColor = vec4(finalColor, uOpacity*smoothstep(1.0,0.98,r));
        }
      `,
    };
  }, [color]);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.quaternion.copy(state.camera.quaternion);
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

    const dist = state.camera.position.distanceTo(planetPos);
    const opacity = THREE.MathUtils.clamp(1 - dist / 150, 0, 1);
    meshRef.current.material.uniforms.uOpacity.value = opacity;

    const interactable = dist < 140;
    isVisibleRef.current = interactable;

    if (!interactable && hoveredRef.current) {
      hoveredRef.current = false;
      setHover(false);
    }

    // Proximity label — only update state when crossing the threshold
    const isNearby = dist < NEARBY_THRESHOLD;
    if (isNearby !== nearbyRef.current) {
      nearbyRef.current = isNearby;
      setNearby(isNearby);
    }

    const targetHover = hoveredRef.current ? 1.0 : 0.0;
    hoverProgress.current = THREE.MathUtils.lerp(hoverProgress.current, targetHover, 0.08);
    meshRef.current.material.uniforms.uHover.value = hoverProgress.current;
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        if (!isVisibleRef.current) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        if (!isVisibleRef.current) return;
        e.stopPropagation();
        hoveredRef.current = true;
        setHover(true);
      }}
      onPointerOut={() => {
        hoveredRef.current = false;
        setHover(false);
      }}
    >
      <mesh ref={meshRef} scale={[size, size, 1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial args={[materialArgs]} transparent depthWrite={true} />
      </mesh>

      <OrbitRing size={size} color={color} hoverProgress={hoverProgress} />

      {(hovered || nearby) && (
        <HoverLabel text={hoverText} color={color} size={size} />
      )}
    </group>
  );
}