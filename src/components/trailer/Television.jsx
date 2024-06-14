// Television.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import YouTube from 'react-youtube';
import "./trailerstyle.css";

export default function Television({ videoId }) {
  const model = useLoader(GLTFLoader, './models/television.glb');

  const opts = {
    height: '200',
    width: '300',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <primitive scale={5} position-y={-2} object={model.scene}>
        <Html
          transform
          wrapperClass='htmlScreen'
          distanceFactor={0.4}
          position={[-0.10, 0.34, 0]}
        >
          <div className='youtube-container'>
          {videoId ? <YouTube videoId={videoId} opts={opts} /> : <p className='tvTitle'>Select a trailer</p>}
          </div>
        </Html>
      </primitive>
    </>
  );
}
