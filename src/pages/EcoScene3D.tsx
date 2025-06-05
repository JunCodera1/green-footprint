import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useTheme } from "../hooks/useTheme";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";

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
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [scrollY, setScrollY] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      theme.mode === "dark" ? "#111827" : "#f3f4f6"
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
      color: theme.mode === "dark" ? "#1f2937" : "#e5e7eb",
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
      tree.traverse(
        (child: { castShadow: boolean; receiveShadow: boolean }) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      );
      scene.add(tree);
    });

    // Solar panel model
    loader.load("/models/solar_panel.glb", (gltf) => {
      const solarPanel = gltf.scene;
      solarPanel.scale.set(0.3, 0.3, 0.3);
      solarPanel.position.set(2, 0, -1);
      solarPanel.rotation.y = Math.PI / 4;
      solarPanel.traverse(
        (child: { castShadow: boolean; receiveShadow: boolean }) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      );
      scene.add(solarPanel);
    });

    // Wind turbine model
    loader.load("/models/wind_turbine.glb", (gltf) => {
      const windTurbine = gltf.scene;
      windTurbine.scale.set(0.4, 0.4, 0.4);
      windTurbine.position.set(-2, 0, -2);
      windTurbine.traverse(
        (child: { castShadow: boolean; receiveShadow: boolean }) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      );
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
      color: theme.mode === "dark" ? "#22c55e" : "#16a34a",
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
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-green-900" : "bg-green-50"
      }`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      <main className="flex-grow flex items-center justify-center p-4 pt-24">
        <div
          className={`bg-gradient-to-r from-green-800 to-teal-900 rounded-xl shadow-2xl p-8 ${className}`}
        >
          <div
            ref={mountRef}
            className="relative rounded-lg overflow-hidden"
            style={{ width, height }}
          />
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default EcoScene3D;
