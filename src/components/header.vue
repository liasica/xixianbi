<template>
    <div class="header">
        <div class="container">
            <div class="wrapper">
                <button class="menu"></button>
                <div class="now s-btn">{{ now }}</div>
            </div>
            <div class="logo"></div>
            <div class="wrapper">
                <div class="switch-table">
                    <button>切换表格</button>
                    <button>关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
// import axios from 'axios'

export default {
    data () {
        return {
            now: ''
        }
    },
    async created () {
        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD HH:mm:ss')
        }, 1000)

        // const data = await axios.get('https://api.seniverse.com/v3/weather/now.json?key=SaQfcWF2mcKTuwIjk&location=34.26316071:108.94802094&language=zh-Hans&unit=c')
        // console.info(data)
    }
}
</script>
