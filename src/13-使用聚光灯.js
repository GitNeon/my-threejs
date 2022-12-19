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
camera.position.set(0, 0, 20);
camera.lookAt(scene.position)
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
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material2 = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material2);
// 2. 物体投射阴影
sphere.castShadow = true;
scene.add(sphere);

// 聚光灯
// 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(5, 6, 2);
spotLight.castShadow = true;
spotLight.target = sphere;
spotLight.angle = 0.5;
// spotLight.shadow.camera.near = 10;
// spotLight.shadow.camera.far = 200;
// spotLight.shadow.camera.fov = 10;
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(1024, 1024);
scene.add( spotLight );
// 可以看到点光源的位置
const spotLightHelper = new THREE.SpotLightHelper( spotLight, 0xffffff );
scene.add( spotLightHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 1.渲染器启用阴影
renderer.shadowMap.enabled = true;
// 是否使用物理上正确的光照模式
// renderer.physicallyCorrectLights = true;
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

    sphere.rotation.x += 0.1;

    requestAnimationFrame(render);
}

render();
