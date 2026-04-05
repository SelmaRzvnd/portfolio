"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import starData from "@/data/stars.json";
import { getHorizontalCoords, getVancouverLST } from "@/utils/astroMath";
import CameraController from "@/components/CameraController";
import Planet from "@/components/Planet";

function Stars() {
  const { positions, colors, brightnesses, stats } = useMemo(() => {
    const pos = [];
    const col = [];
    const bright = [];
    const colorObj = new THREE.Color();

    const lst = getVancouverLST();
    const lat = 49.2827;

    const magRef = 0.0; // zero-point reference
    const exposureFactor = 20.0; // scale flux into displayable range (tweak)

    let minB = Infinity;
    let maxB = -Infinity;

    starData.forEach((star) => {
      const coords = getHorizontalCoords(star.ra, star.dec, lat, lst);
      if (coords.altDeg <= 0) return;

      // Standard astronomical conversion: flux ∝ 10^{-0.4 * (mag - magRef)}
      const flux = Math.pow(10, -0.4 * (star.mag - magRef));

      // Scale flux into a 0..1 range
      let b = flux * exposureFactor;
      b = Math.min(1.0, b);

      // color: neutral white scaled by brightness (linear)
      colorObj.setRGB(b, b, b);

      pos.push(coords.x, coords.y, coords.z);
      col.push(colorObj.r, colorObj.g, colorObj.b);
      bright.push(b);

      if (b < minB) minB = b;
      if (b > maxB) maxB = b;
    });

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      brightnesses: new Float32Array(bright),
      stats: { minB: isFinite(minB) ? minB : 0, maxB: isFinite(maxB) ? maxB : 0 },
    };
  }, []);

  return (
    <points renderOrder={999}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute
          attach="attributes-aBrightness"
          args={[brightnesses, 1]}
        />
      </bufferGeometry>

      <shaderMaterial
        transparent
        depthWrite={false}
        depthTest={true}
        vertexColors
        uniforms={{
          uSize: { value: 1.2 },
          uScale: { value: 180.0 },
          uSizeBoost: { value: 3.0 }, // how strongly brightness affects size
          uExposure: { value: 1.6 },
          uGamma: { value: 2.2 },
        }}
        vertexShader={`
          attribute float aBrightness;
          varying vec3 vColor;
          varying float vBrightness;
          uniform float uSize;
          uniform float uScale;
          uniform float uSizeBoost;
          uniform float uExposure;
          uniform float uGamma;

          void main() {
            // pass color through (already scaled by CPU brightness)
            vColor = color;

            // apply exposure and a mild perceptual mapping for size/alpha
            // keep mapping monotonic so magnitude ordering is preserved
            float b = aBrightness * uExposure;
            // apply a contrast boost (power <1 brightens faint relative to bright)
            // we use pow with exponent <1 to expand low end; tune as needed
            b = pow(b, 0.6);

            // store for fragment shader
            vBrightness = clamp(b, 0.0, 1.0);

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            // size depends strongly on brightness and distance
            float sizeFactor = pow(vBrightness, 0.5) * uSizeBoost + 1.0;            // ensure minimum size > 1 to avoid single-pixel artifacts on some displays
            gl_PointSize = max(1.5, uSize * sizeFactor * (uScale / -mvPosition.z));

            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vBrightness;
          uniform float uGamma;

          void main() {
            vec2 uv = gl_PointCoord.xy;
            float r = length(uv - vec2(0.5));

            // HARD EDGE STAR (no blur)
            if (r > 0.18) discard;

            // brightness directly controls intensity
            float alpha = vBrightness;

            // gamma correction
            vec3 col = pow(vColor, vec3(1.0 / uGamma));

            gl_FragColor = vec4(col * alpha, alpha);
          }
        `}
      />
    </points>
  );
}

function StarDome({ children }) {
  const groupRef = useRef();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
      groupRef.current.rotation.z += 0.00002;
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
      {children}
    </group>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        camera={{ position: [0, 0, 0], fov: 75, near: 1, far: 1000 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        
        {/* 1. Wrap Stars in StarDome so they follow the camera's position */}
        <StarDome>
          <Stars />
        </StarDome>

        {/* 2. Leave Planets in a standard group so the camera scrolls past them */}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Planet position={[0, 40, 0]} color="#6366f1" size={10} />
          <Planet position={[0, 20, 0]} color="#22c55e" size={12} />
          <Planet position={[0, 70, 0]} color="#f97316" size={14} />
        </group>

        <CameraController />
      </Canvas>
    </div>
  );
}

