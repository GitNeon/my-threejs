import * as THREE from "three";

class Snow {
    #time = 0
    #textureLoader = new THREE.TextureLoader()

    constructor(num = 0, range = 0, texture = '') {
        this.num = num
        this.range = range
        this.particle = null
        this.texture = texture
        this.texturesMaps = []
        this.position = null
        this.gen()
    }

    gen() {
        const {num, range, texture,} = this
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.PointsMaterial({
            size: 2,
            transparent: true,
            opacity: .6,
            depthWrite: false,
            vertexColors: true,
            map: this.#textureLoader.load(texture),
            blending: THREE.AdditiveBlending // 将黑色雪花与背景色融合
        })
        const position = [] // 每个粒子的位置
        const colors = []
        console.log(num)
        for (let x = 0; x < num; x++) {
            // 采用HSL颜色模式使得雪花明暗度变化
            const color = new THREE.Color()
            const asHSL = {h: 0, s: 0, l: 0}
            color.getHSL(asHSL)
            color.setHSL(asHSL.h, asHSL.s, asHSL.l * Math.random())
            colors.push(color.r, color.g, color.b)

            // 生成随机点坐标
            position.push(
                randomRange(-100, 100),
                randomRange(-100, 100),
                randomRange(-100, 100),
            )

        }
        this.position = new THREE.Float32BufferAttribute(position, 3)
        geometry.setAttribute('position', this.position)
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        this.particle = new THREE.Points(geometry, material)
    }

    snowing(speed = 0, fps = 0) {
        this.#time += 1
        if (fps > 0) {
            if (this.#time < fps * 60) return
            this.#time = 0
        }
        const { position, range } = this
        for (let i = 0; i < position.count; i++) {
            let pos_x = position.getX(i)
            let pos_y = position.getY(i)
            let pos_z = position.getZ(i)


            // let num = Math.random();
            // let a = Number(num.toFixed(1))
            //
            // pos_x =  a > 0.5 ? pos_x + speed : pos_x - speed
            pos_x -= speed;
            pos_y -= speed
            pos_z -= speed

            if (pos_x < -range) pos_x = range
            if (pos_y < -range) pos_y = range
            if (pos_z < -range) pos_z = range

            // position.setX(i, pos_x)
            position.setY(i, pos_y)
            // position.setZ(i, pos_z)
        }

        // 更新 position
        position.needsUpdate = true
    }
}

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

export default Snow
