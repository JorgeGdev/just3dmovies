import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import VideoCamera from './VideoCamera'




export default function Experience() {
  const cubeRef = useRef()
  const groupRef = useRef()


  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta / 5
    
  })

  return (
    <>
        <OrbitControls />
        <Environment preset='city' />
        <directionalLight cast position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

      <group ref={groupRef}>
        
        <VideoCamera />
      
      </group>
       
    </>
  )
}
