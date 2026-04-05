"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

export default function Planet({ position, color = "#4f46e5", size = 5, hoverText = "Planet", onClick }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  const materialArgs = useMemo(() => {
    const baseColor = new THREE.Color(color);
    
    return {
      uniforms: {
        uColor: { value: baseColor },
        uDeepColor: { value: baseColor.clone().multiplyScalar(0.1).add(new THREE.Color(0x110022)) },
        uHighlightColor: { value: baseColor.clone().add(new THREE.Color(0x444444)) },
        uOpacity: { value: 1.0 },
        uHover: { value: 0.0 },
        uTime: { value: 0.0 }
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

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0; float amp = 0.5;
          for (int i = 0; i < 6; i++) {
            v += amp * noise(p);
            p *= 2.1; amp *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 disc = uv * 2.0 - 1.0;
          float r = length(disc);
          if (r > 1.0) discard;

          vec2 q = vec2(fbm(uv * 2.5 + uTime * 0.02), fbm(uv * 3.0));
          vec2 warp = vec2(fbm(uv * 1.5 + 5.0 * q + uTime * 0.05));
          float pattern = fbm(uv * 3.0 + 4.0 * warp);

          vec3 col = mix(uDeepColor, uColor, smoothstep(0.0, 0.4, pattern));
          col = mix(col, uHighlightColor, smoothstep(0.4, 0.7, pattern));
          col = mix(col, vec3(1.0), smoothstep(0.7, 1.0, pattern));

          vec3 normal = normalize(vec3(disc, sqrt(1.0 - r * r)));
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float diff = max(dot(normal, lightDir), 0.0);
          float rim = pow(1.0 - normal.z, 3.5);
          
          vec3 finalColor = col * (diff * 0.8 + 0.3) + (rim * 0.4);
          finalColor += uHover * 0.2;

          gl_FragColor = vec4(finalColor, uOpacity * smoothstep(1.0, 0.98, r));
        }
      `,
    };
  }, [color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.quaternion.copy(state.camera.quaternion);

    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    const dist = state.camera.position.distanceTo(new THREE.Vector3(...position));
    meshRef.current.material.uniforms.uOpacity.value = THREE.MathUtils.clamp(1 - dist / 150, 0, 1);
    meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
      meshRef.current.material.uniforms.uHover.value, hovered ? 1.0 : 0.0, 0.1
    );
  });

  return (
  <group
    position={position}
    onClick={(e) => { 
      e.stopPropagation(); 
      onClick(); 
    }}
    onPointerOver={(e) => { 
      e.stopPropagation(); 
      setHover(true); 
    }}
    onPointerOut={() => setHover(false)}
  >
    <mesh ref={meshRef} scale={[size, size, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        args={[materialArgs]} 
        transparent 
        depthWrite={true} 
      />
    </mesh>

    {hovered && (
      <Billboard 
        position={[0, 0, 0]}
      >
        <Text
          fontSize={size * 0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={size * 0.015}
          outlineColor={color}
          maxWidth={size * 1.2}
          letterSpacing={0.02}
        >
          {hoverText}
        </Text>
      </Billboard>
    )}
  </group>
);
}