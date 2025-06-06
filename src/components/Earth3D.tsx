import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Earth3DProps {
  size?: number;
  autoRotate?: boolean;
}

const Earth3D: React.FC<Earth3DProps> = ({ size = 400, autoRotate = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(size, size);
    mountRef.current.appendChild(renderer.domElement);

    // Earth setup
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const textureLoader = new THREE.TextureLoader();

    // Load earth textures
    const earthMap = textureLoader.load("/textures/earth_daymap.jpg");
    const bumpMap = textureLoader.load("/textures/earth_bumpmap.jpg");
    const specularMap = textureLoader.load("/textures/earth_specular.jpg");
    const cloudsMap = textureLoader.load("/textures/earth_clouds.jpg");

    // Earth material
    const material = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      specularMap: specularMap,
      specular: new THREE.Color("grey"),
      shininess: 5,
    });

    // Create earth mesh
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Clouds
    const cloudsGeometry = new THREE.SphereGeometry(2.01, 32, 32);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.4,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      clouds.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [size, autoRotate]);

  return (
    <div
      ref={mountRef}
      style={{
        width: size,
        height: size,
        margin: "0 auto",
      }}
    />
  );
};

export default Earth3D;
