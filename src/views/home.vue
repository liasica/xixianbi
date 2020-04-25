<template>
    <div class="container home-container">
        <div class="left">
            <div class="bi-title">当日公交上线情况</div>
            <progress-bar label="常规公交" :schedule="getRandomInt(100)" />
            <progress-bar label="定制公交" :schedule="getRandomInt(100)" color="#08F0C9" />
            <progress-bar label="通勤公交" :schedule="getRandomInt(100)" color="#3C77FF" />
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/components/progressBar'

export default {
    components: { ProgressBar },
    data () {
        return {}
    },
    methods: {
        getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max))
        }
    }
}
</script>

<style lang="less" scoped>
.left {
    width: 300px;
}
</style>
