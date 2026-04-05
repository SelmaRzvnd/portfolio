"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet({ position, color = "#4f46e5", size = 5 }) {
  const meshRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    const dist = camera.position.distanceTo(meshRef.current.position);
    const opacity = THREE.MathUtils.clamp(1 - dist / 120, 0, 1);

    meshRef.current.material.opacity = opacity;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
        <meshBasicMaterial
        color={color}
        transparent
        opacity={1}
        />
    </mesh>
  );
}