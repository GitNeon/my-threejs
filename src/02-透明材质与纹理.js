import * as THREE from "three";
import door from './assets/door/color.jpg';
import doorAlpha from './assets/door/alpha.jpg';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// 加载透明材质
const textureLoader = new THREE.TextureLoader();
const texture_door_color = textureLoader.load(door);
const texture_door_aphla = textureLoader.load(doorAlpha);



// 立方体与材质
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const basicMaterial = new THREE.MeshBasicMaterial({
    // color: "#40b2f8",
    // 加载颜色贴图, 注意，如果设置了color，图片会默认混合背景色
    map: texture_door_color,
    transparent: true,
    // opacity: 0.7,
    alphaMap: texture_door_aphla,
    side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);


// webgl渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
