import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole'
// eslint-disable-next-line no-new
new VConsole()
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
