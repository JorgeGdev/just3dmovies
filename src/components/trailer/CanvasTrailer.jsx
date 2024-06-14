// CanvasTrailer.jsx
import { Canvas } from '@react-three/fiber';
import TrailerExperience from './TrailerExperience.jsx';

export default function CanvasTrailer({ videoId }) {
  return (
    <Canvas 
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
      }}
    >
      <TrailerExperience videoId={videoId} />
    </Canvas>
  );
}
