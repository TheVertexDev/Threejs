import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("#webgl");

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
);

camera.position.z = 3;

scene.add(camera);

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});

renderer.setSize(sizes.width, sizes.height);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit Controls - Enables mouse interaction with the scene (rotate, zoom, pan)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize
window.addEventListener("resize", () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;

    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Clock
const clock = new THREE.Clock();

// Animation
const animate = () => {

    const elapsedTime = clock.getElapsedTime();

    mesh.rotation.y = elapsedTime * 0.5;

    mesh.rotation.x = elapsedTime * 0.25;

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
};

animate();