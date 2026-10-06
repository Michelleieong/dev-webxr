'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF } from '@react-three/drei';
import { XR, createXRStore, XROrigin } from '@react-three/xr';

const store = createXRStore();


// =========================
// ANGEL WINGS
// =========================

function AngelWings() {
  const { scene } = useGLTF('/angel-wings.glb');

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <primitive
        object={scene}
        scale={2}
        position={[0, 0, 0]}
      />
    </Float>
  );
}


// =========================
// CLOUD
// =========================

function Cloud({
  position,
  scale,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF('/fluffy_cloud.glb');

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}


// =========================
// MAIN SCENE
// =========================

export default function Home() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas
        camera={{
          position: [0, 1, 9],
          fov: 45,
        }}
      >

        {/* BACKGROUND */}
        <color
          attach="background"
          args={['#7697ad']}
        />


        {/* XR */}
        <XR store={store}>

          <XROrigin
            position={[0, 1.6, 6]}
          />


          {/* LIGHTING */}

          <ambientLight
            intensity={0.8}
          />

          <directionalLight
            position={[5, 8, 5]}
            intensity={2.5}
          />

          <directionalLight
            position={[-5, 3, -5]}
            intensity={1}
          />


          {/* MAIN WINGS */}

          <AngelWings />

          {/* BACK CLOUDS */}

          <Cloud
            position={[-4.8, 2.2, -5]}
            scale={2.2}
            rotation={[0, 0.4, 0]}
          />

          <Cloud
            position={[4.7, 2.5, -6]}
            scale={2.7}
            rotation={[0, -0.5, 0]}
          />

          <Cloud
            position={[0.5, 3.8, -7]}
            scale={1.4}
            rotation={[0, 0.2, 0]}
          />


          {/* LOWER CLOUDS */}

          <Cloud
            position={[-4.8, -2.4, -3]}
            scale={1.5}
            rotation={[0, 0.5, 0]}
          />

          <Cloud
            position={[4.5, -1.8, -4]}
            scale={1.9}
            rotation={[0, -0.4, 0]}
          />

          <Cloud
            position={[0.8, -3.5, -6]}
            scale={2.4}
            rotation={[0, 0, 0]}
          />


          {/* CAMERA CONTROLS */}

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.25}
          />

        </XR>

      </Canvas>
    </div>
  );
}


// PRELOAD MODELS

useGLTF.preload('/angel-wings.glb');
useGLTF.preload('/fluffy_cloud.glb');