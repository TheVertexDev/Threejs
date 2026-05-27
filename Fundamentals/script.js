import * as THREE from 'three';

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);


let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
    color: "red"
});
let mesh = new THREE.Mesh(box, material);


scene.add(mesh);


const canvas = document.querySelector('#webgl');
let renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Basic Animation

// This clock is used to keep track of time, which can be useful for animations that need to be time-based rather than frame-based.
let clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    let elapsedTime = clock.getElapsedTime();
    mesh.rotation.y = elapsedTime * 0.5; // Rotate the mesh around the y-axis at a speed of 0.5 radians per second
    mesh.rotation.x = elapsedTime * 0.25; // Rotate the mesh around the x-axis at a speed of 0.25 radians per second
    renderer.render(scene, camera);
}

animate();