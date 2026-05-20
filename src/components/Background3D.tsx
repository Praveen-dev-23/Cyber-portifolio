import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Subcomponent: The glowing holographic coordinate grid
function FloatingGrid({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    
    // Slow structural rotation
    const time = state.clock.getElapsedTime();
    
    // Tilt the grid plane based on the mouse target vector (lerp for butter-smooth animation)
    const targetX = mouse.current.y * 0.12 - 0.7; // default pitch
    const targetY = mouse.current.x * 0.12;       // default yaw
    
    gridRef.current.rotation.x = THREE.MathUtils.lerp(gridRef.current.rotation.x, targetX, 0.05);
    gridRef.current.rotation.y = THREE.MathUtils.lerp(gridRef.current.rotation.y, targetY, 0.05);
    
    // Slowly slide the grid lines backward to simulate moving forward in a digital grid
    const gridMaterial = (gridRef.current.children[0] as THREE.LineSegments)?.material as THREE.LineBasicMaterial;
    if (gridMaterial) {
      // Create a subtle pulsing glow on the lines over time
      gridMaterial.opacity = 0.12 + Math.sin(time * 2) * 0.04;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2.5, -4]}>
      {/* Horizontal glowing grid lines */}
      <gridHelper args={[60, 40, '#00f0ff', '#00f0ff']} position={[0, 0, 0]}>
        <lineBasicMaterial attach="material" color="#00f0ff" transparent opacity={0.15} depthWrite={false} />
      </gridHelper>
      
      {/* Deeper grid panel for purple matrix vibes */}
      <gridHelper args={[60, 20, '#bd00ff', '#bd00ff']} position={[0, -0.05, 0]}>
        <lineBasicMaterial attach="material" color="#bd00ff" transparent opacity={0.08} depthWrite={false} />
      </gridHelper>
    </group>
  );
}

// Subcomponent: A highly-optimized floating code storm / particle cluster
function ParticleStorm({ count = 280, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create randomized positions, velocities, and color indicators
  const [particles] = useState(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const scale = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // X coordinates spread across the width
      pos[i * 3] = (Math.random() - 0.5) * 35;
      // Y coordinates spread vertically
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      // Z depth coordinates
      pos[i * 3 + 2] = -Math.random() * 25 - 2;
      
      // Upward floating speed
      vel[i] = 0.015 + Math.random() * 0.035;
      // Size scale
      scale[i] = 0.1 + Math.random() * 0.45;
    }
    
    return { pos, vel, scale };
  });

  // Custom round glowing particle texture created dynamically inside Canvas
  const [particleTexture] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(189, 0, 255, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  });

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Add floating velocity upward
      positions[i * 3 + 1] += particles.vel[i];
      
      // Apply mouse magnetic attraction (particles tilt slightly in the direction of the cursor)
      positions[i * 3] += mouse.current.x * 0.003;
      
      // If particles flow past the upper screen bounds, recycle them back to the bottom
      if (positions[i * 3 + 1] > 12) {
        positions[i * 3 + 1] = -12;
        positions[i * 3] = (Math.random() - 0.5) * 35;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotational drift over time
    pointsRef.current.rotation.z += 0.0003;
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.current.x * 0.05, 0.03);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={particleTexture}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Background Wrapper rendering the full WebGL Canvas context
export default function Background3D() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate metrics (-1 to +1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-cyber-bg overflow-hidden pointer-events-none">
      {/* Overlay matrix glow grids */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-cyber-bg pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0055" />
        
        <FloatingGrid mouse={mouse} />
        <ParticleStorm mouse={mouse} />
      </Canvas>
    </div>
  );
}
