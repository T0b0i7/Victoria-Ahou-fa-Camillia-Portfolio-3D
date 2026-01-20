import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

const RotatingMeshes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.015;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= 0.005;
      torusRef.current.rotation.z += 0.01;
    }
  });

  return (
    <>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Rotating cube */}
      <mesh 
        ref={boxRef}
        scale={isMobile ? 1.5 : 2} 
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#915EFF" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Rotating torus */}
      <mesh 
        ref={torusRef}
        scale={isMobile ? 1 : 1.2} 
        position={[0, 0, 0]}
      >
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </>
  );
};

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <RotatingMeshes isMobile={isMobile} />
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </>
  );
};

export default ComputersCanvas;
