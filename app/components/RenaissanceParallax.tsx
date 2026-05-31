"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// Renaissance-style floating particles (dust motes in museum light)
function DustParticles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      const y = p.position[1] + Math.sin(time * p.speed + p.phase) * 0.5;
      const x = p.position[0] + Math.cos(time * p.speed * 0.7 + p.phase) * 0.2;
      dummy.position.set(x, y, p.position[2]);
      dummy.scale.setScalar(0.01 + Math.sin(time + p.phase) * 0.005);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#c6a76a"
        emissive="#c6a76a"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

// Renaissance painting frame with depth layers
function PaintingFrame() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle breathing animation
    groupRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.01);
  });

  return (
    <group ref={groupRef}>
      {/* Outer ornate frame */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[4.2, 5.8, 0.15]} />
        <meshStandardMaterial
          color="#8B7355"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Inner gold frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.8, 5.4, 0.1]} />
        <meshStandardMaterial
          color="#c6a76a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Canvas area (dark background) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 5.1, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Central marble bust (simplified 3D representation)
function MarbleBust() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Gentle floating
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Head (sphere) */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        
        {/* Shoulders/Torso */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.5]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        
        {/* Pedestal */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
          <meshStandardMaterial
            color="#c6a76a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Renaissance-style light rays
function LightRays() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 2, -3]} rotation={[0, 0, 0.2]}>
      <planeGeometry args={[8, 12]} />
      <meshBasicMaterial
        color="#c6a76a"
        transparent
        opacity={0.03}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Museum-style lighting */}
      <ambientLight intensity={0.3} color="#f5e6c8" />
      <directionalLight
        position={[2, 4, 3]}
        intensity={1.2}
        color="#f5e6c8"
        castShadow
      />
      <pointLight
        position={[-2, 3, 2]}
        intensity={0.8}
        color="#c6a76a"
        distance={10}
      />
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#ffffff"
      />
      
      {/* Painting frame */}
      <PaintingFrame />
      
      {/* Marble bust */}
      <MarbleBust />
      
      {/* Dust particles */}
      <DustParticles count={150} />
      
      {/* Light rays */}
      <LightRays />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
    </>
  );
}

// Mouse-tracking parallax layer
function MouseParallaxLayer({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    const { pointer } = state;
    // Subtle camera movement based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.2, 0.05);
    camera.lookAt(0, 1, 0);
  });

  return <>{children}</>;
}

// Main export component
export function RenaissanceParallax() {
  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <MouseParallaxLayer>
          <Scene />
        </MouseParallaxLayer>
      </Canvas>
      
      {/* 2D Overlay for text and effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)',
          }}
        />
        
        {/* Scan lines for vintage effect */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(198,167,106,0.1) 2px, rgba(198,167,106,0.1) 4px)',
          }}
        />
      </div>
    </div>
  );
}
