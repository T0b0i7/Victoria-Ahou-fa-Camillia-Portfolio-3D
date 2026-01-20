import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface MorphingMeshProps {
  targetImage: string;
}

const MorphingMesh: React.FC<MorphingMeshProps> = ({ targetImage }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = new THREE.TextureLoader();
  const [targetTexture, setTargetTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    textureLoader.load(targetImage, (texture) => {
      setTargetTexture(texture);
    });
  }, [targetImage]);

  // Créer des géométries pour les compétences
  const skillGeometries = [
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.SphereGeometry(1.5, 32, 32),
    new THREE.ConeGeometry(1, 2, 32),
    new THREE.TorusGeometry(1, 0.4, 16, 100),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TetrahedronGeometry(1.5),
  ];

  const [currentGeometryIndex, setCurrentGeometryIndex] = useState(0);
  const morphProgress = useRef(0);
  const targetGeometryIndex = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !targetTexture) return;

    const time = state.clock.getElapsedTime();
    
    // Morphing progressif entre les formes
    if (Math.random() < 0.005) { // Changement aléatoire de forme
      targetGeometryIndex.current = Math.floor(Math.random() * skillGeometries.length);
    }

    // Interpolation douce entre les géométries
    morphProgress.current += 0.02;
    if (morphProgress.current > 1) morphProgress.current = 1;

    const currentGeometry = skillGeometries[currentGeometryIndex];

    // Morphing des vertices
    const positions = meshRef.current.geometry.attributes.position;
    const currentPositions = currentGeometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      positions.setXYZ(
        i,
        THREE.MathUtils.lerp(
          positions.getX(i),
          currentPositions.getX(i % currentPositions.count),
          morphProgress.current
        ),
        THREE.MathUtils.lerp(
          positions.getY(i),
          currentPositions.getY(i % currentPositions.count),
          morphProgress.current
        ),
        THREE.MathUtils.lerp(
          positions.getZ(i),
          currentPositions.getZ(i % currentPositions.count),
          morphProgress.current
        )
      );
    }

    positions.needsUpdate = true;

    // Rotation complexe
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;

    // Effet de respiration
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);

    // Update geometry index when morphing is complete
    if (morphProgress.current >= 1) {
      setCurrentGeometryIndex(targetGeometryIndex.current);
      morphProgress.current = 0;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial
        map={targetTexture}
        color="#915EFF"
        emissive="#915EFF"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

interface MorphingProfileProps {
  profileImage: string;
}

const MorphingProfile: React.FC<MorphingProfileProps> = ({ profileImage }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <MorphingMesh targetImage={profileImage} />
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </Canvas>
  );
};

export default MorphingProfile;
