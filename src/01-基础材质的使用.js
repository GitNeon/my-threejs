import * as THREE from "three";
import door from './assets/door/color.jpg';
import minecraft from './assets/minecraft.png';
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

// 本节重点：加载图片材质
const textureLoader = new THREE.TextureLoader();
const texture_door_color = textureLoader.load(door);

// 材质的一些属性，例如纹理偏移，旋转，重复性等等
// texture_door_color.offset.x = 0.1;
// texture_door_color.offset.y = 0.1;


// 立方体与材质
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const basicMaterial = new THREE.MeshBasicMaterial({
    // color: "#40b2f8",
    // 加载颜色贴图, 注意，如果设置了color，图片会默认混合背景色
    map: texture_door_color,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 立方体与材质2
const texture_minecraft = textureLoader.load(minecraft);
// 重点：当材质不清晰时可以通过minFilter和magFilter这两个属性来设置材质采样规则
texture_minecraft.minFilter = THREE.NearestFilter;
texture_minecraft.magFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
const cubeGeometry2 = new THREE.BoxGeometry(3, 3, 3);
const basicMaterial2 = new THREE.MeshBasicMaterial({
    map: texture_minecraft,
});
const cube2 = new THREE.Mesh(cubeGeometry2, basicMaterial2);
cube2.position.x = 5;
scene.add(cube2);


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
