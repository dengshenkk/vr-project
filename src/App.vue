<template>
  <div id="app" style="width:100%; height:100%">
    <button ref="btn" style="position: absolute">按钮</button>
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
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      loading: '加载中...'
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
      // var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 60.7, 600700)
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 60, 100000)
      new GLTFLoader().load('/model/3.gltf', function (gltf) {
        gltf.scene.traverse(function (child) {
          console.log('child: ', child)
          if (child.isMesh) {
            child.material.emissive = child.material.color
            child.material.emissiveMap = child.material.map
          }
        })
        gltf.scene.scale.set(10, 10, 10)

        scene.add(gltf.scene)
        // scene.add(new THREE.AmbientLight(0x666666))// 环境光
        console.log('gltf模型加载成功: ', gltf)
        console.log('gltf对象场景属性', gltf.scene)
        console.log('gltf对象相机属性', gltf.cameras)
      }, undefined, function (error) {
        console.error(error)
      })
      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xCCCCCC)
      container.appendChild(renderer.domElement)
      // var geometry = new THREE.BoxGeometry(1, 1, 1)
      // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // var cube = new THREE.Mesh(geometry, material)
      // scene.add(cube)

      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableDamping = true
      // controls.enableRotate = true
      // controls.autoRotate = true
      // controls.rotateSpeed = 1
      console.log('controls: ', controls)

      camera.position.set(1000, 1000, 5003)
      document.addEventListener('click', e => {
        console.log(e)
      })

      this.$refs.btn.addEventListener('click', e => {
        console.log('camera: ', camera)
        camera.fov -= 1
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
    },
    init () {
      const _this = this
      const loader = new GLTFLoader()
      const scene = new THREE.Scene()
      loader.load('/model/duck.gltf', function (gltf) {
        scene.add(gltf.scene)
        console.log('gltf模型加载成功: ', gltf)
        _this.loading = 'gltf模型加载成功'
      }, undefined, function (error) {
        console.error(error)
      })
      const container = document.querySelector('#container')
      const renderer = new THREE.WebGLRenderer()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0, 5)
      container.appendChild(renderer.domElement)
      const controls = new OrbitControls(camera, renderer.domElement)
      console.log('controls: ', controls)
      function animate () {
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
