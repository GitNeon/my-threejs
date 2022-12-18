import * as THREE        from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader }    from "three/examples/jsm/loaders/RGBELoader";
import hdr002            from "./assets/hdr/002.hdr";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 30);
scene.add(camera);

// 通过RGBELoader加载hdr贴图,使得色彩更加真是
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync(hdr002).then(texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
})

const sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
const material = new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0.01,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);


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
