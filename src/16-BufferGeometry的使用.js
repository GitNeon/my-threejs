import * as THREE        from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * 有关BufferGeometry的解释
 * https://blog.csdn.net/qq_34695703/article/details/110431789
 */

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

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 每一行是一个点的x y z 值，我们按顺序存储每一个点的坐标，这里我们声明了六个点
let positions = new Float32Array([
    -10, 0, 0, // 0
    10, 0, 0, // 1
    0, 10, 0, // 2
    0, 0, 5, // 3
    0, 10, 5, // 4
    0, 0, 15 // 5
]);


// 定义好顶点数组后，我们将顶点设置到 BufferGeometry 中，代码如下。
// 其中，THREE.BufferAttribute(positions, 3) 中第二个参数 3 指的是数组 positions 中每三个元素构成一个点，
// 分别表示x y z 值。
const geometry = new THREE.BufferGeometry();
geometry.attributes.position = new THREE.BufferAttribute(positions, 3);

const basicMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#40B2F8'),
    side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometry, basicMaterial);
scene.add(mesh);



function render() {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

render();
