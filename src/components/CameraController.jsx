"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraController({isPaused, onVelocityUpdate, starDomeRef }) {
  const scroll = useRef(0);
  const velocity = useRef(0);

  const MIN_SCROLL = -20; // How far "up" they can go
  const MAX_SCROLL = 20; // How far "down" they can go

  useEffect(() => {
    const handleWheel = (e) => {
      if (isPaused) return; 

      velocity.current += e.deltaY * 0.0002;
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isPaused]);

    useFrame((state) => {
    let nextScroll = scroll.current + velocity.current;
    if (nextScroll <= MIN_SCROLL) {
        nextScroll = MIN_SCROLL;
        velocity.current = 0; 
    } else if (nextScroll >= MAX_SCROLL) {
        nextScroll = MAX_SCROLL;
        velocity.current = 0;
    }

    scroll.current = nextScroll;
        velocity.current *= 0.95; 

    onVelocityUpdate(velocity.current);

    const targetZ = -scroll.current * 20;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;

    if (starDomeRef.current) {
        starDomeRef.current.position.copy(state.camera.position);
    }
    });

  return null;
}