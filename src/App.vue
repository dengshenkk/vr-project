<template>
  <div id="app" style="width:100%; height:100%">
    <div style="position: absolute">
      <input type="text" v-model="x">
      <input type="text" v-model="y">
      <input type="text" v-model="z">
      <button ref="btn">按钮</button>
    </div>
    <div class="this.camera" style="position: absolute; right: 0">
      <span v-for="(item,index) of this.cameras" :key="index" @click="handleCamera(item)">{{ item.name }}</span>
    </div>
    <!--<div>-->
    <!--  {{loading}}-->
    <!--</div>-->
    <div id="container" style="width:100%; height:100%"></div>

  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      loading: '加载中...',
      x: -771,
      y: 854,
      z: -891,
      renderer: null,
      controls: null,
      camera: null,
      cameras: [],
      url: '/model/3.gltf'
    }
  },
  mounted () {
    // this.init()
    this.init2()
    this.handleClick()
  },
  methods: {
    handleCamera (item) {
      console.log('this.scene: ', this.scene)
      console.log('item: ', item)
      const {
        x,
        y,
        z
      } = item.position
      this.camera.position.set(x, y, z)
    },
    handleClick () {
      var mouse = new THREE.Vector2()

      window.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, this.camera)
        var intersects = raycaster.intersectObjects(this.scene.children)

        if (intersects.length) {
          console.log('intersects: ', intersects)
        }
      })
      // if (intersects.length > 0) {
      //   if (INTERSECTED != intersects[0].object) {
      //     material.setValues({ color: 'purple' })
      //     if (INTERSECTED) { material.setValues({ color: 'yellow' }) };
      //     INTERSECTED = intersects[0].object
      //   }
      // } else {
      //   if (INTERSECTED) { material.setValues({ color: 'yellow' }) };
      //   INTERSECTED = null
      // }
    },
    init2 () {
      const container = document.querySelector('#container')
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 60, 100000)
      new GLTFLoader().load('/model/3.gltf', (gltf) => {
        this.cameras = gltf.cameras
        this.cameras.push({
          position: {
            x: -289.57681274414097,
            y: 855.6245117187495,
            z: -882
          },
          name: '自定义'
        })
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            if (child.name === '圆盘') {
              // if (!child.material.map) {
              //   child.material.map = {}
              //   child.material.map.encoding = sRGBEncoding
              // }
              // if (!child.material.emissiveMap) {
              //   child.material.emissiveMap = {}
              //   child.material.emissiveMap.encoding = sRGBEncoding
              // }
              // child.material.needsUpdate = true
              // var phongMaterial = new THREE.MeshPhongMaterial()
              // child.material = phongMaterial
              // child.material.side = THREE.DoubleSide
              // child.material.envMap = new THREE.TextureLoader().load('/model/DuckCM.png')
              // child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
              // child.material.envMap.envMapIntensity = 0.6
            }
            // child.material.emissive = child.material.color
            // child.material.emissiveMap = child.material.map
          }
        })

        this.scene.add(gltf.scene)
        console.log('gltf模型加载成功: ', gltf)
        // console.log('gltf对象场景属性', gltf.scene)
        // console.log('gltf对象相机属性', gltf.cameras)
      }, undefined, function (error) {
        console.error(error)
      })

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xFFFFFF)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.gammaOutput = true
      this.renderer.gammaFactor = 2.2

      // const pmremGenerator = new THREE.PMREMGenerator(renderer)
      // pmremGenerator.compileEquirectangularShader()
      // // eslint-disable-next-line no-unused-expressions
      // pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
      // this.scene.environment = pmremGenerator
      container.appendChild(this.renderer.domElement)
      this.scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2)) // 环境光
      // this.scene.add(new THREE.DirectionalLight(0xFFFFFF, 0.45))// 平行光
      this.light = new THREE.DirectionalLight(0xffffff) // 从正上方（不是位置）照射过来的平行光，0.45的强度
      // this.light.position.set(0, 0, -1000)
      // this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // controls.enableDamping = true
      // controls.enableRotate = true
      // controls.autoRotate = true
      // controls.rotateSpeed = 1
      const {
        x,
        y,
        z
      } = this
      this.camera.position.set(x, y, z)

      this.$refs.btn.addEventListener('click', e => {
        console.log('this.camera: ', this.camera)
        const {
          x,
          y,
          z
        } = this
        // this.camera.fov = 10
        this.camera.position.x = x
        this.camera.position.y = y
        this.camera.position.z = z
        console.log('this.camera.fov: ', this.camera.fov)
        this.camera.updateProjectionMatrix()
      })

      const animate = () => {
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.02
        this.controls.update()
        requestAnimationFrame(animate)
        this.renderer.render(this.scene, this.camera)
      }
      animate()
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height: 100%;

}
</style>
