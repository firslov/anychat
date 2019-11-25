// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// socket.io
import VueSocketIO from 'vue-socket.io'

// console.log("process.env.HOST_IP: "+process.env.HOST_IP)
const server_host = "http://121.36.5.83"

Vue.use(new VueSocketIO({
  debug: true,
  connection: server_host + ':3000', // socket地址:端口号
  //       vuex: {       // 不需要用到vuex这个可以不加
  //             store,
  //             actionPrefix: 'SOCKET_',
  //             mutationPrefix: 'SOCKET_'
  //       }
}))

// 使用根路径拼接时,请求路径使用相对路径,前面不加/
Vue.http.options.root = server_host + ':5000';
// 全局启用 emulateJSON 选项
Vue.http.options.emulateJSON = true

Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
