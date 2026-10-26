"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { findProduct } from "@/lib/data";
import type { Product } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*                              Label generation                              */
/* -------------------------------------------------------------------------- */

function wrapLabelName(name: string): string[] {
  const words = name.replace(/\s+/g, " ").split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) current = word;
    else if (`${current} ${word}`.length <= 15) current = `${current} ${word}`;
    else {
      lines.push(current);
      current = word;
    }
    if (lines.length === 2) break;
  }
  if (lines.length < 2 && current) lines.push(current);
  return lines.slice(0, 2);
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function useLabelTexture(product: Product) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 560;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const lines = wrapLabelName(product.name);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    roundedRect(ctx, 8, 8, canvas.width - 16, canvas.height - 16, 34);
    ctx.fillStyle = product.labelColor;
    ctx.fill();

    ctx.strokeStyle = "rgba(74,21,37,0.14)";
    ctx.lineWidth = 3;
    roundedRect(ctx, 22, 22, canvas.width - 44, canvas.height - 44, 24);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = product.lidColor;

    ctx.font = "600 46px Georgia, 'Times New Roman', serif";
    ctx.fillText("Nutriiva", canvas.width / 2, 104);

    ctx.strokeStyle = "rgba(216,27,96,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 56, 128);
    ctx.lineTo(canvas.width / 2 + 56, 128);
    ctx.stroke();

    ctx.font = "600 34px Georgia, 'Times New Roman', serif";
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, 188 + index * 44);
    });

    ctx.font = "500 15px Helvetica, Arial, sans-serif";
    ctx.fillStyle = "rgba(74,21,37,0.55)";
    ctx.fillText(product.flavor.toUpperCase(), canvas.width / 2, 300);

    ctx.strokeStyle = "rgba(74,21,37,0.13)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 90, 328);
    ctx.lineTo(canvas.width / 2 + 90, 328);
    ctx.stroke();

    ctx.font = "500 13px Helvetica, Arial, sans-serif";
    ctx.fillStyle = "rgba(74,21,37,0.42)";
    ctx.fillText("DIETARY SUPPLEMENT", canvas.width / 2, 360);
    ctx.fillText("30 SERVINGS", canvas.width / 2, 380);

    const label = new THREE.CanvasTexture(canvas);
    label.colorSpace = THREE.SRGBColorSpace;
    label.anisotropy = 8;
    return label;
  }, [product]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

/* -------------------------------------------------------------------------- */
/*                                   Shaders                                  */
/* -------------------------------------------------------------------------- */

