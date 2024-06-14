// TrailerExperience.jsx
import React from 'react';
import { Html, ContactShadows, PresentationControls, Float, Center, Environment } from '@react-three/drei';
import Television from './Television.jsx';

export default function TrailerExperience({ videoId }) {
  return (
    <>
      <Environment preset='city' />
      <directionalLight cast position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 4, tension: 400 }}
        snap={{ mass: 8, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight width={2.2} height={1.65} intensity={65} color={"red"} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, 1.15]} />
          <Center>
            <Television videoId={videoId} />
          </Center>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
