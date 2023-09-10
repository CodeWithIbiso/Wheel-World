"use client";
import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Canvas,
  applyProps,
  useFrame,
  useThree,
  Sphere,
} from "@react-three/fiber";
import {
  PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Lightformer,
  Float,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import { motion } from "framer-motion";
import { CustomButton } from "@components";

export default ({ isMobile, setIsMobile }) => {
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const props = {
    scale: isMobile ? 0.8 : 0.9,
  };
  const { scene, nodes, materials } = useGLTF(
    "/jeep_grand_cherokee_trackhawk.glb"
  );
  scene.position.x = isMobile ? 1 : 7;
  scene.position.y = isMobile ? -5 : 3;

  return (
    <>
      <Canvas>
        <ambientLight intensity={5.2} />
        <directionalLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <primitive object={scene} {...props} />
        </Suspense>
        <CameraMovement
          isMobile={isMobile}
          isMoving={isMoving}
          setIsMoving={setIsMoving}
        />
        <DynamicLighting isMoving={isMoving} />
      </Canvas>
    </>
  );
};

const DynamicLighting = ({ isMoving }) => {
  const { scene, camera } = useThree();

  useFrame((state, delta) => {
    // Calculate dynamic lighting properties based on the model's movement
    const t = state.clock.elapsedTime;
    const lightIntensity = Math.sin(t * 0.25) + 1; // Adjust the speed

    // Calculate dynamic hue for the color gradient
    const hue = (t * 10) % 360; // Adjust the speed of color change

    // Set a higher lightness value to keep the light color bright
    const lightness = 0.8; // Adjust the brightness level as needed

    // Convert HSL color to RGB
    const lightColor = new THREE.Color();
    lightColor.setHSL(hue / 360, 1, lightness);

    // Update light properties
    scene.traverse((object) => {
      if (object.isLight) {
        object.intensity = lightIntensity;
        object.color.copy(lightColor);
      }
    });
  });

  return null; // This component doesn't render anything
};
const CameraMovement = ({ isMobile, isMoving, setIsMoving }) => {
  const { camera, gl } = useThree();

  const speed = 5; // Adjust the speed as needed
  const maxX = 14; // Adjust the maximum X position where the camera should stop

  useFrame((state, delta) => {
    if (isMoving) {
      camera.position.x += speed * delta * 2;
      camera.position.y += (speed * delta) / (isMobile ? 12 : 2);

      // Check if the camera has reached the maxX position
      if (camera.position.x >= maxX) {
        setIsMoving(false); // Stop camera movement
      }
    }
  });

  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
      args={[camera, gl.domElement]}
    />
  );
};

const App = () => {
  const [degraded, degrade] = useState(false);
  return (
    <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
      {/* <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
        <ambientLight intensity={0.5} /> */}
      <Porsche
        scale={0.6}
        position={[-0.5, -0.18, 0]}
        rotation={[0, Math.PI / 5, 0]}
      />
      {/* <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
        </AccumulativeShadows> */}
      {/** PerfMon will detect performance issues */}
      {/* <PerformanceMonitor onDecline={() => degrade(true)} /> */}
      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      {/* <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
          <Lightformers />
        </Environment> */}
      {/* <CameraRig /> */}
    </Canvas>
  );
};

/*
Author: Karol Miklas (https://sketchfab.com/karolmiklas)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf
Title: (FREE) Porsche 911 Carrera 4S
*/
function Porsche(props) {
  const { scene, nodes, materials } = useGLTF(
    "/jeep_grand_cherokee_trackhawk.glb"
  ); //jeep_grand_cherokee_trackhawk
  //   const { scene, nodes, materials } = useGLTF('/911-transformed.glb') //jeep_grand_cherokee_trackhawk
  useLayoutEffect(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    // applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
    // applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 })
    // applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
    // applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#555' })
  }, [nodes, materials]);
  return <primitive object={scene} {...props} />;
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(
      v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
