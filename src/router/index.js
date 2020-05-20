import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import online from '@/views/online'
import cars from '@/views/cars'
import energy from '@/views/energy'
import complex from '@/views/complex'
import station from '@/views/station/view'
import maintenance from '@/views/maintenance/view'
import operation from '@/views/operation/view'
import finance from '@/views/finance'
import supplies from '@/views/supplies'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: home },
    { path: '/complex', name: 'complex', component: complex },
    { path: '/online', name: 'online', component: online },
    { path: '/cars', name: 'cars', component: cars },
    { path: '/energy', name: 'energy', component: energy },
    { path: '/station', name: 'station', component: station },
    { path: '/maintenance', name: 'maintenance', component: maintenance },
    { path: '/operation', name: 'operation', component: operation },
    { path: '/finance', name: 'finance', component: finance },
    { path: '/supplies', name: 'supplies', component: supplies }
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
