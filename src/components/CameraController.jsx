"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function CameraController({ isPaused, onVelocityUpdate, starDomeRef }) {
  const scroll = useRef(0);
  const velocity = useRef(0);
  const lastTouchY = useRef(0);

  const MIN_SCROLL = -20;
  const MAX_SCROLL = 20;
  const TRAVEL_MULTIPLIER = 20;
  const BASE_Z = 250;

  useEffect(() => {
    if (isPaused) return;

    const handleWheel = (e) => {
      velocity.current += e.deltaY * 0.0002;
    };

    const handleTouchStart = (e) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
    e.preventDefault();

    const touchY = e.touches[0].clientY;
    const deltaY = lastTouchY.current - touchY;

    velocity.current += deltaY * 0.0005;

    lastTouchY.current = touchY;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
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

    const targetZ = BASE_Z - scroll.current * TRAVEL_MULTIPLIER;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;

    if (starDomeRef.current) {
      starDomeRef.current.position.copy(state.camera.position);
    }
  });

  return null;
}