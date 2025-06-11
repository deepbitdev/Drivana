// DrivingScene.js
import React, { useRef, useEffect, Suspense } from "react";
import { Html, Plane, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Dynamic model loader with passed-in car URL
function ModelCar({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      scene.scale.set(90, 90, 90); // Adjust per model
      scene.position.set(0, -0.75, 0);
      scene.rotation.set(0, Math.PI, 0);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />;
}

export default function DrivingScene({ carUrl }) {
  const carContainerRef = useRef();
  const carPosition = useRef(new THREE.Vector3(1, -1, -3));

  const roadTexture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/hardwood2_diffuse.jpg"
  );
  roadTexture.wrapS = THREE.RepeatWrapping;
  roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.repeat.set(10, 50);

  useFrame((state, delta) => {
    const speed = 2;
    carPosition.current.z -= speed * delta;

    if (carContainerRef.current) {
      carContainerRef.current.position.z = carPosition.current.z;

      state.camera.position.copy(carContainerRef.current.position);
      state.camera.position.add(new THREE.Vector3(-0.2, 0.1, 0));

      const lookAtTarget = new THREE.Vector3(
        carContainerRef.current.position.x,
        carContainerRef.current.position.y,
        carContainerRef.current.position.z - 10
      );
      state.camera.lookAt(lookAtTarget);
    }
  });

  return (
    <>
      <Plane
        args={[50, 200]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.75, 0]}
        receiveShadow
      >
        <meshStandardMaterial map={roadTexture} />
      </Plane>
      <mesh>
        <sphereGeometry args={[500, 32, 32]} />
        <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <group ref={carContainerRef}>
        <Suspense
          fallback={
            <Html center>
              <p style={{ color: "white", fontSize: "20px" }}>
                Loading 3D Car...
              </p>
            </Html>
          }
        >
          <ModelCar url={carUrl} />
        </Suspense>
      </group>
    </>
  );
}
