/**
 * @Author: fanx
 * @Date: 2022年12月19日 17:47
 * @Description: file content
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dotPicture from './assets/particles/1.png';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 30);
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
// 点材质
const pointMaterial = new THREE.PointsMaterial();
pointMaterial.size = 0.3;
pointMaterial.color.set(new THREE.Color('#68c3fc'));

// 点材质默认是小方块，可以给这个小方块添加材质
const textureLoader = new THREE.TextureLoader();
const dotTexture = textureLoader.load(dotPicture);

pointMaterial.map = dotTexture;
pointMaterial.alphaMap = dotTexture;
pointMaterial.transparent = true;
pointMaterial.depthWrite = false;
// pointMaterial.blending = THREE.AdditiveBlending;

const pointBox = new THREE.Points(boxGeometry, pointMaterial);
scene.add(pointBox);

// 球体
const sphereGeometry = new THREE.SphereGeometry(6,20,20);
const pointSphere = new THREE.Points(sphereGeometry, pointMaterial);
pointSphere.position.x = 20;
scene.add(pointSphere)

function render() {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

render();
