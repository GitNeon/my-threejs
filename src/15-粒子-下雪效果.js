/**
 * @Author: fanx
 * @Date: 2022年12月19日 17:47
 * @Description: file content
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import snowImg from './assets/particles/1.png';
import Snow from "./helper/snow";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 160);
camera.lookAt(scene.position)
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const snow = new Snow(1000, 100, snowImg)
console.log('snow', snow);
scene.add(snow.particle)

function render() {

    controls.update();
    snow.snowing(.1, .03);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();
