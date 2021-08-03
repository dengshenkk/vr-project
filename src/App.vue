<template>
  <div id="app" style="width:100%; height:100%">
    <!--<div v-if="isLoading" class="loading">-->
    <!--  <span v-if="!isStart" class="text">加载中... {{ process }}</span>-->
    <!--  <div v-show="isStart" class="btn" @click="handleStart">点击开始</div>-->
    <!--</div>-->
    <video src="./assets/start.mp4" playsinline crossorigin="anonymous" id="start" autoplay
           style="width: 100%;" muted></video>
    <video src="./assets/end.mp4" playsinline crossorigin="anonymous" id="end"
           style="width: 100%;display: none"></video>
    <div id="full" v-show="currentVideo">
      <video v-show="currentVideo" id="videoBox" crossorigin="anonymous"
             playsinline></video>
    </div>
    <video
      v-for="(item, index) of videos"
      :key="index"
      style="width: 100%;height: 100%; display: none"
      :src="item.src"
      loop
      muted
      crossorigin="anonymous"
      playsinline
      :id="item.id"
    ></video>
    <div id="container" style="width:100%; height:100%;display: none"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
window.THREE = THREE
export default {
  name: 'App',
  components: {},
  data () {
    return {
      loading: '模型加载中...',
      x: 2222,
      y: 13500,
      z: -32000,
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
      isLoading: true,
      currentVideo: '',
      videos: [
        {
          id: '立方体4',
          // eslint-disable-next-line import/no-absolute-path
          src: require('./assets/1.mp4')
        },
        {
          id: '立方体14',
          // eslint-disable-next-line import/no-absolute-path
          src: require('./assets/1.mp4')
        },
        {
          id: '立方体15',
          // eslint-disable-next-line import/no-absolute-path
          src: require('./assets/1.mp4')
        },
        {
          id: '平面1',
          // eslint-disable-next-line import/no-absolute-path
          src: require('./assets/1.mp4')
        },
        {
          id: '立方体8',
          // eslint-disable-next-line import/no-absolute-path
          src: require('./assets/end.mp4')
        }
      ]
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
    this.$nextTick(() => {
      this.enterStartVideo()
      this.init7211()
    })
  },
  methods: {
    enterStartVideo () {
      const element = document.querySelector('#start')
      element.addEventListener('load', _ => {
        element.play()
        setTimeout(() => {
          element.muted = false
        }, 500)
        document.body.addEventListener('click', _ => {
          element.muted = false
        })
        document.body.addEventListener('touchend', _ => {
          element.muted = false
        })
      })

      element.addEventListener('ended', () => {
        element.parentElement.removeChild(element)
        document.querySelector('#container').style.display = 'block'
      })
    },
    handleStart () {
      this.isLoading = false
    },
    start ({ scene, camera, renderer, controls }) {
      this.scene = scene
      this.camera = camera
      this.renderer = renderer
      this.controls = controls
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
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        60,
        100000
      )
      camera.position.set(this.x, this.y, this.z)
      const materialMap = new Map([
        [
          '立方体4',
          {
            color: new THREE.Color(0x35f5ff),
            emissive: new THREE.Color(0x35f5ff),
            opacity: 1,
            side: THREE.DoubleSide,
            video: () => {
              const videoElement = document.getElementById('立方体4')
              videoElement.play()
              const videoTexture = new THREE.VideoTexture(videoElement)
              videoTexture.flipY = false
              return new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide
              })
            }
          }
        ],
        [
          '平面1',
          {
            color: new THREE.Color(0xee0ab8),
            emissive: new THREE.Color(0xee0ab8),
            opacity: 1,
            video: () => {
              const videoElement = document.getElementById('平面1')
              videoElement.play()
              const videoTexture = new THREE.VideoTexture(videoElement)
              videoTexture.flipY = false
              return new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide
              })
            }
          }
        ],
        [
          '立方体14',
          {
            color: new THREE.Color(0xffff00),
            emissive: new THREE.Color(0xffff00),
            opacity: 1,
            video: () => {
              const videoElement = document.getElementById('立方体14')
              videoElement.play()
              const videoTexture = new THREE.VideoTexture(videoElement)
              videoTexture.flipY = false
              return new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide
              })
            }
          }
        ],
        [
          '立方体15',
          {
            color: new THREE.Color(0x35f5ff),
            emissive: new THREE.Color(0x35f5ff),
            opacity: 1,
            video: () => {
              const videoElement = document.getElementById('立方体15')
              videoElement.addEventListener('load', e => {
                e.play()
              })
              const videoTexture = new THREE.VideoTexture(videoElement)
              videoTexture.flipY = false
              return new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide
              })
            }
          }
        ]
      ])
      new GLTFLoader().load(
        '/model/801.gltf',
        gltf => {
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
        },
        e => {
          _this.process = ((e.loaded / e.total) * 100).toFixed(0) + '%'
        }
      )

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
        {
          x: 58800,
          y: 46700,
          z: -51000
        },
        {
          x: -33900,
          y: 33600,
          z: 4348
        },
        {
          x: -13000,
          y: 16000,
          z: 56000
        }
      ].map(({
        x,
        y,
        z
      }) => {
        return createLight(x, y, z, 0xffffff)
      })
        .map(light => {
          scene.add(light)
        })

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5)
      directionalLight1.position.set(744, -16000, 6400)
      scene.add(directionalLight1)

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2)
      directionalLight2.position.set(-290, 28000, -1900)
      scene.add(directionalLight1)
      scene.add(directionalLight2)
      // const water = new Water(renderer, camera, scene, {
      //   textureWidth: 512,
      //   textureHeight: 512,
      //   waterNormals: new THREE.TextureLoader().load('/model/water.gif', texture => {
      //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      //   }),
      //   alpha: 1.0,
      //   sunDirection: new THREE.Vector3(),
      //   sunColor: 0xffffff,
      //   waterColor: 0x001e0f,
      //   distortionScale: 50.0,
      //   fog: 1
      // })

      // const mirrorMesh = new THREE.Mesh(
      //   new THREE.PlaneBufferGeometry(500, 500),
      //   water.material
      // )
      //
      // mirrorMesh.add(water)
      // mirrorMesh.rotation.x = -Math.PI * 0.5
      // scene.add(mirrorMesh)

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
      this.start({
        scene,
        camera,
        controls,
        renderer
      })
      this.setMove({ camera })
      this.handleClick({
        renderer,
        scene,
        camera,
        controls
      })
    },
    helper ({
      scene,
      light
    }) {
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
      const {
        x,
        y,
        z
      } = this
      this.camera.position.set(x, y, z)
      this.camera.updateProjectionMatrix()
    },
    handleClick ({
      renderer,
      scene,
      controls,
      camera
    }) {
      const _this = this
      renderer.domElement.addEventListener('click', e => {
        const intersects = getIntersects(e)[0]
        const find = this.videos.find(item => intersects.object.name === item.id)
        if (find) {
          playVideo(find)
          return
        }
        if (intersects.name === '挤压5_1') {
          // 地面
          // const { x, y, z } = intersects.point
          camera.position.z += 0.1
          camera.updateProjectionMatrix()
          camera.lookAt()
        }
        console.log('intersects: ', intersects)
      })

      function playVideo (find) {
        console.log('find: ', find)
        const element = document.querySelector('#videoBox')
        // element.src = '//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        element.src = find.src
        _this.currentVideo = find
        element.play()
        element.addEventListener('ended', e => {
          _this.currentVideo = null
        })
      }

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

#full {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
  }
}
</style>
