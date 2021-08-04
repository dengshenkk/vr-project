<template>
  <div id="app" style="width:100%; height:100%">
    <!--<div v-if="isLoading" class="loading">-->
    <!--  <span v-if="!isStart" class="text">加载中... {{ process }}</span>-->
    <!--  <div v-show="isStart" class="btn" @click="handleStart">点击开始</div>-->
    <!--</div>-->
    <video id="start" autoplay crossorigin="anonymous" muted playsinline
           src="//cdn.haijinsha.top/start.mp4" style="width: 100%;"></video>
    <video id="end" crossorigin="anonymous" playsinline src="//cdn.haijinsha.top/end.mp4"
           style="width: 100%;display: none"></video>
    <div v-show="currentVideo" id="full">
      <video v-show="currentVideo" id="videoBox" crossorigin="anonymous"
             playsinline></video>
    </div>
    <video
      v-for="(item, index) of videos"
      :id="item.id"
      :key="index"
      :src="item.src"
      crossorigin="anonymous"
      loop
      muted
      playsinline
      preload="auto"
      style="width: 100%;height: 100%; display: none"
    ></video>
    <div id="container" style="width:100%; height:100%;display: none"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import TWEEN from 'tween'
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
          name: 'fun',
          // eslint-disable-next-line import/no-absolute-path
          src: '//cdn.haijinsha.top/fun.mp4',
          fullSrc: ''
        },
        {
          id: '立方体14',
          name: 'art',
          // eslint-disable-next-line import/no-absolute-path
          src: '//cdn.haijinsha.top/art.mp4',
          fullSrc: ''
        },
        {
          id: '立方体15',
          name: '4c',
          // eslint-disable-next-line import/no-absolute-path
          src: '//cdn.haijinsha.top/4c.mp4',
          fullSrc: ''
        },
        {
          id: '平面1',
          name: 'creation',
          // eslint-disable-next-line import/no-absolute-path
          src: '//cdn.haijinsha.top/creation.mp4',
          fullSrc: ''
        },
        {
          id: '立方体8',
          // eslint-disable-next-line import/no-absolute-path
          src: '//cdn.haijinsha.top/end.mp4',
          fullSrc: ''
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
      setTimeout(() => {
        this.init7211()
      }, 10)
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
        TWEEN.update()
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
        50,
        window.innerWidth / window.innerHeight,
        0.1,
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
              videoTexture.needsUpdate = true
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
              videoTexture.needsUpdate = true
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
              videoTexture.needsUpdate = true
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
              videoElement.play()
              const videoTexture = new THREE.VideoTexture(videoElement)
              videoTexture.needsUpdate = true
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
        '//cdn.haijinsha.top/801.gltf',
        gltf => {
          console.log('gltf: ', gltf)
          _this.loading = ''
          gltf.scene.traverse(function (child){
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
      controls.minDistance = 1
      // 设置相机距离原点的最远距离
      controls.maxDistance = 60000
      controls.minPolarAngle = 0
      controls.maxPolarAngle = 1.2

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
        console.log('点击了', intersects.object.name, intersects)
        if (find) {
          playVideo(find)
          return
        }
        if (intersects.object.name === '挤压5_1') {
          // 地面
          const { x, y, z } = intersects.point
          console.log('camera.position: ', camera.position.y, x, y, z)
          const curPosition = this.camera.position
          const controlsTar = this.controls.target
          const option = {
            position: [x + 100, y, z + 100],
            controls: [x, y, z],
            duration: 2500,
            easing: TWEEN.Easing.Cubic.In
          }
          option.position = option.position || [curPosition.x, curPosition.y, curPosition.z] // 相机新的位置
          option.controls = option.controls || [controlsTar.x, controlsTar.y, controlsTar.z] // 控制器新的中心点位置(围绕此点旋转等)
          option.duration = option.duration || 1000 // 飞行时间
          option.easing = option.easing || TWEEN.Easing.Linear.None
          const tween = new TWEEN.Tween({
            number: 0,
            x1: curPosition.x, // 相机当前位置x
            y1: curPosition.y, // 相机当前位置y
            z1: curPosition.z, // 相机当前位置z
            x2: controlsTar.x, // 控制当前的中心点x
            y2: controlsTar.y, // 控制当前的中心点y
            z2: controlsTar.z // 控制当前的中心点z
          }).to({
            number: 1, // 用于 0 - 1 之间取值
            x1: option.position[0], // 新的相机位置x
            y1: option.position[1], // 新的相机位置y
            z1: option.position[2], // 新的相机位置z
            x2: option.controls[0], // 新的控制中心点位置x
            y2: option.controls[1], // 新的控制中心点位置x
            z2: option.controls[2] // 新的控制中心点位置x
          }, option.duration).easing(option.easing) // TWEEN.Easing.Cubic.InOut //匀速
          tween.onStart(() => {
            this.controls.enabled = false
            console.log('start')
            // if (option.start instanceof Function) { option.start(tween._object); }
          })
          tween.onUpdate(e => {
            this.controls.enabled = false
            const x1 = (option.position[0] - curPosition.x) * e + curPosition.x
            const y1 = (option.position[1] - curPosition.y) * e + curPosition.y
            const z1 = (option.position[2] - curPosition.z) * e + curPosition.z
            const x2 = (option.controls[0] - controlsTar.x) * e + controlsTar.x
            const y2 = (option.controls[1] - controlsTar.y) * e + controlsTar.y
            const z2 = (option.controls[2] - controlsTar.z) * e
            this.camera.position.set(x1, y1, z1)
            this.controls.target.set(x2, y2, z2)
            this.controls.update()
          })
          tween.onComplete(() => {
            this.controls.enabled = true
          })
          console.log('tween: ', tween.start())
          tween.start()
          return tween
        }
        console.log('intersects: ', intersects)
      })

      function playVideo (find) {
        console.log('find: ', find)
        const element = document.querySelector('#videoBox')
        // element.src = '//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        element.src = find.fullSrc || find.src
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
      var texture = textureLoader.load('//cdn.haijinsha.top/sceneBG.jpg')
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
