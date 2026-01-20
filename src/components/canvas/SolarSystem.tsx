import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../../constants';

interface PlanetProps {
  project: typeof projects[0];
  index: number;
  radius: number;
  speed: number;
  onClick: (project: typeof projects[0]) => void;
  isSelected: boolean;
}

const Planet: React.FC<PlanetProps> = ({ project, index, radius, speed, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const angle = time * speed + (index * Math.PI * 2) / projects.length;
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.rotation.y += 0.01;
      
      // Effet de pulsation quand survolé ou sélectionné
      const scale = hovered || isSelected ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  const colors = ['#915EFF', '#00d4ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#ff69b4'];
  const color = colors[index % colors.length];

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick(project);
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
      {(hovered || isSelected) && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>
      )}
    </mesh>
  );
};

interface SunProps {}

const Sun: React.FC<SunProps> = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      // Effet de respiration
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Anneaux autour du soleil */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <ringGeometry args={[2, 2.2, 64]} />
        <meshStandardMaterial 
          color="#ffed4e"
          emissive="#ffed4e"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

interface SolarSystemProps {
  onProjectSelect: (project: typeof projects[0] | null) => void;
  selectedProject: typeof projects[0] | null;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onProjectSelect, selectedProject }) => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <Sun />
      
      {projects.map((project, index) => (
        <Planet
          key={project.name}
          project={project}
          index={index}
          radius={3 + index * 0.8}
          speed={0.2 / (index + 1)}
          onClick={onProjectSelect}
          isSelected={selectedProject?.name === project.name}
        />
      ))}
      
      {/* Orbites visuelles */}
      {projects.map((_, index) => (
        <mesh key={`orbit-${index}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3 + index * 0.8, 3.05 + index * 0.8, 64]} />
          <meshBasicMaterial 
            color="#ffffff" 
            opacity={0.1} 
            transparent 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default SolarSystem;
