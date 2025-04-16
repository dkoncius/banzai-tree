import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BanzaiTree from './components/BanzaiTree';
import TreeControls from './components/TreeControls';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';

const themes = [
  { name: 'default', color: '#b499e4' },
  { name: 'autumn', color: '#e67e22' },
  { name: 'spring', color: '#f48fb1' },
  { name: 'winter', color: '#90caf9' },
  { name: 'purple', color: '#9575cd' }
];

function FallbackComponent({ error }) {
  return (
    <div style={{ margin: '2rem', padding: '2rem', background: '#f8d7da', color: '#721c24', borderRadius: '0.25rem' }}>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <div>
        <h3>Unable to load 3D model</h3>
        <p>Please check the console for more details.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [treeColor, setTreeColor] = useState(0);
  const [cameraDistance, setCameraDistance] = useState(5);
  const [currentTheme, setCurrentTheme] = useState(themes[0].name);
  
  const handleColorChange = (colorIndex) => {
    setTreeColor(colorIndex);
    setCurrentTheme(themes[colorIndex].name);
  };
  
  const handleZoom = (direction) => {
    const newDistance = cameraDistance + direction * 2;
    if (newDistance >= 5 && newDistance <= 25) {
      setCameraDistance(newDistance);
    }
  };

  // Apply theme class on initial load and when theme changes
  useEffect(() => {
    // Remove all theme classes first
    themes.forEach(theme => {
      document.body.classList.remove(`theme-${theme.name}`);
    });
    
    // Add current theme class
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);
  
  // Apply default theme on mount
  useEffect(() => {
    document.body.classList.add(`theme-${themes[0].name}`);
    
    return () => {
      // Cleanup on unmount
      themes.forEach(theme => {
        document.body.classList.remove(`theme-${theme.name}`);
      });
    };
  }, []);
  
  return (
    <div className="app-container">
      <div className="project-info">
        <div>
          <span>Project:</span>
          BANZAI TREE
        </div>
        <div>
          <span>Services:</span>
          INTERACTIVE DESIGN
        </div>
        <div>
          <span>Type of project:</span>
          NATURE VISUALIZATION
        </div>
      </div>
      
      <h1 className="project-title">banzai·tree</h1>
      
      <div className="main-content">
        <div className="tablet-container">
          <div className="tablet-content">
            <div className="tablet-header">
              <div className="tablet-logo">banzai.tree</div>
              <div className="tablet-nav">
                <div className="tablet-nav-item">Services</div>
                <div className="tablet-nav-item">Treatment</div>
                <div className="tablet-nav-item">Blog</div>
                <div className="tablet-nav-item">About us</div>
              </div>
              <button className="tablet-contact">Contact us</button>
            </div>
            
            <div className="tablet-main">
              <div className="tablet-text">
                <h2 className="tablet-headline">Embark on your nature journey with professionals</h2>
                <div className="ready-badge">Ready to help</div>
                
                <p className="tablet-description">
                  Welcome to banzai.tree, your gateway to improved connection with nature. We're here to help you cultivate a stronger, more resilient relationship with the natural world.
                </p>
                
                <TreeControls 
                  activeColor={treeColor}
                  onColorChange={handleColorChange}
                  onZoomIn={() => handleZoom(-1)}
                  onZoomOut={() => handleZoom(1)}
                />
                
                <div className="action-buttons">
                  <button className="start-button">Start Growth</button>
                  <button className="watch-button">Watch review</button>
                </div>
              </div>
              
              <div className="scene-container">
                <ErrorBoundary FallbackComponent={FallbackComponent}>
                  <Canvas
                    camera={{
                      position: [0, 0, cameraDistance],
                      fov: 25
                    }}
                    shadows
                    gl={{
                      antialias: true,
                      powerPreference: "high-performance"
                    }}
                  >
                    <color attach="background" args={['#ffffff00']} />
                    <ambientLight intensity={0.4} />
                    <directionalLight
                      position={[5, 8, 7.5]}
                      intensity={0.8}
                      castShadow
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                      shadow-camera-far={50}
                      shadow-camera-left={-10}
                      shadow-camera-right={10}
                      shadow-camera-top={10}
                      shadow-camera-bottom={-10}
                    />
                    <pointLight
                      position={[-3, 2, -3]}
                      intensity={1}
                      color={themes[treeColor].color}
                    />
                    <Suspense fallback={null}>
                      <BanzaiTree castShadow receiveShadow />
                    </Suspense>
                    <OrbitControls
                      enableZoom={true}
                      enablePan={false}
                      enableRotate={true}
                      minDistance={5}
                      maxDistance={25}
                      minPolarAngle={0}
                      maxPolarAngle={Math.PI / 2}
                    />
                  </Canvas>
                </ErrorBoundary>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'white', padding: '5px', borderRadius: '3px' }}>
                  Banzai Tree - Vercel Deployment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="credits">
        Design inspired by <a href="https://dribbble.com/shots/22786757-Cogni-wave-Web-Design-for-Mental-Health-Websites" target="_blank" rel="noopener noreferrer">Cogni:wave</a> by <a href="https://dribbble.com/phenomenon" target="_blank" rel="noopener noreferrer">Phenomenon Studio</a>
        <br />
        Ghibli shader from <a href="https://github.com/craftzdog/ghibli-style-shader" target="_blank" rel="noopener noreferrer">craftzdog/ghibli-style-shader</a>
      </div>
    </div>
  );
} 