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

export default function Cube() {
  const canvasRef = useRef(null);

  useEffect(() => {
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
    scene.add(camera);

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
      canvas: canvasRef.current,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Clock
    const clock = new Clock();

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.y = elapsedTime * 0.5;
      mesh.rotation.x = elapsedTime * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}