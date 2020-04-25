import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/less/style.less'

Vue.config.productionTip = false

// Vue.config.ignoredElements = ['a-scene', 'a-sky', 'a-assets', 'a-entity', 'a-image']

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
