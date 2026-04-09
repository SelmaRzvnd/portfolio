"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// travelRef shape: { target: THREE.Vector3, onArrival: fn } | null
export default function CameraController({ isPaused, onVelocityUpdate, starDomeRef, travelRef }) {
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
      // Cancel travel if user scrolls manually
      if (travelRef?.current) travelRef.current = null;
      velocity.current += e.deltaY * 0.0002;
    };

    const handleTouchStart = (e) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (travelRef?.current) travelRef.current = null;
      const deltaY = lastTouchY.current - e.touches[0].clientY;
      velocity.current += deltaY * 0.001;
      lastTouchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isPaused, travelRef]);

  useFrame((state) => {
    // ── Travel mode ──────────────────────────────────────────
    if (travelRef?.current) {
      const { target, onArrival } = travelRef.current;

      state.camera.position.lerp(target, 0.05);

      if (starDomeRef?.current) {
        starDomeRef.current.position.copy(state.camera.position);
      }

      if (Math.abs(state.camera.position.z - target.z) < 15) {
        travelRef.current = null;
        velocity.current = 0;
        scroll.current = (BASE_Z - state.camera.position.z) / TRAVEL_MULTIPLIER;
        onArrival?.();
      }

      onVelocityUpdate(0);
      return; // skip normal scroll logic while traveling
    }

    // ── Normal scroll mode ───────────────────────────────────
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

    if (starDomeRef?.current) {
      starDomeRef.current.position.copy(state.camera.position);
    }
  });

  return null;
}