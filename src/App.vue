<template>
  <div id="app" style="width:100%; height:100%">
    <div v-if="isLoading" class="loading">
      <span v-if="!isStart" class="text">加载中... {{ process }}</span>
      <div v-show="isStart" class="btn" @click="handleStart">点击开始</div>
    </div>
    <video style="width: 100%;display: none" :src="require('/public/model/1.mp4')" loop muted crossorigin="anonymous" playsinline id="video"></video>
    <div id="container" style="width:100%; height:100%"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
window.THREE = THREE
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      loading: '模型加载中...',
      x: 4000,
      y: 8000,
      z: -18000,
      renderer: null,
      controls: null,
      camera: null,
      cameras: [],
      url: '/model/3.gltf',
      cameraPosition: {
        x: '',
        y: '',
        z: ''
      },
      process: '',
      isLoading: true
    }
  },
  computed: {
    isStart () {
      return this.process === '100%'
    }
  },
  mounted () {
    // this.init()
    // this.init2()
    // this.handleClick()
    this.init7211()
  },
  methods: {
    handleStart () {
      this.isLoading = false
    },
    start ({ scene, camera, renderer, controls }) {
      const animate = () => {
        controls.update()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        this.cameraPosition.x = parseInt(camera.position.x)
        this.cameraPosition.y = parseInt(camera.position.y)
        this.cameraPosition.z = parseInt(camera.position.z)
      }
      requestAnimationFrame(animate)
    },
    init7211 () {
      const _this = this
      const scene = new THREE.Scene()
      scene.environment = new THREE.Texture()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 60, 100000)
      camera.position.set(4000, 8000, -18000)
      const materialMap = new Map([
        ['立方体4', {
          color: new THREE.Color(0X35F5FF),
          emissive: new THREE.Color(0X35F5FF),
          opacity: 1,
          side: THREE.DoubleSide,
          video: () => {
            const videoElement = document.getElementById('video')
            videoElement.play()
            const videoTexture = new THREE.VideoTexture(videoElement)
            return new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide })
          }
        }
        ],
        ['平面1', {
          color: new THREE.Color(0XEE0AB8),
          emissive: new THREE.Color(0XEE0AB8),
          opacity: 1,
          texture: new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('/model/feng.gif'),
            opacity: 1,
            side: THREE.DoubleSide
          })
          // texture: new THREE.TextureLoader().load('/model/1.mp4')
          // texture: new THREE.TextureLoader().load(() => {
          //   const element = document.createElement('img')
          //   element.src = 'https://img-blog.csdnimg.cn/20190930104023919.gif'
          //   return element
          // })
        }],
        ['立方体14', { color: new THREE.Color(0XFFFF00), emissive: new THREE.Color(0XFFFF00), opacity: 1 }],
        ['立方体15', { color: new THREE.Color(0X35F5FF), emissive: new THREE.Color(0X35F5FF), opacity: 1 }]
      ])
      new GLTFLoader().load('/model/801.gltf', gltf => {
        console.log('gltf: ', gltf)
        _this.loading = ''
        gltf.scene.traverse(function (child) {
          if (!child.isMesh) return
          const find = materialMap.get(child.name)
          // console.log('find: ', find)
          // console.log('scene: ', scene)
          // scene.environment =
          if (find) {
            const material = child.material
            for (const findKey in find) {
              material[findKey] = find[findKey]
              material[findKey] = find[findKey]
              material[findKey] = find[findKey]
            }
            if (find.texture) {
              child.material = find.texture
            }
            if (find.video) {
              child.material = find.video()
            }
          }
        })
        scene.add(gltf.scene)
      }, e => {
        _this.process = ((e.loaded / e.total) * 100).toFixed(0) + '%'
      })

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableRotate = true
      // controls.autoRotate = true
      // controls.autoRotateSpeed = 1
      // 设置相机距离原点的最远距离
      controls.minDistance = 5000
      // 设置相机距离原点的最远距离
      controls.maxDistance = 50000

      function createLight (x, y, z, color) {
        const pointLight = new THREE.PointLight(color, 1.5)
        pointLight.position.set(x, y, z)
        return pointLight
      }

      const lights = [
        // { x: 0, y: 100000, z: 0 },
        // { x: 10, y: 1.9, z: 4 },
        // { x: -10, y: 1.9, z: 4 },
        // { x: 3, y: 3, z: 3 },
        // { x: 0, y: 100000, z: 0 },
        // { x: 0, y: -100000, z: 0 }
      ].map(({ x, y, z }) => {
        return createLight(x, y, z, 0xFFFFFF)
      }).map(light => {
        scene.add(light)
      })
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      const loader = new RGBELoader()
      loader.setDataType(THREE.UnsignedByteType)
      pmremGenerator.compileEquirectangularShader()
      new RGBELoader().load('/model/2k.hdr', texture => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture
        console.log('envMap: ', envMap)
        scene.environment = envMap
        // one can also set scene.background to envMap here

        texture.dispose()
        pmremGenerator.dispose()
      })
      scene.add(new THREE.AmbientLight(0xffffff, 1).position.set(0, 55555, 0))
      console.log('lights: ', lights)
      // const light1 = createLight(0, 0, 25)
      // const light2 = createLight(9.625, 1.985, 4.262)
      // const light3 = createLight(-9.235, 1.022, 4.069)
      // const light4 = createLight(3.375, 3.266, 3.266)
      //
      // scene.add(light1)
      // scene.add(light2)
      // scene.add(light3)
      // scene.add(light4)
      renderer.setClearAlpha(0.2)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xFFFFFF)
      document.querySelector('#container').appendChild(renderer.domElement)
      this.setBackground({ scene })
      // this.helper({ scene, light1 })
      this.start({ scene, camera, controls, renderer })
      this.setMove({ camera })
      this.handleClick({ renderer, scene, camera })
    },
    helper ({ scene, light }) {
      const helper = new THREE.PointLightHelper(light, 5)
      scene.add(helper)
    },
    setMove ({ camera }) {
      console.log('camera: ', camera)
      document.addEventListener('keydown', ev => {
        switch (ev.key) {
          case 'ArrowUp':
          case 'w':
            console.log('向前')
            camera.position.z += 200
            break

          case 'ArrowDown':
          case 's':
            console.log('向后')
            camera.position.z -= 200
            break

          case 'ArrowLeft':
          case 'a':
            console.log('向左')
            camera.position.x += 200
            break

          case 'ArrowRight':
          case 'd':
            console.log('向右')
            camera.position.x -= 200
            break
        }
        camera.updateProjectionMatrix()
      })
    },
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
    handleBtnClick () {
      const { x, y, z } = this
      this.camera.position.set(x, y, z)
      this.camera.updateProjectionMatrix()
    },
    handleClick ({ renderer, scene, camera }) {
      renderer.domElement.addEventListener('click', e => {
        const intersects = getIntersects(e)[0]
        console.log('intersects: ', intersects.object)
        // intersects.object.material.color = new THREE.Color(0X35F5FF)
        // intersects.object.material.emissive = new THREE.Color(0X35F5FF)
        // intersects.object.material.opacity = 1
        // const { y } = intersects.object.position
        // camera.position.y = y
        // setTimeout(() => {
        //   alert(`点击了${intersects.object.name}`)
        // }, 1000)
      })

      function getIntersects (event) {
        event.preventDefault()
        const container = document.querySelector('#container')

        const x =
          ((event.clientX - container.getBoundingClientRect().left) /
            container.offsetWidth) *
          2 -
          1 // 标准设备横坐标

        // 这里的mainCanvas是个dom元素,getBoundingClientRectangle会返回当前元素的视口大小.

        const y =
          -(
            (event.clientY - container.getBoundingClientRect().top) /
            container.offsetHeight
          ) *
          2 +
          1 // 标准设备纵坐标

        const standardVector = new THREE.Vector3(x, y, 1) // 标准设备坐标

        // 标准设备坐标转世界坐标

        const worldVector = standardVector.unproject(camera)

        // 射线投射方向单位向量(worldVector坐标减相机位置坐标)

        const ray = worldVector.sub(camera.position).normalize()

        // 创建射线投射器对象

        const raycaster = new THREE.Raycaster(camera.position, ray)

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(scene.children, true)
        if (intersects.length > 0) {
          console.log('点击了物体')
        }

        // 返回选中的对象
        return intersects
      }
    },
    setHelp (light) {
      const helper = new THREE.DirectionalLightHelper(light, 5)
      this.scene.add(helper)
    },
    setBackground ({ scene }) {
      // 创建一个纹理图片加载器加载图片
      var textureLoader = new THREE.TextureLoader()
      // 加载背景图片
      var texture = textureLoader.load('/model/WechatIMG80.png')
      // 纹理对象Texture赋值给场景对象的背景属性.background
      scene.background = texture
    },
    init2 () {
      const container = document.querySelector('#container')
      this.scene = new THREE.Scene()
      // this.setBackground()
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 60, 100000)
      new GLTFLoader().load('/model/7211.gltf', (gltf) => {
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
      this.renderer.setClearAlpha(0.2)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xFFFFFF)
      // this.renderer.setPixelRatio(window.devicePixelRatio)
      // this.renderer.gammaOutput = true
      // this.renderer.gammaFactor = 2.2

      // const pmremGenerator = new THREE.PMREMGenerator(renderer)
      // pmremGenerator.compileEquirectangularShader()
      // // eslint-disable-next-line no-unused-expressions
      // pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
      // this.scene.environment = pmremGenerator
      container.appendChild(this.renderer.domElement)
      // const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)

      // this.scene.add(ambientLight) // 环境光

      // const light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
      // light1.position.set(-7, -7, 6.3)
      // this.scene.add(light1)
      //
      // const light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
      // this.scene.add(light2)
      const light = new THREE.DirectionalLight(0xffffff, 1) // 从正上方（不是位置）照射过来的平行光，0.45的强度
      light.position.set(-1, 2, 4)
      // light.target.position.set(0, 0, 0)

      // const light2 = new THREE.HemisphereLight(0xffffff, 1) // 从正上方（不是位置）照射过来的平行光，0.45的强度
      // light2.position.set(0, 100, 0)
      // light2.target.position.set(0, 0, 0)
      this.setHelp(light)
      this.scene.add(light)
      // this.scene.add(light2)
      // this.scene.add(this.light.target)

      // const lightPoint = new THREE.PointLight(0xE9E9E9, 0.9)
      // this.scene.add(lightPoint)

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

      // this.$refs.btn.addEventListener('click', e => {
      //   console.log('this.camera: ', this.camera)
      //   const {
      //     x,
      //     y,
      //     z
      //   } = this
      //   // this.camera.fov = 10
      //   this.camera.position.x = x
      //   this.camera.position.y = y
      //   this.camera.position.z = z
      //   console.log('this.camera.fov: ', this.camera.fov)
      //   this.camera.updateProjectionMatrix()
      // })

      const animate = () => {
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;

}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;

  .text {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .btn {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid white;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
}
</style>
