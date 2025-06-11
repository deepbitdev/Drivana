import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  useGLTF,
  Text,
  Float,
  Plane,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

const showroomUrl =
  "https://raw.githubusercontent.com/deepbitdev/car_assets/main/models/garage_room_compressed.glb"; // Replace with your room model

const cars = [
  {
    name: "McLaren Artura Spider",
    url: "https://raw.githubusercontent.com/deepbitdev/car_assets/main/models/2021_ferrari_sf90_spider.glb",
    position: [-3, -9, 0],
    info: "Twin-turbo V6 hybrid engine, 0–60mph in 3.0s",
  },
  {
    name: "Porsche 911",
    url: "https://raw.githubusercontent.com/deepbitdev/car_assets/main/models/2025_mclaren_artura_spider.glb",
    position: [8, -9, 0],
    rotation: [0, -90, 90],
    // info: "Rear-engine legend with timeless design",
  },
];

function ShowroomModel() {
  const { scene } = useGLTF(showroomUrl);
  return <primitive object={scene} scale={1} position={[0, -1.5, 0]} />;
}

function CarWithUI({ car, onSelect }) {
  const { scene } = useGLTF(car.url);

  scene.scale.set(500, 500, 500); // adjust as needed
  scene.position.set(...car.position);
  scene.rotation.y = Math.PI; // rotate to face front

  return (
    <group>
      {/* The car model */}
      <primitive object={scene} />

      {/* Floating button above car */}
      <Float floatIntensity={2} rotationIntensity={0}>
        <Html position={[car.position[0], 4, car.position[2]]} center>
          <button
            onClick={() => onSelect(car.url)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition"
          >
            Select {car.name}
          </button>
        </Html>
      </Float>

      {/* Info panel on the left side of the car */}
      <group position={[car.position[0] - 2, 0.5, car.position[2]]}>
        <Plane args={[2.5, 1.2]} rotation={[-Math.PI / 0, 90, 0]}>
          <meshStandardMaterial color="black" transparent opacity={0.6} />
        </Plane>
        <Text
          position={[0, 0.01, 0]}
          rotation={[-Math.PI / -180, 0, 0]}
          fontSize={0.2}
          maxWidth={2.4}
          lineHeight={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {/* {car.name + "\n" + car.info} */}
        </Text>
      </group>
    </group>
  );
}

export default function CarSelectionScene({ onSelect }) {
  return (
    <div className="w-full max-w-5xl h-[600px] relative rounded-lg overflow-hidden bg-gray-800 shadow-lg">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <Suspense fallback={<Html center>Loading showroom...</Html>}>
          <ShowroomModel />
          {cars.map((car) => (
            <CarWithUI key={car.name} car={car} onSelect={onSelect} />
          ))}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
