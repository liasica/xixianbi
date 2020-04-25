<template>
    <div class="header">
        <div class="container">
            <button class="menu"></button>
            <div class="now s-btn">{{ now }}</div>
            <div class="logo"></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data () {
        return {
            now: ''
        }
    },
    created () {
        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD HH:mm:ss')
        }, 1000)
    }
}
</script>
