import * as THREE        from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import door              from './assets/door/color.jpg';
import doorAlpha         from './assets/door/alpha.jpg';
import doorAo            from './assets/door/ambientOcclusion.jpg';
import doorRoughness     from './assets/door/roughness.jpg';
import doorHeight        from './assets/door/height.jpg';
import doorNormal        from './assets/door/normal.jpg';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);
scene.add(camera);


var div = document.createElement("div");
div.style.width = "200px";
div.style.height = "60px";
div.style.position = "fixed";
div.style.right = '0';
div.style.top = '0';
div.style.color = "#000";
document.body.appendChild(div);


let eventMap = {
    onLoad: (_) => {
        console.log('资源加载完成',_);
    },
    onProgress: (url, num, total) =>{
        console.log("资源加载完成:", url);
        console.log("资源加载进度:", num);
        console.log("资源总数:", total);
        let value = ((num / total) * 100).toFixed(2) + "%";
        console.log("加载进度的百分比：", value);
        div.innerHTML = value;
    },
    onError: (err) => {
        console.log('资源加载错误', err)
    }
}

// 加载管理器
const LoadingManager = new THREE.LoadingManager(
    eventMap.onLoad,
    eventMap.onProgress,
    eventMap.onError
);


const textureLoader = new THREE.TextureLoader(LoadingManager);
const texture_door_color = textureLoader.load(door);
const texture_door_aphla = textureLoader.load(doorAlpha);
const texture_door_ao = textureLoader.load(doorAo);
const texture_door_heights = textureLoader.load(doorHeight);
const texture_door_roughness = textureLoader.load(doorRoughness);
const texture_door_normal = textureLoader.load(doorNormal);


const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
console.log('cubeGeometry', cubeGeometry)
const basicMaterial = new THREE.MeshStandardMaterial({
    map: texture_door_color,
    transparent: true,
    opacity: 1,
    alphaMap: texture_door_aphla,
    aoMap: texture_door_ao,
    aoMapIntensity: 1,
    side: THREE.DoubleSide,
    displacementMap: texture_door_heights,
    displacementScale: 0.1,
    roughnessMap: texture_door_roughness,
    normalMap: texture_door_normal
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);
scene.add(cube);


const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
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
