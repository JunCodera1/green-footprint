import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useTheme } from "../hooks/useTheme";

interface EcoScene3DProps {
  width?: number;
  height?: number;
  className?: string;
}

const EcoScene3D: React.FC<EcoScene3DProps> = ({
  width = 800,
  height = 600,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      theme.mode === "dark" ? "#1a1a1a" : "#f3f4f6"
    );

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: theme.mode === "dark" ? "#2a2a2a" : "#e5e7eb",
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load 3D models
    const loader = new GLTFLoader();

    // Tree model
    loader.load("/models/tree.glb", (gltf) => {
      const tree = gltf.scene;
      tree.scale.set(0.5, 0.5, 0.5);
      tree.position.set(0, 0, 0);
      tree.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(tree);
    });

    // Solar panel model
    loader.load("/models/solar_panel.glb", (gltf) => {
      const solarPanel = gltf.scene;
      solarPanel.scale.set(0.3, 0.3, 0.3);
      solarPanel.position.set(2, 0, -1);
      solarPanel.rotation.y = Math.PI / 4;
      solarPanel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(solarPanel);
    });

    // Wind turbine model
    loader.load("/models/wind_turbine.glb", (gltf) => {
      const windTurbine = gltf.scene;
      windTurbine.scale.set(0.4, 0.4, 0.4);
      windTurbine.position.set(-2, 0, -2);
      windTurbine.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(windTurbine);
    });

    // Particles for atmosphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = Math.random() * 5;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: theme.mode === "dark" ? "#4ade80" : "#16a34a",
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      // Animate particles
      particles.rotation.y += 0.001;

      // Update any other animations here

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [width, height, theme.mode]);

  return (
    <div
      ref={mountRef}
      className={`relative ${className}`}
      style={{ width, height }}
    />
  );
};

export default EcoScene3D;
