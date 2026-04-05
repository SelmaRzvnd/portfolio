"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet({ position, color = "#4f46e5", size = 5 }) {
  const meshRef = useRef();

  const materialArgs = useMemo(() => ({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 1.0 },
      uSize: { value: size },
    },
    vertexShader: `
      uniform float uSize;
      varying vec2 vUv;

      void main() {
        vUv = uv;

        // Move only the CENTER point to view space
        vec4 mvCenter = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);

        // Expand the quad in screen space AFTER projection center is placed
        // This means no perspective distortion — always a perfect circle
        vec2 offset = (uv * 2.0 - 1.0) * uSize;
        mvCenter.xy += offset;

        gl_Position = projectionMatrix * mvCenter;
      }
    `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;

    // 2D Hash function for noise
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    // Value Noise
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    // Fractal Brownian Motion (The magic behind complex textures)
    float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
        v += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 disc = vUv * 2.0 - 1.0;
        float r = length(disc);
        if (r > 1.0) discard;

        vec3 normal = normalize(vec3(disc, sqrt(1.0 - r * r)));

        // 1. Create Swirling Atmosphere
        // We warp the coordinates with noise to get that liquid motion
        vec2 p = vUv * 5.0;
        p.x += fbm(p + vec2(0.0, vUv.y * 5.0)) * 0.5; // Warp based on Y
        
        // 2. Generate Bands using the warped coordinate
        float bands = sin(p.y * 3.0 + fbm(p * 2.0) * 5.0);
        
        // 3. Color Mixing
        vec3 darkColor = uColor * 0.4;
        vec3 surfaceColor = mix(uColor, darkColor, smoothstep(-0.5, 0.5, bands));

        // 4. Lighting
        vec3 lightDir = normalize(vec3(1.0, 1.5, 1.0));
        float diff = max(dot(normal, lightDir), 0.0);
        float rim = pow(1.0 - normal.z, 4.0);

        vec3 finalColor = surfaceColor * (diff * 0.8 + 0.2) + vec3(rim * 0.3);

        float alpha = uOpacity * smoothstep(1.0, 0.95, r);
        gl_FragColor = vec4(finalColor, alpha);
    }
    `
  }), [color, size]);

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    const dist = camera.position.distanceTo(new THREE.Vector3(...position));
    const opacity = THREE.MathUtils.clamp(1 - dist / 120, 0, 1);
    meshRef.current.material.uniforms.uOpacity.value = opacity;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[materialArgs]}
        depthTest
        depthWrite={false}
      />
    </mesh>
  );
}