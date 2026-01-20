import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  size: number;
  targetPosition?: THREE.Vector3;
}

const Particle: React.FC<ParticleProps> = ({ position, velocity, color, size, targetPosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const internalTargetPosition = useRef(targetPosition?.clone() || position.clone());
  
  // Mettre à jour la position cible quand elle change
  if (targetPosition) {
    internalTargetPosition.current = targetPosition.clone();
  }
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const time = Date.now() * 0.001;
    
    // Mouvement de base avec vélocité
    meshRef.current.position.add(velocity.clone().multiplyScalar(0.01));
    
    // Attraction vers la formation cible
    const attractionForce = internalTargetPosition.current.clone().sub(meshRef.current.position).multiplyScalar(0.02);
    meshRef.current.position.add(attractionForce);
    
    // Mouvement organique
    const organicMovement = new THREE.Vector3(
      Math.sin(time + position.x) * 0.05,
      Math.cos(time + position.y) * 0.05,
      Math.sin(time * 0.5 + position.z) * 0.05
    );
    meshRef.current.position.add(organicMovement);
    
    // Rotation individuelle
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
    
    // Effet de respiration
    const scale = size * (1 + Math.sin(time * 2 + position.x) * 0.2);
    meshRef.current.scale.set(scale, scale, scale);
    
    // Rebondir sur les limites
    const boundary = 8;
    ['x', 'y', 'z'].forEach((axis) => {
      if (Math.abs((meshRef.current!.position as any)[axis]) > boundary) {
        (velocity as any)[axis] *= -1;
      }
    });
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

interface ParticleSystemProps {
  projects: Array<{ name: string; tags: Array<{ name: string }> }>;
  skills: Array<{ category: string; skills: string[]; color: string }>;
  currentFormation: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  projects, 
  skills, 
  currentFormation 
}) => {
  const particles = useMemo(() => {
    const particleArray: Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      color: string;
      size: number;
      targetPosition: THREE.Vector3;
    }> = [];
    const colors = ['#915EFF', '#00d4ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#ff69b4'];
    
    // Créer des particules pour les projets
    projects.forEach((_, index) => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );
      
      particleArray.push({
        position,
        velocity,
        color: colors[index % colors.length],
        size: 0.2 + Math.random() * 0.3,
        targetPosition: position.clone()
      });
    });
    
    // Créer des particules pour les compétences
    skills.forEach(category => {
      category.skills.forEach(() => {
        const position = new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        
        particleArray.push({
          position,
          velocity,
          color: category.color,
          size: 0.15 + Math.random() * 0.2,
          targetPosition: position.clone()
        });
      });
    });
    
    return particleArray;
  }, [projects, skills]);

  // Mettre à jour les positions cibles selon la formation
  useEffect(() => {
    particles.forEach((particle, index) => {
      let newTargetPosition: THREE.Vector3;
      
      if (currentFormation === 'sphere') {
        // Formation sphérique
        const phi = Math.acos(1 - 2 * (index / particles.length));
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        const radius = 4;
        
        newTargetPosition = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
      } else if (currentFormation === 'dna') {
        // Formation double hélice ADN
        const t = index * 0.2;
        const radius = 3;
        const strand = index % 2;
        
        newTargetPosition = new THREE.Vector3(
          radius * Math.cos(t + strand * Math.PI),
          (index - particles.length / 2) * 0.3,
          radius * Math.sin(t + strand * Math.PI)
        );
      } else if (currentFormation === 'galaxy') {
        // Formation galactique
        const angle = (index / particles.length) * Math.PI * 4;
        const radius = 0.5 + (index / particles.length) * 6;
        
        newTargetPosition = new THREE.Vector3(
          radius * Math.cos(angle),
          (Math.random() - 0.5) * 2,
          radius * Math.sin(angle)
        );
      } else {
        // Formation aléatoire
        newTargetPosition = new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
      }
      
      // Mettre à jour la position cible de la particule
      particle.targetPosition = newTargetPosition;
    });
  }, [currentFormation, particles]);

  return (
    <>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          position={particle.position}
          velocity={particle.velocity}
          color={particle.color}
          size={particle.size}
          targetPosition={particle.targetPosition}
        />
      ))}
    </>
  );
};

interface LivingEcosystemProps {
  projects: Array<{ name: string; tags: Array<{ name: string }> }>;
  skills: Array<{ category: string; skills: string[]; color: string }>;
}

const LivingEcosystem: React.FC<LivingEcosystemProps> = ({ projects, skills }) => {
  const [currentFormation, setCurrentFormation] = useState('sphere');
  const formations = ['sphere', 'dna', 'galaxy', 'random'];
  
  // Changement automatique de formation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFormation(prev => {
        const currentIndex = formations.indexOf(prev);
        return formations[(currentIndex + 1) % formations.length];
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#915EFF" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b6b" />
      
      <ParticleSystem
        projects={projects}
        skills={skills}
        currentFormation={currentFormation}
      />
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};

export default LivingEcosystem;
