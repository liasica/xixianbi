import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './plugins'

import axios from './utils/axios'

import App from './App'
import router from './router'
import store from './store'

import '@/assets/less/style.less'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.$axios = axios

// Vue.config.ignoredElements = ['a-scene', 'a-sky', 'a-assets', 'a-entity', 'a-image']

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
