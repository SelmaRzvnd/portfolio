"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import starData from "@/data/stars.json";
import { getHorizontalCoords, getVancouverLST } from "@/utils/astroMath";

function Stars() {
  const { positions, colors } = useMemo(() => {
    const pos = [];
    const col = [];
    const colorObj = new THREE.Color();

    const lst = getVancouverLST();
    const lat = 49.2827;

    // Reference magnitude (approx naked-eye limit)
    const magRef = 6.0;

    // Exposure factor (controls visibility ONLY, not physics)
    const exposure = 6.0;

    starData.forEach((star) => {
      const coords = getHorizontalCoords(star.ra, star.dec, lat, lst);

      // Only show stars above horizon
      if (coords.altDeg <= 0) return;

      const flux = Math.pow(10, -0.4 * star.mag);
      const brightness = Math.log10(1 + flux * 20000) / Math.log10(20001);
      const final = brightness;

      pos.push(coords.x, coords.y, coords.z);
      colorObj.setRGB(brightness, brightness, brightness);
      col.push(colorObj.r, colorObj.g, colorObj.b);
    });

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>

      <shaderMaterial
        transparent
        depthWrite={false}
        vertexColors
        blending={THREE.NormalBlending}
        uniforms={{
          uSize: { value: 1.2 },
        }}
        vertexShader={`
          varying vec3 vColor;
          uniform float uSize;

          void main() {
            vColor = color;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            // Small, crisp stars
            gl_PointSize = uSize * (180.0 / -mvPosition.z);

            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;

          void main() {
            float r = length(gl_PointCoord - vec2(0.5));

            // Hard cutoff → true point-like stars
            if (r > 0.2) discard;

            gl_FragColor = vec4(vColor, 1.0);
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