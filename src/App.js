import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import CarSelectionScene from "./CarSelectionScene"; // new file/component
import DrivingScene from "./DrivingScene"; // current scene content, slightly refactored

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* <h1 className="text-4xl font-bold mb-4 text-center">Scenic Auto Drive</h1> */}
      {!selectedCar ? (
        <>
          {/* <p className="text-lg mb-8 text-center max-w-2xl">
            Select your car to begin your journey.
          </p> */}
          <CarSelectionScene onSelect={setSelectedCar} />
        </>
      ) : (
        <>
          {/* <p className="text-lg mb-4 text-center max-w-2xl">Enjoy the ride!</p> */}
          <div className="w-full max-w-4xl h-[600px] bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
            <Canvas
              shadows
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <DrivingScene carUrl={selectedCar} />
            </Canvas>
          </div>
        </>
      )}
    </div>
  );
}
