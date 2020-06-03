import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home/index'
import online from '@/views/home/online'
import violation from '@/views/home/violation'
import workrate from '@/views/home/workrate'
import revenue from '@/views/home/revenue'
import homeEnergy from '@/views/home/energy'
import homeSpeed from '@/views/home/speed'
import homeMileage from '@/views/home/mileage'
import homeWorkTimes from '@/views/home/worktimes'
import complex from '@/views/complex'
import complexInfo from '@/views/complex/info'
import complexCarInfo from '@/views/complex/carinfo'
import complexWorkInfo from '@/views/complex/workinfo'
import station from '@/views/station/view'
import stationInfo from '@/views/station/info'
import maintenance from '@/views/maintenance/view'
import maintenanceFixPlan from '@/views/maintenance/fixplan'
import maintenanceSafe from '@/views/maintenance/safe'
import operation from '@/views/operation/view'
import operationCarMaster from '@/views/operation/carmaster'
import operationDispatchPlan from '@/views/operation/dispatchplan'
import operationScheduPlan from '@/views/operation/scheduplan'
import operationAnalyse from '@/views/operation/analyse'
import finance from '@/views/finance/index'
import financeInfo from '@/views/finance/info'
import supplies from '@/views/supplies/index'
import suppliesStock from '@/views/supplies/stock'
import suppliesDetail from '@/views/supplies/detail'
import suppliesAllocate from '@/views/supplies/allocate'
import rule from '@/views/rule/index'
import user from '@/views/rule/user'
import cars from '@/views/cars'
import energy from '@/views/energy'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: home },
    { path: '/online', name: 'online', component: online },
    { path: '/home/violation', name: 'home/violation', component: violation },
    { path: '/home/workrate', name: 'home/workrate', component: workrate },
    { path: '/home/revenue', name: 'home/revenue', component: revenue },
    { path: '/home/energy', name: 'home/energy', component: homeEnergy },
    { path: '/home/speed', name: 'home/speed', component: homeSpeed },
    { path: '/home/mileage', name: 'home/mileage', component: homeMileage },
    {
        path: '/home/worktimes',
        name: 'home/worktimes',
        component: homeWorkTimes
    },
    { path: '/complex', name: 'complex', component: complex },
    { path: '/complex/info', name: 'complex/info', component: complexInfo },
    {
        path: '/complex/carinfo',
        name: 'complex/carinfo',
        component: complexCarInfo
    },
    {
        path: '/complex/workinfo',
        name: 'complex/workinfo',
        component: complexWorkInfo
    },
    { path: '/station', name: 'station', component: station },
    { path: '/station/info', name: 'station/info', component: stationInfo },
    { path: '/maintenance', name: 'maintenance', component: maintenance },
    {
        path: '/maintenance/fixplan',
        name: 'maintenance/fixplan',
        component: maintenanceFixPlan
    },
    {
        path: '/maintenance/safe',
        name: 'maintenance/safe',
        component: maintenanceSafe
    },
    { path: '/operation', name: 'operation', component: operation },
    {
        path: '/operation/carmaster',
        name: 'operation/carmaster',
        component: operationCarMaster
    },
    {
        path: '/operation/dispatchplan',
        name: 'operation/dispatchplan',
        component: operationDispatchPlan
    },
    {
        path: '/operation/scheduplan',
        name: 'operation/scheduplan',
        component: operationScheduPlan
    },
    {
        path: '/operation/analyse',
        name: 'operation/analyse',
        component: operationAnalyse
    },
    { path: '/finance', name: 'finance', component: finance },
    { path: '/finance/info', name: 'finance/info', component: financeInfo },
    { path: '/supplies', name: 'supplies', component: supplies },
    {
        path: '/supplies/stock',
        name: 'supplies/stock',
        component: suppliesStock
    },
    {
        path: '/supplies/detail',
        name: 'supplies/detail',
        component: suppliesDetail
    },
    {
        path: '/supplies/allocate',
        name: 'supplies/allocate',
        component: suppliesAllocate
    },
    { path: '/rule', name: 'rule', component: rule },
    { path: '/user', name: 'user', component: user },
    { path: '/cars', name: 'cars', component: cars },
    { path: '/energy', name: 'energy', component: energy }
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
