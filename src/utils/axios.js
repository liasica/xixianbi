import Vue from 'vue'
import axios from 'axios'

import router from '@/router'

const service = axios.create({
    // baseURL: '/apiv1/', // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 60 * 10 * 1000 // request timeout
})

const CancelToken = axios.CancelToken
let source = CancelToken.source()

service.interceptors.request.use(
    config => {
        // const token = getToken()
        // if (token) {
        //     config.headers['X-Token'] = token
        // }
        config.cancelToken = source.token
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const { path } = router.currentRoute
        const res = response.data

        const { $notify } = Vue.prototype

        if (res.code !== 0x1000) {
            if (res.code === 0x1001) {
                source.cancel('需要登录')
                source = CancelToken.source()
                if (path !== '/login') {
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            }
            $notify.error({ message: res.message })
            // Message({ message: res.message || 'Error', type: 'error', duration: 5 * 1000 })
        }
        return res.data || {}
    },
    error => {
        // console.info('error', error)
        const isCancel = error instanceof axios.Cancel
        if (!isCancel) {
            // Message({ message: error.message, type: 'error', duration: 5 * 1000 })
        }
        return Promise.reject(error)
    }
)

export default service
