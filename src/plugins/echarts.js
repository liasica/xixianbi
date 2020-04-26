import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 引入 ECharts GL扩展
import 'echarts-gl'

// 注册全局组件
Vue.component('v-chart', ECharts)
