import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function BanzaiTree() {
  const group = useRef();
  const modelPath = import.meta.env.PROD ? './old_tree.glb' : '/old_tree.glb';
  const { scene } = useGLTF(modelPath);
  
  // Preload the model
  useGLTF.preload(modelPath);

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