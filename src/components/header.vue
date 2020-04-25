<template>
    <div class="header">
        <div class="container">
            <div class="wrapper">
                <button class="menu"></button>
                <s-btn class="now">{{ now }}</s-btn>
                <div v-if="code && temperature" class="weather">
                    <img v-if="code" :src="require(`@images/weather/${code}@2x.png`)" />
                    <span>{{ temperature }}℃</span>
                </div>
            </div>
            <router-link to="/" class="logo" />
            <div class="wrapper">
                <switch-table />
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

import SwitchTable from '@/components/switchTable'
// import axios from 'axios'

export default {
    components: { SwitchTable },
    data () {
        return {
            now: '',
            code: '0',
            temperature: '28'
        }
    },
    async created () {
        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD HH:mm:ss')
        }, 1000)

        // const { code, temperature } = await this.$axios.get('apiv1/guest/weather')
        // this.code = code
        // this.temperature = temperature
    }
}
</script>