function AuraBackdrop() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#FFF9FA") },
      uColorB: { value: new THREE.Color("#F7BFD2") },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 2.1, -3.6]} scale={[13, 9, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          void main() {
            vec2 p = (vUv - 0.5) * vec2(1.55, 1.0);
            float d = length(p);
            float glow = smoothstep(0.62, 0.02, d);
            float pulse = 0.94 + 0.06 * sin(uTime * 0.5 + d * 4.0);
            vec3 color = mix(uColorB, uColorA, glow) * pulse;
            float grain = hash(vUv * 380.0 + uTime * 0.015);
            color += (grain - 0.5) * 0.028;
            float alpha = smoothstep(0.8, 0.1, d) * 0.92;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Jar                                     */
/* -------------------------------------------------------------------------- */

const labelArc = 1.36;

function JarModel({
  product,
  position,
  scale,
  speed,
  initialRotation = 0,
}: {
  product: Product;
  position: [number, number, number];
  scale: number;
  speed: number;
  initialRotation?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const texture = useLabelTexture(product);

  const bodyPoints = useMemo(
    () =>
      [
        [0.001, 0],
        [0.76, 0],
        [0.94, 0.1],
        [1.0, 0.24],
        [1.0, 1.2],
        [0.95, 1.38],
        [0.86, 1.45],
        [0.86, 1.54],
        [0.001, 1.54],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * speed;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.18} floatingRange={[0, 0.08]}>
      <group ref={group} position={position} scale={scale}>
        <group rotation={[0, initialRotation, 0]}>
          {/* Glass jar body */}
          <mesh castShadow receiveShadow>
            <latheGeometry args={[bodyPoints, 64]} />
            <meshPhysicalMaterial
              color={product.accentTo}
              roughness={0.26}
              metalness={0.02}
              clearcoat={1}
              clearcoatRoughness={0.22}
              sheen={0.35}
              sheenColor={product.accentFrom}
            />
          </mesh>

          {/* Soft inner glow visible at the shoulder */}
          <mesh position={[0, 1.18, 0]} castShadow>
            <cylinderGeometry args={[0.935, 0.955, 0.16, 48]} />
            <meshStandardMaterial color={product.accentFrom} roughness={0.5} />
          </mesh>

          {/* Label wrapped around the front */}
          <mesh position={[0, 0.77, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.012, 1.012, 1.0, 96, 1, true, -labelArc / 2, labelArc]} />
            {texture ? (
              <meshStandardMaterial
                map={texture}
                transparent
                roughness={0.52}
                metalness={0}
                polygonOffset
                polygonOffsetFactor={-4}
                polygonOffsetUnits={-4}
                side={THREE.FrontSide}
              />
            ) : (
              <meshStandardMaterial color={product.labelColor} roughness={0.6} />
            )}
          </mesh>

          {/* Lid */}
          <mesh position={[0, 1.69, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.885, 0.9, 0.32, 64]} />
            <meshPhysicalMaterial
              color={product.lidColor}
              roughness={0.34}
              metalness={0.08}
              clearcoat={0.7}
              clearcoatRoughness={0.3}
            />
          </mesh>
          <mesh position={[0, 1.855, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.865, 0.022, 16, 64]} />
            <meshStandardMaterial color={product.accentFrom} roughness={0.32} metalness={0.45} />
          </mesh>
          <mesh position={[0, 1.858, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.86, 48]} />
            <meshStandardMaterial color={product.lidColor} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Podiums                                   */
/* -------------------------------------------------------------------------- */

function GoldRing({ y, radius }: { y: number; radius: number }) {
  return (
    <mesh position={[0, y + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 8, 96]} />
      <meshStandardMaterial color="#E4C59E" roughness={0.25} metalness={0.8} />
    </mesh>
  );
}

function Podiums() {
  return (
    <group>
      {/* Wide base tier */}
      <mesh position={[0, 0.16, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.08, 3.14, 0.32, 96]} />
        <meshStandardMaterial color="#F7E3E4" roughness={0.68} />
      </mesh>
      <GoldRing y={0.322} radius={3.04} />

      {/* Central tier */}
      <mesh position={[0.05, 0.9, 0.3]} receiveShadow castShadow>
        <cylinderGeometry args={[1.32, 1.36, 1.16, 96]} />
        <meshStandardMaterial color="#F3C8D6" roughness={0.55} />
      </mesh>
      <GoldRing y={1.48} radius={1.29} />

      {/* Left tier */}
      <mesh position={[-1.78, 0.6, 0.55]} receiveShadow castShadow>
        <cylinderGeometry args={[0.8, 0.83, 0.56, 80]} />
        <meshStandardMaterial color="#FBE7E1" roughness={0.6} />
      </mesh>
      <GoldRing y={0.882} radius={0.78} />

      {/* Right tier */}
      <mesh position={[1.78, 0.46, 0.1]} receiveShadow castShadow>
        <cylinderGeometry args={[0.74, 0.77, 0.36, 80]} />
        <meshStandardMaterial color="#F8D6E1" roughness={0.6} />
      </mesh>
      <GoldRing y={0.642} radius={0.72} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Camera                                    */
/* -------------------------------------------------------------------------- */

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const zoom = size.width < 400 ? 11.2 : size.width < 640 ? 9.6 : 8.15;
    camera.position.set(0, 2.15, zoom);
    camera.lookAt(0, 1.62, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function SceneContents() {
  const group = useRef<THREE.Group>(null);
  const metaglow = findProduct("metaglow-fat-burn");
  const greens = findProduct("gut-reset-greens");
  const collagen = findProduct("collagen-glow");

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.16,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.045,
      2.2,
      delta,
    );
  });

  if (!metaglow || !greens || !collagen) return null;

  return (
    <>
      <ResponsiveCamera />
      <AuraBackdrop />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#FFF6F8", "#D9B8C4", 0.55]} />
      <directionalLight
        position={[4.5, 7, 5]}
        intensity={2.4}
        color="#FFF6EE"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-4.5, 3.4, 3]} intensity={16} color="#FFB6D0" distance={12} decay={2} />
      <pointLight position={[4.4, 2.2, 2.6]} intensity={12} color="#FFD7B8" distance={11} decay={2} />
      <spotLight position={[0, 6.5, -3]} intensity={18} angle={0.7} penumbra={1} color="#FFE9F1" />

      <group ref={group}>
        <Podiums />

        <JarModel
          product={metaglow}
          position={[0.05, 1.49, 0.3]}
          scale={0.98}
          speed={0.24}
          initialRotation={0.2}
        />
        <JarModel
          product={greens}
          position={[-1.78, 0.89, 0.55]}
          scale={0.76}
          speed={0.34}
          initialRotation={-0.5}
        />
        <JarModel
          product={collagen}
          position={[1.78, 0.65, 0.1]}
          scale={0.7}
          speed={0.42}
          initialRotation={0.8}
        />

        {/* Floating brand props */}
        <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.5} floatingRange={[-0.1, 0.2]}>
          <mesh position={[-2.5, 2.85, 0.4]} rotation={[0.4, 0.6, 0.2]}>
            <torusGeometry args={[0.24, 0.055, 20, 64]} />
            <meshStandardMaterial
              color="#E4C59E"
              roughness={0.25}
              metalness={0.85}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6} floatingRange={[-0.1, 0.25]}>
          <mesh position={[2.55, 3.1, -0.4]}>
            <icosahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color="#D81B60" roughness={0.3} metalness={0.1} />
          </mesh>
        </Float>

        <Sparkles count={26} scale={[6.6, 4.4, 3.2]} size={2.2} speed={0.25} color="#C94C7C" opacity={0.32} />
      </group>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.34}
        scale={13}
        blur={2.6}
        far={5}
        resolution={512}
        color="#4A1525"
        frames={1}
      />
    </>
  );
}

export default function JarScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.15, 8.15], fov: 33, near: 0.1, far: 60 }}
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
