import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface QuantumPortalProps {
  experience: {
    title: string;
    companyName: string;
    date: string;
    points: string[];
  };
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

const QuantumPortal: React.FC<QuantumPortalProps> = ({ experience, position, isActive, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Rotation du portail
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      // Effet de distorsion quantique
      const scale = isActive ? 1.2 + Math.sin(time * 4) * 0.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    
    if (portalRef.current) {
      // Effet de vortex
      portalRef.current.rotation.z = time * 2;
      const material = portalRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={handleClick}>
        <ringGeometry args={[1, 1.5, 32]} />
        <meshStandardMaterial
          color={isActive ? '#00d4ff' : '#915EFF'}
          emissive={isActive ? '#00d4ff' : '#915EFF'}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Effet de vortex intérieur */}
      <mesh ref={portalRef}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial
          color="#ff6b6b"
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Particules quantiques autour du portail */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffd700" />
          </mesh>
        );
      })}
      
      {isActive && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {experience.title}
        </Text>
      )}
    </group>
  );
};

interface TimelineProps {
  experiences: Array<{
    title: string;
    companyName: string;
    date: string;
    points: string[];
  }>;
  onExperienceSelect: (experience: any) => void;
  selectedExperience: any;
}

const QuantumTimeline: React.FC<TimelineProps> = ({ experiences, onExperienceSelect, selectedExperience }) => {
  const [particles, setParticles] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    // Générer des particules quantiques pour l'ambiance
    const newParticles = Array.from({ length: 100 }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 20
    }));
    setParticles(newParticles.map(p => new THREE.Vector3(p.x, p.y, p.z)));
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#915EFF" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#00d4ff"
      />
      
      {/* Particules quantiques flottantes */}
      {particles.map((position, index) => (
        <QuantumParticle key={index} position={position} />
      ))}
      
      {/* Ligne temporelle centrale */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 20, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Portails quantiques pour chaque expérience */}
      {experiences.map((experience, index) => {
        const zPosition = (index - experiences.length / 2) * 4;
        return (
          <QuantumPortal
            key={experience.title}
            experience={experience}
            position={[0, 0, zPosition]}
            isActive={selectedExperience?.title === experience.title}
            onClick={() => onExperienceSelect(experience)}
          />
        );
      })}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={25}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
};

interface QuantumParticleProps {
  position: THREE.Vector3;
}

const QuantumParticle: React.FC<QuantumParticleProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPosition = useRef(position.clone());
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Mouvement quantique aléatoire
      const randomOffset = new THREE.Vector3(
        Math.sin(time + position.x) * 0.1,
        Math.cos(time + position.y) * 0.1,
        Math.sin(time + position.z) * 0.1
      );
      
      meshRef.current.position.copy(originalPosition.current).add(randomOffset);
      
      // Effet de scintillement
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 5 + position.x) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default QuantumTimeline;
