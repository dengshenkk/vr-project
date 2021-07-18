<template>
  <div id="app" style="width:100%; height:100%">
    <div style="position: absolute">
      <input type="text" v-model="x">
      <input type="text" v-model="y">
      <input type="text" v-model="z">
      <button ref="btn" >按钮</button>
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
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      loading: '加载中...',
      x: -771,
      y: 854,
      z: -891
    }
  },
  mounted () {
    // this.init()
    this.init2()
  },
  methods: {
    init2 () {
      const container = document.querySelector('#container')
      var scene = new THREE.Scene()
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 60, 100000)
      new GLTFLoader().load('/model/3.gltf', function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            if (child.name === '圆盘') {
              const phongMaterial = new THREE.MeshPhongMaterial()
              child.envMap = phongMaterial
              child.material.envMap = new THREE.Texture()
              console.log('child: ', child)
            }
            // child.material.emissive = child.material.color
            // child.material.emissiveMap = child.material.map
          }
        })

        scene.add(gltf.scene)
        console.log('gltf模型加载成功: ', gltf)
        console.log('gltf对象场景属性', gltf.scene)
        console.log('gltf对象相机属性', gltf.cameras)
      }, undefined, function (error) {
        console.error(error)
      })

      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xFFFFFF)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.gammaOutput = true
      renderer.gammaFactor = 2.2

      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()
      // eslint-disable-next-line no-unused-expressions
      pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
      scene.environment = pmremGenerator
      container.appendChild(renderer.domElement)
      scene.add(new THREE.DirectionalLight(0xFFFFFF, 1))// 环境光
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableDamping = true
      // controls.enableRotate = true
      // controls.autoRotate = true
      // controls.rotateSpeed = 1
      console.log('controls: ', controls)
      const { x, y, z } = this
      camera.position.set(x, y, z)

      this.$refs.btn.addEventListener('click', e => {
        console.log('camera: ', camera)
        const { x, y, z } = this
        // camera.fov = 10
        camera.position.x = x
        camera.position.y = y
        camera.position.z = z
        console.log('camera.fov: ', camera.fov)
        camera.updateProjectionMatrix()
      })

      function animate () {
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.02
        controls.update()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
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
