import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface NeuronProps {
  position: [number, number, number];
  skill: string;
  isActive: boolean;
  onActivate: (skill: string) => void;
}

const Neuron: React.FC<NeuronProps> = ({ position, skill, isActive, onActivate }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (meshRef.current) {
      // Effet de pulsation quand actif
      if (isActive) {
        setPulse((prev) => prev + 0.1);
        const scale = 1 + Math.sin(pulse) * 0.3;
        meshRef.current.scale.set(scale, scale, scale);
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onActivate(skill);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? '#00d4ff' : '#915EFF'}
        emissive={isActive ? '#00d4ff' : '#915EFF'}
        emissiveIntensity={isActive ? 0.8 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

interface SynapseProps {
  start: [number, number, number];
  end: [number, number, number];
  isActive: boolean;
}

const Synapse: React.FC<SynapseProps> = ({ start, end, isActive }) => {
  const lineRef = useRef<any>(null);
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (lineRef.current && isActive) {
      setPulse((prev) => prev + 0.05);
      // Effet d'impulsion électrique
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(pulse) * 0.7;
      material.needsUpdate = true;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={isActive ? '#00ff00' : '#444444'}
      lineWidth={isActive ? 3 : 1}
      transparent
      opacity={isActive ? 1 : 0.3}
    />
  );
};

interface BrainCoreProps {
  position: [number, number, number];
}

const BrainCore: React.FC<BrainCoreProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.z += 0.003;
      
      // Respiration
      const scale = 1 + Math.sin(Date.now() * 0.001 * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ff6b6b"
        emissive="#ff6b6b"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        wireframe={false}
      />
    </mesh>
  );
};

interface NeuralNetworkProps {
  skills: { category: string; skills: string[]; color: string }[];
  onSkillSelect: (skill: string) => void;
  activeSkill: string | null;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ skills, onSkillSelect, activeSkill }) => {
  const [neurons, setNeurons] = useState<Array<{ position: [number, number, number]; skill: string }>>([]);
  const [connections, setConnections] = useState<Array<{ start: [number, number, number]; end: [number, number, number] }>>([]);

  useEffect(() => {
    const generatedNeurons: Array<{ position: [number, number, number]; skill: string }> = [];
    const generatedConnections: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];

    // Générer les neurones pour chaque compétence
    skills.forEach((category, categoryIndex) => {
      const angle = (categoryIndex / skills.length) * Math.PI * 2;
      const radius = 3;
      
      category.skills.forEach((skill, skillIndex) => {
        const localAngle = angle + (skillIndex - category.skills.length / 2) * 0.3;
        const height = (skillIndex - category.skills.length / 2) * 0.5;
        
        const position: [number, number, number] = [
          Math.cos(localAngle) * radius,
          height,
          Math.sin(localAngle) * radius
        ];
        
        generatedNeurons.push({ position, skill });
      });
    });

    // Générer les connexions entre neurones proches
    for (let i = 0; i < generatedNeurons.length; i++) {
      for (let j = i + 1; j < generatedNeurons.length; j++) {
        const distance = Math.sqrt(
          Math.pow(generatedNeurons[i].position[0] - generatedNeurons[j].position[0], 2) +
          Math.pow(generatedNeurons[i].position[1] - generatedNeurons[j].position[1], 2) +
          Math.pow(generatedNeurons[i].position[2] - generatedNeurons[j].position[2], 2)
        );
        
        if (distance < 2.5) { // Connecter les neurones proches
          generatedConnections.push({
            start: generatedNeurons[i].position,
            end: generatedNeurons[j].position
          });
        }
      }
    }

    setNeurons(generatedNeurons);
    setConnections(generatedConnections);
  }, [skills]);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff6b6b" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#915EFF" />
      
      <BrainCore position={[0, 0, 0]} />
      
      {/* Synapses (connexions) */}
      {connections.map((connection, index) => (
        <Synapse
          key={index}
          start={connection.start}
          end={connection.end}
          isActive={activeSkill !== null}
        />
      ))}
      
      {/* Neurones */}
      {neurons.map((neuron, index) => (
        <Neuron
          key={index}
          position={neuron.position}
          skill={neuron.skill}
          isActive={activeSkill === neuron.skill}
          onActivate={onSkillSelect}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};

export default NeuralNetwork;
