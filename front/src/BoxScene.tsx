import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BoxScene = ({ triangles }) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const geometryRef = useRef(new THREE.BufferGeometry());

  useEffect(() => {
    if (triangles.length > 0) {
      console.log("Обновляем геометрию:", triangles);

      const positions = new Float32Array(triangles.flat(2));

      geometryRef.current.dispose();
      geometryRef.current = new THREE.BufferGeometry();

      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometryRef.current.computeVertexNormals();

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = geometryRef.current;
      }
    }
  }, [triangles]);

  return (
    <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />

      <mesh ref={meshRef}>
        <primitive attach="geometry" object={geometryRef.current} />
        <meshStandardMaterial color="orange" side={THREE.DoubleSide} flatShading />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default BoxScene;
