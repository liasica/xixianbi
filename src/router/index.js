import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Online from '@/views/online'
import Cars from '@/views/cars'
import Energy from '@/views/energy'
import Complex from '@/views/complex'
import Station from '@/views/station/view'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/complex', name: 'complex', component: Complex },
    { path: '/online', name: 'online', component: Online },
    { path: '/cars', name: 'cars', component: Cars },
    { path: '/energy', name: 'energy', component: Energy },
    { path: '/station', name: 'station', component: Station }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const name = to.name || ''
    const prevName = from.name || ''
    document.body.classList.add(`page-${name.toLowerCase()}-body`)
    document.body.classList.remove(`page-${prevName.toLowerCase()}-body`)
    next()
})

export default router
