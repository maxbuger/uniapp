import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'http://47.104.128.121:8542';

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
