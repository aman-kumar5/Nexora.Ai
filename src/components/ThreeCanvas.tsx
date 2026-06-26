import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 300;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // Optimized Particle network
    const particlesCount = 125;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPrimary = new THREE.Color("#ffd700");   // Forsythia Yellow (Logo matched)
    const colorSecondary = new THREE.Color("#ffa300"); // Deep Saffron (Logo matched)
    const colorTeal = new THREE.Color("#0f2631");      // Nocturnal Expedition (Logo matched)

    for (let i = 0; i < particlesCount; i++) {
      const r = 60 + Math.random() * 15;
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixRatio = Math.random();
      const color = colorPrimary.clone().lerp(mixRatio > 0.5 ? colorSecondary : colorTeal, mixRatio);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom round dot
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 5.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Optimized Icosahedron Wireframe with bright glowing Forsythia Yellow
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffd700, // Glowing Forsythia Yellow (Logo matched) for high visibility in dark mode
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const sphereGeometry = new THREE.IcosahedronGeometry(72, 1);
    const sphereLines = new THREE.LineSegments(
      new THREE.WireframeGeometry(sphereGeometry),
      lineMaterial
    );
    scene.add(sphereLines);

    // Mouse coordinate offsets
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.08;
      targetY = (e.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Slower, majestic rotation speeds
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotates slower (0.015 and 0.0075) for a premium, stable feel
      particleSystem.rotation.y = elapsedTime * 0.015;
      particleSystem.rotation.x = elapsedTime * 0.0075;

      sphereLines.rotation.y = elapsedTime * 0.015;
      sphereLines.rotation.x = elapsedTime * 0.0075;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particleSystem.position.x = mouseX;
      particleSystem.position.y = -mouseY;

      sphereLines.position.x = mouseX;
      sphereLines.position.y = -mouseY;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none z-0" />;
};
