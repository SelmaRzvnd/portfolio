"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

export default function Star({ position = [0, -30, 200], onClick = () => {} }) {
  const coreRef = useRef();
  const glowRef = useRef();
  const [hovered, setHover] = useState(false);

  const radius = 24;
  const glowRadius = radius * 1.15;
  const textOffset = radius;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const coreMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
        uniforms: {
        uTime: { value: 0.0 },
        uHover: { value: 0.0 },
        },
        vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        varying vec3 vPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0)
            );
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(
            dot(p0,p0), dot(p1,p1),
            dot(p2,p2), dot(p3,p3)
            ));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.5 - vec4(
            dot(x0,x0), dot(x1,x1),
            dot(x2,x2), dot(x3,x3)
            ), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(
            dot(p0,x0), dot(p1,x1),
            dot(p2,x2), dot(p3,x3)
            ));
        }

        float fbm(vec3 x) {
            float v = 0.0;
            float a = 0.5;
            vec3 shift = vec3(100.0);
            for (int i = 0; i < 4; ++i) {
            v += a * snoise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
            }
            return v;
        }

        void main() {
            float noise = fbm(vPosition * 0.4 + uTime * 0.15);
            float edge = dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
            noise *= 0.8 + 0.2 * edge;
            vec3 colorDark = vec3(0.9, 0.3, 0.0);
            vec3 colorLight = vec3(1.0, 0.9, 0.6);

            vec3 finalColor = mix(colorDark, colorLight, noise + 0.3);

            finalColor += uHover * 0.25;

            gl_FragColor = vec4(finalColor, 1.0);
        }
        `,
    });
    }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uHover: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = - (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform float uHover;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          float intensity = pow(max(0.0, 0.7 - dot(normal, viewDir)), 3.0);

          vec3 glowColor = vec3(1.0, 0.6, 0.1);
          glowColor += uHover * 0.3;

          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
      transparent: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (coreRef.current?.material?.uniforms) {
      coreRef.current.material.uniforms.uTime.value =
        state.clock.getElapsedTime();

      coreRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
        coreRef.current.material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );

      coreRef.current.rotation.y += 0.001;
    }

    if (glowRef.current?.material?.uniforms) {
      glowRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
        glowRef.current.material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  useEffect(() => {
    return () => {
      coreMaterial.dispose();
      glowMaterial.dispose();
    };
  }, [coreMaterial, glowMaterial]);

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
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <primitive object={coreMaterial} attach="material" />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[glowRadius, 64, 64]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      { hovered && 
        <Billboard position={[0, 5, textOffset]}>
        <Text
          fontSize={radius * 0.25}
          color="#080808"
          anchorX="center"
          anchorY="middle"
          outlineWidth={radius * 0.002}
          outlineColor="#ff1e00"
        >
          About Me
        </Text>
      </Billboard>
    }
    </group>
  );
}