import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



export default function VideoCamera() {
  const model = useLoader(GLTFLoader, './models/videocamera.glb');  
  
  return (
    <>
      <primitive scale={1.3} position-y={-1.5} object={model.scene} />
    </>
  );
}
