"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import starData from "@/data/stars.json";
import { getHorizontalCoords, getLocalLST } from "@/utils/astroMath";
import CameraController from "@/components/CameraController";
import Planet from "@/components/Planet";
import Education from "./content/Education";
import Work from "./content/Work";
import Projects from "./content/Projects";
import Awards from "./content/Awards";
import Research from "./content/Research";
import AboutMe from "./content/AboutMe";
import PlanetModal from "@/components/PlanetModal";
import Star from "@/components/Star";
import NavigationOverlay from "@/components/NavigationOverlay";
import IntroOverlay from "@/components/IntroOverlay";
import UIControls from "@/components/UIControls";
import TransmissionPanel from "@/components/TransmissionPanel";
import VoyagerDisk from "@/components/VoyagerDisc";

function Stars({ shaderRef, location }) {
  const { positions, colors, brightnesses } = useMemo(() => {
    const pos = [];
    const col = [];
    const bright = [];
    const colorObj = new THREE.Color();
    
    // Pass the user's longitude to get the accurate Local Sidereal Time
    const lst = getLocalLST(new Date(), location.lng);
    const lat = location.lat;
    
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
  }, [location]); // Recompute when location updates

  return (
    <points renderOrder={999} raycast={() => null}>
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

            float beta = clamp(uVelocity * 1.5, -0.9, 0.9);
            float shift = sqrt((1.0 + beta) / (1.0 - beta));

            vec3 baseColor = vec3(1.0);

            vec3 shiftedColor;
            if (shift > 1.0) {
                shiftedColor = vec3(
                    1.0, 
                    pow(1.0 / shift, 2.0),
                    pow(1.0 / shift, 3.0) 
                );
            } else {
                shiftedColor = vec3(
                    pow(shift, 3.0),
                    pow(shift, 2.0),
                    1.0
                );
            }

            float flare = 1.0 + abs(beta) * 3.0;
            vec3 finalCol = shiftedColor * vBrightness * flare;
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
    <group ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} raycast={null}>
      {children}
    </group>
  );
}

export default function StarField() {
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: null });
  
  // App UI State overrides
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);

  // User location state (defaults to Vancouver)
  const [location, setLocation] = useState({ lat: 49.2827, lng: -123.1207 });

  useEffect(() => {
    // Request geolocation if supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          // If the user denies access or it fails, it naturally falls back to Vancouver
          console.warn("Geolocation access denied or failed. Defaulting to Vancouver.", error);
        }
      );
    }
  }, []);

  const planetSections = {
    education: { title: "Education", component: <Education /> },
    work: { title: "Work Experience", component: <Work /> },
    projects: { title: "Projects", component: <Projects /> },
    awards: { title: "Awards", component: <Awards /> },
    research: { title: "Research", component: <Research /> },
    about: { title: "About Me", component: <AboutMe /> }
  };

  const handlePlanetClick = (type) => {
    const section = planetSections[type];
    setModalData({ 
      isOpen: true, 
      title: section.title, 
      content: section.component 
    });
  };

  const shaderRef = useRef();
  const starDomeRef = useRef();

  const handleVelocity = (v) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uVelocity.value = v;
    }
  };

  return (
    <>
      {/* Overlay UI Cluster */}
      <UIControls 
        onOpenIntro={() => setIsIntroOpen(true)} 
        onOpenTransmission={() => setIsTransmissionOpen(true)} 
      />

      {/* Intro sequence */}
      <IntroOverlay 
        isOpen={isIntroOpen} 
        onClose={() => setIsIntroOpen(false)} 
      />

      {/* Transmission Panel */}
      <TransmissionPanel 
        isOpen={isTransmissionOpen} 
        onClose={() => setIsTransmissionOpen(false)} 
      />

      <NavigationOverlay onNavigate={handlePlanetClick} />
      
      {/* 3D Scene Container */}
      <Canvas
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        camera={{ position: [0, 0, 300], fov: 75}}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <StarDome domeRef={starDomeRef}>
          <Stars shaderRef={shaderRef} location={location} />
        </StarDome>

        <Star onClick={() => handlePlanetClick("about")} />
        <VoyagerDisk /> 
        <group>
          <Planet 
            position={[22, 8, 150]} 
            color="#f97316"
            size={14} 
            hoverText="Education"
            onClick={() => handlePlanetClick("education")} 
          />

          <Planet 
            position={[-25, -10, 110]} 
            color="#ace6ee"
            size={15} 
            hoverText="Work"
            onClick={() => handlePlanetClick("work")} 
          />

          <Planet 
            position={[18, 15, 60]} 
            color="#e484eb"
            size={13} 
            hoverText="Projects"
            onClick={() => handlePlanetClick("projects")} 
          />

          <Planet 
            position={[-15, -12, 0]} 
            color="#56e694"
            size={16} 
            hoverText="Awards"
            onClick={() => handlePlanetClick("awards")} 
          />

          <Planet 
            position={[28, 5, -50]} 
            color="#f43f5e"
            size={14} 
            hoverText="Research"
            onClick={() => handlePlanetClick("research")} 
          />
        </group>

        <CameraController 
          onVelocityUpdate={handleVelocity} 
          starDomeRef={starDomeRef} 
          isPaused={modalData.isOpen || isIntroOpen || isTransmissionOpen} 
        />
      </Canvas>

      <PlanetModal 
        isOpen={modalData.isOpen} 
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        title={modalData.title}
        content={modalData.content}
      />
    </>
  );
}