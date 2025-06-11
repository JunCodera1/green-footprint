"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/Addons.js" 
import { RenderPass } from "three/examples/jsm/Addons.js" 
import { UnrealBloomPass } from "three/examples/jsm/Addons.js" 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useTheme } from "../../hooks/useTheme"
import Navigation from "../../components/mainCompo/Navigation"
import Footer from "../../components/mainCompo/Footer"
import { useDarkMode } from "../../contexts/DarkModeContext"

interface EcoScene3DProps {
  width?: number
  height?: number
  className?: string
}

const EcoScene3D: React.FC<EcoScene3DProps> = ({ width = 800, height = 600, className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const composerRef = useRef<EffectComposer>()
  const animationRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create a beautiful gradient background
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")!
    canvas.width = 512
    canvas.height = 512

    const gradient = context.createLinearGradient(0, 0, 0, 512)
    if (theme.mode === "dark") {
      gradient.addColorStop(0, "#0f172a") // Dark blue
      gradient.addColorStop(0.5, "#1e293b") // Slate
      gradient.addColorStop(1, "#334155") // Lighter slate
    } else {
      gradient.addColorStop(0, "#87ceeb") // Sky blue
      gradient.addColorStop(0.5, "#98fb98") // Pale green
      gradient.addColorStop(1, "#f0f8ff") // Alice blue
    }

    context.fillStyle = gradient
    context.fillRect(0, 0, 512, 512)

    const backgroundTexture = new THREE.CanvasTexture(canvas)
    scene.background = backgroundTexture

    // Camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(8, 6, 8)
    camera.lookAt(0, 0, 0)

    // Enhanced renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mountRef.current.appendChild(renderer.domElement)

    // Post-processing setup
    const composer = new EffectComposer(renderer)
    composerRef.current = composer

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.3, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2.2
    controls.minDistance = 3
    controls.maxDistance = 20
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(
      theme.mode === "dark" ? 0x404040 : 0xffffff,
      theme.mode === "dark" ? 0.3 : 0.6,
    )
    scene.add(ambientLight)

    // Main directional light (sun)
    const sunLight = new THREE.DirectionalLight(
      theme.mode === "dark" ? 0x6366f1 : 0xffffff,
      theme.mode === "dark" ? 0.8 : 1.2,
    )
    sunLight.position.set(10, 15, 5)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 50
    sunLight.shadow.camera.left = -10
    sunLight.shadow.camera.right = 10
    sunLight.shadow.camera.top = 10
    sunLight.shadow.camera.bottom = -10
    sunLight.shadow.bias = -0.0001
    scene.add(sunLight)

    // Rim lighting
    const rimLight = new THREE.DirectionalLight(theme.mode === "dark" ? 0x22c55e : 0x10b981, 0.5)
    rimLight.position.set(-5, 3, -5)
    scene.add(rimLight)

    // Enhanced ground with texture
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 100, 100)

    // Create grass-like texture
    const grassCanvas = document.createElement("canvas")
    const grassContext = grassCanvas.getContext("2d")!
    grassCanvas.width = 512
    grassCanvas.height = 512

    // Base grass color
    grassContext.fillStyle = theme.mode === "dark" ? "#1f2937" : "#22c55e"
    grassContext.fillRect(0, 0, 512, 512)

    // Add texture details
    for (let i = 0; i < 1000; i++) {
      grassContext.fillStyle = theme.mode === "dark" ? "#374151" : "#16a34a"
      grassContext.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 3 + 1, Math.random() * 3 + 1)
    }

    const grassTexture = new THREE.CanvasTexture(grassCanvas)
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping
    grassTexture.repeat.set(4, 4)

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: grassTexture,
      roughness: 0.8,
      metalness: 0.1,
    })

    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true

    // Add vertex displacement for terrain variation
    const positions = ground.geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const y = 0.1 * Math.sin(positions.getX(i) * 0.5) * Math.cos(positions.getZ(i) * 0.5)
      positions.setY(i, y)
    }
    positions.needsUpdate = true
    ground.geometry.computeVertexNormals()

    scene.add(ground)

    // Enhanced particle system
    const createParticleSystem = (count: number, color: number, size: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const velocities = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15
        positions[i + 1] = Math.random() * 8
        positions[i + 2] = (Math.random() - 0.5) * 15

        velocities[i] = (Math.random() - 0.5) * 0.02
        velocities[i + 1] = Math.random() * 0.01
        velocities[i + 2] = (Math.random() - 0.5) * 0.02
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3))

      const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(geometry, material)
    }

    const particles1 = createParticleSystem(800, theme.mode === "dark" ? 0x22c55e : 0x10b981, 0.03)
    const particles2 = createParticleSystem(400, theme.mode === "dark" ? 0x3b82f6 : 0x06b6d4, 0.02)
    scene.add(particles1, particles2)

    // Create simple geometric trees as placeholders
    const createTree = (x: number, z: number, scale = 1) => {
      const group = new THREE.Group()

      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 1 * scale, 8)
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: theme.mode === "dark" ? 0x4a5568 : 0x8b4513,
        roughness: 0.9,
      })
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
      trunk.position.y = 0.5 * scale
      trunk.castShadow = true
      group.add(trunk)

      // Leaves
      const leavesGeometry = new THREE.SphereGeometry(0.8 * scale, 12, 8)
      const leavesMaterial = new THREE.MeshStandardMaterial({
        color: theme.mode === "dark" ? 0x22c55e : 0x16a34a,
        roughness: 0.7,
      })
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
      leaves.position.y = 1.3 * scale
      leaves.castShadow = true
      group.add(leaves)

      group.position.set(x, 0, z)
      group.castShadow = true
      return group
    }

    // Create solar panel
    const createSolarPanel = (x: number, z: number) => {
      const group = new THREE.Group()

      // Panel
      const panelGeometry = new THREE.BoxGeometry(2, 0.1, 1.2)
      const panelMaterial = new THREE.MeshStandardMaterial({
        color: theme.mode === "dark" ? 0x1e40af : 0x1d4ed8,
        metalness: 0.8,
        roughness: 0.2,
      })
      const panel = new THREE.Mesh(panelGeometry, panelMaterial)
      panel.position.y = 1
      panel.rotation.x = -Math.PI / 6
      panel.castShadow = true
      group.add(panel)

      // Support
      const supportGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8)
      const supportMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.7,
        roughness: 0.3,
      })
      const support = new THREE.Mesh(supportGeometry, supportMaterial)
      support.position.y = 0.5
      support.castShadow = true
      group.add(support)

      group.position.set(x, 0, z)
      return group
    }

    // Create wind turbine
    const createWindTurbine = (x: number, z: number) => {
      const group = new THREE.Group()

      // Tower
      const towerGeometry = new THREE.CylinderGeometry(0.1, 0.15, 3, 8)
      const towerMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.8,
        roughness: 0.2,
      })
      const tower = new THREE.Mesh(towerGeometry, towerMaterial)
      tower.position.y = 1.5
      tower.castShadow = true
      group.add(tower)

      // Nacelle
      const nacelleGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.8)
      const nacelle = new THREE.Mesh(nacelleGeometry, towerMaterial)
      nacelle.position.set(0, 3, 0)
      nacelle.castShadow = true
      group.add(nacelle)

      // Blades
      const bladeGroup = new THREE.Group()
      for (let i = 0; i < 3; i++) {
        const bladeGeometry = new THREE.BoxGeometry(0.05, 1.5, 0.02)
        const bladeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.3,
          roughness: 0.4,
        })
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial)
        blade.position.y = 0.75
        blade.rotation.z = (i * Math.PI * 2) / 3
        blade.castShadow = true
        bladeGroup.add(blade)
      }
      bladeGroup.position.set(0, 3, 0.4)
      group.add(bladeGroup)

      group.position.set(x, 0, z)
      group.userData = { bladeGroup } // Store reference for animation
      return group
    }

    // Add objects to scene
    const trees = [
      createTree(-3, -2, 1.2),
      createTree(1, -4, 0.8),
      createTree(-1, 3, 1.0),
      createTree(4, 1, 0.9),
      createTree(-4, 4, 1.1),
    ]
    trees.forEach((tree) => scene.add(tree))

    const solarPanel = createSolarPanel(3, -1)
    scene.add(solarPanel)

    const windTurbine = createWindTurbine(-3, 2)
    scene.add(windTurbine)

    // Try to load GLTF models if available
    const loader = new GLTFLoader()

    // Try to load tree model
    loader.load(
      "/models/tree.glb",
      (gltf) => {
        const tree = gltf.scene
        tree.scale.set(0.5, 0.5, 0.5)
        tree.position.set(2, 0, 2)
        tree.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        scene.add(tree)
      },
      undefined,
      (error) => {
        console.log("Error loading tree model:", error)
        // Model failed to load, we already have fallbacks
      },
    )

    // Try to load solar panel model
    loader.load(
      "/models/solar_panel.glb",
      (gltf) => {
        const solarPanel = gltf.scene
        solarPanel.scale.set(0.3, 0.3, 0.3)
        solarPanel.position.set(-2, 0, -2)
        solarPanel.rotation.y = Math.PI / 4
        solarPanel.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        scene.add(solarPanel)
      },
      undefined,
      (error) => {
        console.log("Error loading solar panel model:", error)
        // Model failed to load, we already have fallbacks
      },
    )

    // Try to load wind turbine model
    loader.load(
      "/models/wind_turbine.glb",
      (gltf) => {
        const windTurbine = gltf.scene
        windTurbine.scale.set(0.4, 0.4, 0.4)
        windTurbine.position.set(2, 0, -2)
        windTurbine.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        scene.add(windTurbine)
      },
      undefined,
      (error) => {
        console.log("Error loading wind turbine model:", error)
        // Model failed to load, we already have fallbacks
      },
    )

    // Animation variables
    let time = 0

    const animate = () => {
      if (!isAnimating) return

      animationRef.current = requestAnimationFrame(animate)
      time += 0.016 // ~60fps

      controls.update()

      // Animate particles
      ;[particles1, particles2].forEach((particleSystem) => {
        const positions = particleSystem.geometry.attributes.position
        const velocities = particleSystem.geometry.attributes.velocity

        for (let i = 0; i < positions.count; i++) {
          positions.setY(i, positions.getY(i) + velocities.getY(i))
          positions.setX(i, positions.getX(i) + velocities.getX(i))
          positions.setZ(i, positions.getZ(i) + velocities.getZ(i))

          // Reset particles that go too high
          if (positions.getY(i) > 8) {
            positions.setY(i, 0)
            positions.setX(i, (Math.random() - 0.5) * 15)
            positions.setZ(i, (Math.random() - 0.5) * 15)
          }
        }
        positions.needsUpdate = true

        particleSystem.rotation.y += 0.001
      })

      // Animate wind turbine blades
      if (windTurbine.userData.bladeGroup) {
        windTurbine.userData.bladeGroup.rotation.z += 0.05
      }

      // Animate trees (gentle swaying)
      trees.forEach((tree, index) => {
        tree.rotation.z = Math.sin(time + index) * 0.02
      })

      // Use post-processing composer
      if (composerRef.current) {
        composerRef.current.render()
      } else if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera)
      }
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height)
      }
      if (composerRef.current) {
        composerRef.current.setSize(width, height)
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (composerRef.current) {
        composerRef.current.dispose()
      }
    }
  }, [width, height, theme.mode, isAnimating])

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

      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-24">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} mb-4`}>
            Beautiful Eco 3D Scene
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            An interactive 3D visualization of sustainable energy and nature
          </p>
        </div>

        <div className={`bg-gradient-to-r from-green-800 to-teal-900 rounded-xl shadow-2xl p-8 ${className}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  isAnimating ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {isAnimating ? "Pause Animation" : "Start Animation"}
              </button>
            </div>

            <div className="text-sm text-white">Drag to rotate • Scroll to zoom • Auto-rotation enabled</div>
          </div>

          <div
            ref={mountRef}
            className="relative rounded-lg overflow-hidden border-2 border-green-400 shadow-lg"
            style={{ width, height }}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-700 bg-opacity-70 rounded-lg">
              <h3 className="font-semibold text-green-200">🌳 Trees</h3>
              <p className="text-sm text-green-300">Carbon absorption & oxygen production</p>
            </div>
            <div className="p-4 bg-blue-700 bg-opacity-70 rounded-lg">
              <h3 className="font-semibold text-blue-200">☀️ Solar Energy</h3>
              <p className="text-sm text-blue-300">Clean renewable electricity</p>
            </div>
            <div className="p-4 bg-cyan-700 bg-opacity-70 rounded-lg">
              <h3 className="font-semibold text-cyan-200">💨 Wind Power</h3>
              <p className="text-sm text-cyan-300">Sustainable energy generation</p>
            </div>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default EcoScene3D
