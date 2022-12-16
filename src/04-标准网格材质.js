import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import door from './assets/door/color.jpg';
import doorAlpha from './assets/door/alpha.jpg';
import doorAo from './assets/door/ambientOcclusion.jpg';
import doorHeight from './assets/door/height.jpg';

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 20);
scene.add(camera);


const textureLoader = new THREE.TextureLoader();
const texture_door_color = textureLoader.load(door);
const texture_door_aphla = textureLoader.load(doorAlpha);
const texture_door_ao = textureLoader.load(doorAo);
const texture_door_heights = textureLoader.load(doorHeight);


// 立方体与材质
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
console.log('cubeGeometry',cubeGeometry)
const basicMaterial = new THREE.MeshStandardMaterial({
    // 默认贴图
    map: texture_door_color,
    // 允许透明
    transparent: true,
    // 透明度
    opacity: 1,
    // alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）
    alphaMap: texture_door_aphla,
    // 环境遮挡贴图,aoMap需要第二组UV
    aoMap: texture_door_ao,
    // 环境遮挡效果的强度。默认值为1
    aoMapIntensity: 1,
    side: THREE.DoubleSide,
    displacementMap: texture_door_heights,
    displacementScale: 0.1
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
// 给cube添加第二组uv
cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);
scene.add(cube);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(light);

// webgl渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

// 轨道控制器
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


// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
});
