import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login'

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

import settingEnergy from '@/views/setting/energy'

import layout from '@/components/layout'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: layout,
        children: [
            {
                path: '/',
                name: 'homeView',
                meta: {
                    title: '首页大屏'
                },
                component: home
            },
            {
                path: '/online',
                name: 'online',
                meta: {
                    title: '当日公交上线情况'
                },
                component: online
            },
            {
                path: '/home/violation',
                name: 'home/violation',
                meta: {
                    title: '当日车辆违规统计'
                },
                component: violation
            },
            {
                path: '/home/workrate',
                name: 'home/workrate',
                meta: {
                    title: '早高峰平均出车率'
                },
                component: workrate
            },
            {
                path: '/home/revenue',
                name: 'home/revenue',
                meta: {
                    title: '车辆营收统计时间分布'
                },
                component: revenue
            },
            {
                path: '/home/energy',
                name: 'home/energy',
                meta: {
                    title: '车辆运行能耗比较统计（日）'
                },
                component: homeEnergy
            },
            {
                path: '/home/speed',
                name: 'home/speed',
                meta: {
                    title: '当日车辆平均速度'
                },
                component: homeSpeed
            },
            {
                path: '/home/mileage',
                name: 'home/mileage',
                meta: {
                    title: '当日营运里程'
                },
                component: homeMileage
            },
            {
                path: '/home/worktimes',
                name: 'home/worktimes',
                meta: {
                    title: '当日完成班次数'
                },
                component: homeWorkTimes
            }
        ]
    },
    {
        path: '/complex',
        name: 'complex',
        meta: {
            title: '综合管理'
        },
        component: layout,
        children: [
            {
                path: '/complex',
                name: 'complexView',
                meta: {
                    title: '综合管理大屏'
                },
                component: complex
            },
            {
                path: '/complex/info',
                name: 'complex/info',
                meta: {
                    title: '综合信息'
                },
                component: complexInfo
            },
            {
                path: '/complex/carinfo',
                name: 'complex/carinfo',
                meta: {
                    title: '车辆信息'
                },
                component: complexCarInfo
            },
            {
                path: '/cars',
                name: 'cars',
                meta: {
                    title: '车辆信息',
                    hidden: true
                },
                component: cars
            },
            {
                path: '/complex/workinfo',
                name: 'complex/workinfo',
                meta: {
                    title: '运行数据'
                },
                component: complexWorkInfo
            },
            {
                path: '/energy',
                name: 'energy',
                meta: {
                    title: '耗能数据'
                },
                component: energy
            }
        ]
    },
    {
        path: '/station',
        name: 'station',
        meta: {
            title: '场站管理'
        },
        component: layout,
        children: [
            {
                path: '/station',
                name: 'stationView',
                meta: {
                    title: '场站管理大屏'
                },
                component: station
            },
            {
                path: '/station/info',
                name: 'station/info',
                meta: {
                    title: '场站信息'
                },
                component: stationInfo
            }
        ]
    },
    {
        path: '/maintenance',
        name: 'maintenance',
        meta: {
            title: '机务管理'
        },
        component: layout,
        children: [
            {
                path: '/maintenance',
                name: 'maintenanceView',
                meta: {
                    title: '机务管理'
                },
                component: maintenance
            },
            {
                path: '/maintenance/fixplan',
                name: 'maintenance/fixplan',
                meta: {
                    title: '维修计划'
                },
                component: maintenanceFixPlan
            },
            {
                path: '/maintenance/safe',
                name: 'maintenance/safe',
                meta: {
                    title: '安全管理'
                },
                component: maintenanceSafe
            }
        ]
    },
    {
        path: '/operation',
        name: 'operation',
        meta: {
            title: '营运调度'
        },
        component: layout,
        children: [
            {
                path: '/operation',
                name: 'operationView',
                meta: {
                    title: '营运调度大屏'
                },
                component: operation
            },
            {
                path: '/operation/carmaster',
                name: 'operation/carmaster',
                meta: {
                    title: '车长信息'
                },
                component: operationCarMaster
            },
            {
                path: '/operation/dispatchplan',
                name: 'operation/dispatchplan',
                meta: {
                    title: '调度计划'
                },
                component: operationDispatchPlan
            },
            {
                path: '/operation/scheduplan',
                name: 'operation/scheduplan',
                meta: {
                    title: '排班计划'
                },
                component: operationScheduPlan
            },
            {
                path: '/operation/analyse',
                name: 'operation/analyse',
                meta: {
                    title: '营运分析'
                },
                component: operationAnalyse
            }
        ]
    },
    {
        path: '/finance',
        name: 'finance',
        meta: {
            title: '财务管理',
            hidden: true
        },
        component: layout,
        children: [
            {
                path: '/finance',
                name: 'financeView',
                meta: {
                    title: '财务管理'
                },
                component: finance
            },
            {
                path: '/finance/info',
                name: 'finance/info',
                meta: {
                    title: '财务分析'
                },
                component: financeInfo
            }
        ]
    },
    {
        path: '/supplies',
        name: 'supplies',
        meta: {
            title: '物资管理',
            hidden: true
        },
        component: layout,
        children: [
            {
                path: '/supplies',
                name: 'suppliesView',
                meta: {
                    title: '物资管理'
                },
                component: supplies
            },
            {
                path: '/supplies/stock',
                name: 'supplies/stock',
                meta: {
                    title: '物资入库'
                },
                component: suppliesStock
            },
            {
                path: '/supplies/detail',
                name: 'supplies/detail',
                meta: {
                    title: '详细'
                },
                component: suppliesDetail
            },
            {
                path: '/supplies/allocate',
                name: 'supplies/allocate',
                meta: {
                    title: '物资调拨'
                },
                component: suppliesAllocate
            }
        ]
    },
    {
        path: '/permission',
        name: 'permission',
        meta: {
            title: '权限管理',
            hidden: true
        },
        component: layout,
        children: [
            {
                path: '/rule',
                name: 'rule',
                meta: {
                    title: '角色管理'
                },
                component: rule
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户列表'
                },
                component: user
            }
        ]
    },
    {
        path: '/setting',
        name: 'setting',
        meta: { title: '系统设置' },
        component: layout,
        children: [
            { path: '/setting/energy', name: 'setting-energy', meta: { title: '充电桩设置' }, component: settingEnergy }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { hidden: true },
        component: login
    },
    {
        path: '*',
        redirect: '/'
    }
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
    // set title name
    const title = ' | 西咸公交BI平台'
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + title
    }

    next()
})

export default router
