import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';

export default function BanzaiTree({ 
  color = '#b499e4',
  size = 0.8,
  shape = 'box',
  isSpinning = true
}) {
  const group = useRef();
  
  // Animation
  useFrame((state, delta) => {
    if (group.current && isSpinning) {
      group.current.rotation.y += delta * 0.5; // Rotate at 0.5 radians per second
    }
  });

  // Render different geometric shapes based on the shape prop
  const renderShape = () => {
    switch(shape) {
      case 'sphere':
        return <sphereGeometry args={[size * 0.7, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[size * 0.5, size * 0.5, size, 32]} />;
      case 'torus':
        return <torusGeometry args={[size * 0.5, size * 0.2, 16, 32]} />;
      case 'box':
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  };

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow>
        {renderShape()}
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
} 