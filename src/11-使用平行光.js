/**
 * @Author: fanx
 * @Date: 2022年12月19日 10:32
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
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加一个平面
const planeGeometry = new THREE.PlaneGeometry(20, 10);
const material = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 3.平面接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 添加一个球体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material2 = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material2);
// 2. 物体投射阴影
sphere.castShadow = true;
scene.add(sphere);

// 4.设置点光源、平行光，聚光灯等，也就是说除了环境光是均匀影响物体外，
// 其他几个光源都可以看到阴影的效果
// 使用平行光的例子：
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.castShadow = true;
directionalLight.position.set(5, 5, 5);
scene.add( directionalLight );
// 添加这个Hepler可以知道平行光的位置
const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 1.渲染器启用阴影
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置环境光，如果选择了受环境光影响的物体材质，则物体的颜色会和环境光一致
const light = new THREE.AmbientLight( new THREE.Color('rgb(201,200,200)') )
scene.add(light);

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();
