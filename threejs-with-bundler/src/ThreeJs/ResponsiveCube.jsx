import React, { useEffect, useRef } from "react";

import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  Clock,
} from "three";

export default function ResponsiveCube() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Canvas
    const canvas = canvasRef.current;

    // Scene
    const scene = new Scene();

    // Camera
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 3;

    // Geometry
    const geometry = new BoxGeometry(1, 1, 1);

    // Material
    const material = new MeshBasicMaterial({
      color: "red",
    });

    // Mesh
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // Renderer
    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });

    // Initial Size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Better sharpness on high DPI screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Resize Function
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);

      // Prevent super high GPU usage
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Resize Listener
    window.addEventListener("resize", handleResize);

    // Clock
    const clock = new Clock();

    // Animation Loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotation
      mesh.rotation.y = elapsedTime * 0.5;
      mesh.rotation.x = elapsedTime * 0.25;

      // Render
      renderer.render(scene, camera);

      // Next Frame
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}