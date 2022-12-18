import * as THREE        from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import px                from './assets/environmentMaps/1/px.jpg';
import nx                from './assets/environmentMaps/1/nx.jpg';
import py                from './assets/environmentMaps/1/py.jpg';
import ny                from './assets/environmentMaps/1/ny.jpg';
import pz                from './assets/environmentMaps/1/pz.jpg';
import nz                from './assets/environmentMaps/1/nz.jpg';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 加载立方纹理,由6个图片组成
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
    px, nx, py, ny, pz, nz
]);

const sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
const material = new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0.1,
    // 这个是只针对某个材质
    envMap: envMapTexture
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 给场景添加背景
scene.background = envMapTexture;
// 给场景所有的物体添加默认的环境贴图,这个是全局设定
// scene.environment = envMapTexture;

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});
