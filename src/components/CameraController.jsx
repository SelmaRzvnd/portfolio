"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraController({ onVelocityUpdate, starDomeRef }) {
  const scroll = useRef(0);
  const velocity = useRef(0);

  const MIN_SCROLL = -5; // How far "up" they can go
  const MAX_SCROLL = 5; // How far "down" they can go

  useEffect(() => {
    const handleWheel = (e) => {
      velocity.current += e.deltaY * 0.0002;
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((state) => {
    // 1. Apply velocity and CLAMP the scroll so they can't go too far
    scroll.current = THREE.MathUtils.clamp(
      scroll.current + velocity.current,
      MIN_SCROLL,
      MAX_SCROLL
    );
    
    velocity.current *= 0.9;
    onVelocityUpdate(velocity.current);

    // 2. Move the camera
    const targetZ = -scroll.current * 20;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;

    // 3. IMMEDIATELY sync the stars to the camera position in the same frame
    if (starDomeRef.current) {
      starDomeRef.current.position.copy(state.camera.position);
      starDomeRef.current.rotation.z += 0.00002;
    }
  });

  return null;
}