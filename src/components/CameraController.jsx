"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function CameraController() {
  const scroll = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      velocity.current += e.deltaY * 0.0002; // scroll sensitivity
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((state) => {
    // apply velocity
    scroll.current += velocity.current;
    velocity.current *= 0.9;

    // move camera
    const targetZ = -scroll.current * 20;

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
  });

  return null;
}