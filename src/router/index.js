import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Online from '@/views/online'
import Cars from '@/views/cars'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/online', name: 'online', component: Online },
    { path: '/cars', name: 'cars', component: Cars }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
