import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Import the model URL
const MODEL_URL = new URL('/models/old_tree.glb', import.meta.url).href;

export default function BanzaiTree() {
  const group = useRef();
  const { scene } = useGLTF(MODEL_URL);
  
  // Preload the model
  useGLTF.preload(MODEL_URL);

  // Animation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Rotate at 0.5 radians per second
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
} 