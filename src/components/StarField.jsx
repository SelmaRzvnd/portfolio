"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import starData from "@/data/stars.json";
import { getHorizontalCoords, getVancouverLST } from "@/utils/astroMath";

function Stars() {
  const { positions, colors, brightnesses, stats } = useMemo(() => {
    const pos = [];
    const col = [];
    const bright = [];
    const colorObj = new THREE.Color();

    const lst = getVancouverLST();
    const lat = 49.2827;

    // CPU-side tuning: reference magnitude and exposure scale
    const magRef = 0.0; // zero-point reference
    const exposureFactor = 20.0; // scale flux into displayable range (tweak)

    let minB = Infinity;
    let maxB = -Infinity;

    starData.forEach((star) => {
      const coords = getHorizontalCoords(star.ra, star.dec, lat, lst);
      if (coords.altDeg <= 0) return;

      // Standard astronomical conversion: flux ∝ 10^{-0.4 * (mag - magRef)}
      const flux = Math.pow(10, -0.4 * (star.mag - magRef));

      // Scale flux into a 0..1 range but avoid heavy compression here
      let b = flux * exposureFactor;

      // clamp but do not aggressively compress; shader will apply perceptual mapping
      b = Math.min(1.0, b);

      // color: neutral white scaled by brightness (we keep color linear)
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

  // Optional: console log to help tune exposureFactor
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("star brightness range:", { min: stats?.minB, max: stats?.maxB });
  }

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
          uSize: { value: 1.2 }, // slightly larger base size to avoid single-pixel sprites
          uScale: { value: 180.0 }, // perspective scale factor
          uSizeBoost: { value: 3.0 }, // how strongly brightness affects size
          uExposure: { value: 1.6 }, // multiplies brightness in shader
          uGamma: { value: 2.2 }, // display gamma (use 1.0..2.2)
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

export default function StarField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020205]">
    <Canvas
      dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1}
      camera={{ position: [0, 0, 0], fov: 75, near: 1, far: 1000 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >

        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Stars />
        </group>
      </Canvas>
    </div>
  );
}
