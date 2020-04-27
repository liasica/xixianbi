<template>
    <div class="header">
        <div class="container">
            <div class="wrapper">
                <button class="menu" @click="menuShow = !menuShow"></button>
                <s-btn class="now">{{ now }}</s-btn>
                <div v-if="code && temperature" class="weather">
                    <img v-if="code" :src="require(`@images/weather/${code}@2x.png`)" />
                    <span>{{ temperature }}℃</span>
                </div>
            </div>
            <router-link to="/" class="logo" />
            <div class="wrapper">
                <!-- <search /> -->
                <switch-table />
            </div>
            <transition name="menu">
                <bi-menu v-if="menuShow" />
            </transition>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

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
            temperature: '28',
            menuShow: false
        }
    },
    async created () {
        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD HH:mm:ss')
        }, 1000)

        const { code, temperature } = await this.$axios.get(
            'apiv1/guest/weather'
        )
        this.code = code
        this.temperature = temperature
    },
    watch: {
        $route () {
            this.menuShow = false
        }
    }
}
</script>
