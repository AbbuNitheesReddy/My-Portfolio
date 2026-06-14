import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Constellation = () => {
    const { viewport, mouse } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    // Adaptive particle count based on screen size
    const count = viewport.width > 5 ? 80 : 40;

    const points = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * viewport.width * 1.5;
            const y = (Math.random() - 0.5) * viewport.height * 1.5;
            const z = (Math.random() - 0.5) * 5;
            temp.push(new THREE.Vector3(x, y, z));
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 6); // Just a few connections
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, [count]);

    const lineRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Very subtle mouse following
            const targetRotateX = state.mouse.y * 0.1;
            const targetRotateY = state.mouse.x * 0.1;
            groupRef.current.rotation.x += (targetRotateX - groupRef.current.rotation.x) * 0.03;
            groupRef.current.rotation.y += (targetRotateY - groupRef.current.rotation.y) * 0.03;

            // Auto rotation
            groupRef.current.rotation.z += 0.001;

            // Update lines based on proximity
            if (lineRef.current) {
                const pos = lineRef.current.geometry.attributes.position.array as Float32Array;
                let lineIdx = 0;
                const maxDist = viewport.width > 5 ? 2.5 : 1.5;

                for (let i = 0; i < count; i++) {
                    for (let j = i + 1; j < count; j++) {
                        const dist = points[i].distanceTo(points[j]);
                        if (dist < maxDist && lineIdx < count * 6) {
                            pos[lineIdx++] = points[i].x;
                            pos[lineIdx++] = points[i].y;
                            pos[lineIdx++] = points[i].z;
                            pos[lineIdx++] = points[j].x;
                            pos[lineIdx++] = points[j].y;
                            pos[lineIdx++] = points[j].z;
                        }
                    }
                }
                // Zero out the rest
                for (let i = lineIdx; i < count * 6; i++) {
                    pos[i] = 0;
                }
                lineRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    });

    return (
        <group ref={groupRef}>
            {/* Nodes / Points */}
            <Points positions={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={viewport.width > 5 ? 0.08 : 0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Connections / Lines */}
            <lineSegments ref={lineRef}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={count * 2}
                        array={new Float32Array(count * 6)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial attach="material" color="#2563eb" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
};

const Hero3D: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-5 pointer-events-none w-full h-full overflow-hidden opacity-60">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true, stencil: false, depth: false }}
            >
                <ambientLight intensity={1} />
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Constellation />
                </Float>
            </Canvas>

            {/* Smooth transition to content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black pointer-events-none" />
        </div>
    );
};

export default Hero3D;
