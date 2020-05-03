import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.use(VueSocketio, socketio('ws://192.168.1.4:8081'));

import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)

new Vue({
  render: h => h(App),
}).$mount('#app')
