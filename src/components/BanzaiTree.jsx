import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function BanzaiTree() {
  const group = useRef();
  const { scene } = useGLTF('/models/old_tree.glb');
  
  // Preload the model
  useGLTF.preload('/models/old_tree.glb');

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