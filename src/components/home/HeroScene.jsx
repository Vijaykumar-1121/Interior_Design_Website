import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HeroScene = () => {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[5, 10, 5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#d4af37" />

      {/* Environment for realistic reflections */}
      <Environment preset="city" />

      <PresentationControls 
        global 
        config={{ mass: 2, tension: 500 }} 
        snap={{ mass: 4, tension: 1500 }} 
        rotation={[0, 0.3, 0]} 
        polar={[-Math.PI / 6, Math.PI / 4]} 
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group position={[0, -2, 0]}>
          
          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
          </mesh>

          {/* Back Wall */}
          <mesh position={[0, 10, -10]} receiveShadow>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
          </mesh>

          {/* Pedestal / Table */}
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Golden Art Piece / Vase */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[0, 4.5, 0]} castShadow>
              <icosahedronGeometry args={[1, 1]} />
              <MeshDistortMaterial 
                color="#d4af37" 
                envMapIntensity={2} 
                clearcoat={1} 
                clearcoatRoughness={0.1} 
                metalness={0.8} 
                roughness={0.2}
                distort={0.4}
                speed={2}
              />
            </mesh>
          </Float>

          {/* Beautiful contact shadows under the objects */}
          <ContactShadows position={[0, 0.01, 0]} opacity={0.8} scale={10} blur={2} far={4} />

        </group>
      </PresentationControls>
    </>
  );
};

export default HeroScene;
