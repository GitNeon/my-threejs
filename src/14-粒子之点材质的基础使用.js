/**
 * @Author: fanx
 * @Date: 2022年12月19日 17:47
 * @Description: file content
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 20);
camera.lookAt(scene.position)
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 立方体
const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 10,10,10);
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 0.1;
pointMaterial.color.set(0xfff000);
const pointBox = new THREE.Points(boxGeometry, pointMaterial);
scene.add(pointBox);

function render() {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

render();
