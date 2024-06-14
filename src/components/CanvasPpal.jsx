import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function CanvasPpal() {
  return (
    <Canvas 
    
    camera={{
      fov:55,
      near: 0.1,
      far: 200,
      position:[3,2,6]
    }} >

      <Experience />
        
    </Canvas>
   
  );
}




