import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const boxGeometry = new THREE.BoxGeometry(5.046, 8.265, 1.1);

export default function Level({ textureUrl }) {
  const apiTexture = useLoader(THREE.TextureLoader, textureUrl);
  const localTexture = useLoader(THREE.TextureLoader, './models/foto1.jpg');
  

  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta / 5;
    groupRef.current.rotation.z += delta / 30;
  });

  // Crear un array de materiales
  const materials = [
    new THREE.MeshStandardMaterial({ map: localTexture, side: THREE.DoubleSide }), // cara 1
    new THREE.MeshStandardMaterial({ color: "#222222", side: THREE.DoubleSide }), // cara 2
    new THREE.MeshStandardMaterial({ map: localTexture, side: THREE.DoubleSide }), // cara 3
    new THREE.MeshStandardMaterial({ map: localTexture, side: THREE.DoubleSide }), // cara 4
    new THREE.MeshStandardMaterial({ map: apiTexture, side: THREE.DoubleSide }), // cara 5
    new THREE.MeshStandardMaterial({ map: apiTexture, side: THREE.DoubleSide })        // cara 6 con la textura
  ];

  useEffect(() => {
    
    return () => {

      boxGeometry.dispose();
      materials.forEach(material => material.dispose());
    };
  }, []);

  return (
    <>
      <OrbitControls enableZoom={false} />
      <directionalLight cast  intensity={5.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh geometry={boxGeometry} material={materials} scale={0.65} rotation-y={2} />
      </group>
    </>
  );
}
