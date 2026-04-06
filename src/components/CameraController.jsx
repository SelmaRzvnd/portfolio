"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function CameraController({ isPaused, onVelocityUpdate, starDomeRef }) {
  const scroll = useRef(0);
  const velocity = useRef(0);

  const MIN_SCROLL = -20; 
  const MAX_SCROLL = 20;  
  const TRAVEL_MULTIPLIER = 20; 
  const BASE_Z = 250; 

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
    
    // Clamp the scroll values
    if (nextScroll <= MIN_SCROLL) {
      nextScroll = MIN_SCROLL;
      velocity.current = 0; 
    } else if (nextScroll >= MAX_SCROLL) {
      nextScroll = MAX_SCROLL;
      velocity.current = 0;
    }

    scroll.current = nextScroll;
    velocity.current *= 0.95; // Friction

    onVelocityUpdate(velocity.current);

    // Apply the multiplier and the base offset
    const targetZ = BASE_Z - (scroll.current * TRAVEL_MULTIPLIER);
    
    // Smoothly interpolate the camera to the target Z
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;

    // Keep the star dome centered on the camera
    if (starDomeRef.current) {
      starDomeRef.current.position.copy(state.camera.position);
    }
  });

  return null;
}