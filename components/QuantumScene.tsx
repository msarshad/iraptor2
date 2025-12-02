/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Cylinder, Torus, Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Stylized Magnetic Field Lines (Rings)
const FieldRings = () => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.002;
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group}>
             {/* Abstract Field Lines */}
            <Torus args={[3, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#006D77" emissive="#006D77" emissiveIntensity={0.5} transparent opacity={0.3} />
            </Torus>
            <Torus args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0.2, 0]}>
                <meshStandardMaterial color="#3730a3" emissive="#3730a3" emissiveIntensity={0.5} transparent opacity={0.2} />
            </Torus>
            <Torus args={[4, 0.01, 16, 100]} rotation={[Math.PI / 2, -0.2, 0]}>
                <meshStandardMaterial color="#006D77" emissive="#006D77" emissiveIntensity={0.2} transparent opacity={0.1} />
            </Torus>
            <Torus args={[2.5, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0.4]}>
                <meshStandardMaterial color="#3730a3" emissive="#3730a3" emissiveIntensity={0.8} transparent opacity={0.4} />
            </Torus>
        </group>
    );
};

// Floating Magnetic Particles (Feedstock)
const FeedstockParticles = () => {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for(let i=0; i<count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10 + 2; // Keep mainly above
            const z = (Math.random() - 0.5) * 10;
            temp.push({ x, y, z, speed: Math.random() * 0.02 });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;
        particles.forEach((particle, i) => {
            // Spiral down towards center
            particle.y -= particle.speed;
            if (particle.y < -4) particle.y = 6;
            
            // Spiral motion
            const angle = Date.now() * 0.001 * particle.speed * 100 + i;
            const radius = 2 + Math.sin(Date.now() * 0.001 + i) * 0.5;
            
            dummy.position.set(
                Math.sin(angle) * radius * (particle.y / 5), // Taper in
                particle.y,
                Math.cos(angle) * radius * (particle.y / 5)
            );
            
            // Scale based on proximity to center (melt simulation)
            const s = Math.max(0.05, 0.1 * (particle.y + 4) / 10);
            dummy.scale.setScalar(s);
            
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
        </instancedMesh>
    );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#3730a3" />
        
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Nozzle Assembly */}
          <group position={[0, 1, 0]}>
             {/* Nozzle Body */}
             <Cylinder args={[0.8, 1, 3, 32]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
             </Cylinder>
             {/* Tip */}
             <Cylinder args={[0.1, 0.8, 1, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.3} />
             </Cylinder>
             
             {/* Electromagnet Coils */}
             <Torus args={[1.1, 0.1, 16, 64]} position={[0, 0.5, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#b91c1c" />
             </Torus>
             <Torus args={[1.1, 0.1, 16, 64]} position={[0, 1.0, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#b91c1c" />
             </Torus>
             <Torus args={[1.1, 0.1, 16, 64]} position={[0, 1.5, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#b91c1c" />
             </Torus>
             
             {/* Printed Block */}
             <mesh position={[0, -2, 0]} rotation={[0, Math.PI/4, 0]}>
                <boxGeometry args={[2, 1, 2]} />
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.8} />
             </mesh>
          </group>

          <FieldRings />
        </Float>

        <FeedstockParticles />

        <Environment preset="city" />
        <fog attach="fog" args={['#F9F8F4', 5, 25]} />
      </Canvas>
    </div>
  );
};

export const ToolheadScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 4]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/3} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <Environment preset="studio" />
        
        {/* Simplified Toolhead Representation */}
        <group position={[0, 0.5, 0]}>
             {/* Main Shaft */}
             <Cylinder args={[0.3, 0.3, 3, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
             </Cylinder>
             
             {/* Cooling Block */}
             <mesh position={[0, 0.5, 0]}>
                 <boxGeometry args={[1.5, 1, 1.5]} />
                 <meshStandardMaterial color="#000" />
                 {/* Fins */}
                 {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[0, -0.4 + i*0.2, 0]} scale={[1.05, 0.05, 1.05]}>
                        <boxGeometry args={[1.5, 1, 1.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                 ))}
             </mesh>

             {/* Hall Probe Array Ring */}
             <Torus args={[0.8, 0.1, 16, 64]} position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.2} />
             </Torus>
             
             {/* Nozzle */}
             <Cylinder args={[0.05, 0.3, 0.5, 32]} position={[0, -1.5, 0]}>
                <meshStandardMaterial color="#d97706" metalness={1} roughness={0.4} />
             </Cylinder>
        </group>

        {/* Print Bed */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Grid */}
        <gridHelper args={[10, 20, 0x475569, 0x334155]} position={[0, -1.99, 0]} />

      </Canvas>
    </div>
  );
}