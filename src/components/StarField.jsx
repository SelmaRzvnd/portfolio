"use client";

import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import starData from "@/data/stars.json";
import { getHorizontalCoords, getVancouverLST } from "@/utils/astroMath";
import CameraController from "@/components/CameraController";
import Planet from "@/components/Planet";



function Stars({ shaderRef }) {
  const { positions, colors, brightnesses } = useMemo(() => {
    const pos = [];
    const col = [];
    const bright = [];
    const colorObj = new THREE.Color();
    const lst = getVancouverLST();
    const lat = 49.2827;
    const magRef = 0.0; 
    const exposureFactor = 20.0;

    starData.forEach((star) => {
      const coords = getHorizontalCoords(star.ra, star.dec, lat, lst);
      if (coords.altDeg <= 0) return;

      const flux = Math.pow(10, -0.4 * (star.mag - magRef));
      let b = Math.min(1.0, flux * exposureFactor);

      colorObj.setRGB(b, b, b);
      pos.push(coords.x, coords.y, coords.z);
      col.push(colorObj.r, colorObj.g, colorObj.b);
      bright.push(b);
    });

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      brightnesses: new Float32Array(bright),
    };
  }, []);

  return (
    <points renderOrder={999}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightnesses, 1]} />
      </bufferGeometry>

      <shaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        depthTest={true}
        vertexColors
        uniforms={{
          uSize: { value: 1.2 },
          uScale: { value: 180.0 },
          uSizeBoost: { value: 3.0 },
          uExposure: { value: 1.6 },
          uGamma: { value: 2.2 },
          uVelocity: { value: 0.0 }, 
        }}
        vertexShader={`
          attribute float aBrightness;
          varying vec3 vColor;
          varying float vBrightness;
          uniform float uSize;
          uniform float uScale;
          uniform float uSizeBoost;
          uniform float uExposure;

          void main() {
            vColor = color;
            float b = aBrightness * uExposure;
            b = pow(b, 0.6);
            vBrightness = clamp(b, 0.0, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float sizeFactor = pow(vBrightness, 0.5) * uSizeBoost + 1.0;
            gl_PointSize = max(1.5, uSize * sizeFactor * (uScale / -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
    
        fragmentShader={`
          varying vec3 vColor;
          varying float vBrightness;
          uniform float uGamma;
          uniform float uVelocity;

          void main() {
            vec2 uv = gl_PointCoord.xy;
            float r = length(uv - vec2(0.5));
            if (r > 0.18) discard;

            // 1. Calculate Shift
            float beta = clamp(uVelocity * 1.5, -0.9, 0.9);
            float shift = sqrt((1.0 + beta) / (1.0 - beta));

            // 2. The Fix: We start with a base color of 1,1,1 for the shift calculation
            // then apply the brightness later and prevent "pre-clipping."
            vec3 baseColor = vec3(1.0);

            // 3. Apply the shift with "Channel Suppression"
            // If shift > 1 (Redshift), we keep Red at 1.0 but CRUSH Green and Blue.
            // If shift < 1 (Blueshift), we keep Blue at 1.0 but CRUSH Red and Green.
            vec3 shiftedColor;
            if (shift > 1.0) {
                // Redshift: Red stays high, others fall away based on shift intensity
                shiftedColor = vec3(
                    1.0, 
                    pow(1.0 / shift, 2.0), // Squared suppression for more "color"
                    pow(1.0 / shift, 3.0) 
                );
            } else {
                // Blueshift: Blue stays high, others fall away
                shiftedColor = vec3(
                    pow(shift, 3.0),
                    pow(shift, 2.0),
                    1.0
                );
            }

            // 4. Apply the star's actual brightness and the movement "flare"
            float flare = 1.0 + abs(beta) * 3.0;
            vec3 finalCol = shiftedColor * vBrightness * flare;

            // 5. Final Gamma Correction
            finalCol = pow(finalCol, vec3(1.0 / uGamma));

            gl_FragColor = vec4(finalCol, vBrightness);
          }
        `}
      />
    </points>
  );
}


function StarDome({ children, domeRef }) {
  return (
    <group ref={domeRef} rotation={[-Math.PI / 2, 0, 0]}>
      {children}
    </group>
  );
}

export default function StarField() {
  const shaderRef = useRef();
  const starDomeRef = useRef();

  const handleVelocity = (v) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uVelocity.value = v;
    }
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        camera={{ position: [0, 0, 0], fov: 75, near: 1, far: 1000 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        
        <StarDome domeRef={starDomeRef}>
          <Stars shaderRef={shaderRef} />
        </StarDome>

        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Planet position={[10, 70, 20]} color="#6366f1" size={10} />
          <Planet position={[-50, 30, -30]} color="#22c55e" size={12} />
          <Planet position={[-10, 50, 50]} color="#f97316" size={14} />
        </group>

        <CameraController 
          onVelocityUpdate={handleVelocity} 
          starDomeRef={starDomeRef} 
        />
      </Canvas>
    </div>
  );
}



