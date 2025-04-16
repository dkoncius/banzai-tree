import { useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BanzaiTree() {
  const group = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Try to load the model with error handling
  let scene = null;
  try {
    const result = useGLTF('/models/old_tree.glb');
    scene = result.scene;
    
    useEffect(() => {
      setModelLoaded(true);
    }, []);
  } catch (err) {
    useEffect(() => {
      console.error("Error loading model:", err);
      setError(err);
    }, []);
  }
  
  // Animation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Rotate at 0.5 radians per second
    }
  });

  // If there's an error, show a simple cube instead
  if (error) {
    return (
      <group ref={group}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group} position={[0, 0, 0]}>
      {scene && <primitive object={scene} />}
    </group>
  );
} 