<template>
    <div class="header">
        <div v-if="logged" class="container">
            <div class="wrapper">
                <button class="menu" @click="toggleMenu" />
                <s-btn class="now">{{ now }}</s-btn>
                <div v-if="code && temperature" class="weather">
                    <img v-if="code" :src="require(`@images/weather/${code}@2x.png`)">
                    <span>{{ temperature }}℃</span>
                </div>
            </div>
            <router-link to="/" class="logo" />
            <div class="wrapper">
                <!-- <search /> -->
                <!-- <switch-table /> -->
                {{ $route.meta.title || '西咸BI平台' }}
            </div>
            <transition name="menu">
                <bi-menu v-if="menuShow" />
            </transition>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment'

import { getToken } from '@/utils/auth'

import BiMenu from '@/components/menu'
import SwitchTable from '@/components/switchTable'
import Search from '@/components/search'
// import axios from 'axios'

export default {
    components: { BiMenu, SwitchTable, Search },
    data () {
        return {
            now: '',
            code: '0',
            temperature: '',
            menuShow: false,
            logged: false,
        }
    },
    watch: {
        $route () {
            this.menuShow = false
            this.logged = getToken()
        },
    },
    async created () {
        this.logged = getToken()

        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD HH:mm:ss')
        }, 1000)

        const { code, temperature } = await this.$axios.get('guest/weather')
        this.code = code
        this.temperature = temperature
    },
    methods: {
        toggleMenu () {
            this.menuShow = !this.menuShow
        },
    },
}
</script>
