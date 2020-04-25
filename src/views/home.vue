<template>
    <div class="container home-container">
        <div class="left">
            <div class="bi-title">当日公交上线情况</div>
            <div class="progress-bars">
                <progress-bar class="pbar" label="常规公交" :schedule="getRandomInt(100)" />
                <progress-bar
                    class="pbar"
                    label="定制公交"
                    :schedule="getRandomInt(100)"
                    color="#08F0C9"
                />
                <progress-bar
                    class="pbar"
                    label="通勤公交"
                    :schedule="getRandomInt(100)"
                    color="#3C77FF"
                />
            </div>
            <div class="tie-items">
                <tie-number :number="getRandomInt(5000)" label="活跃车数" />
                <tie-number :number="getRandomInt(5000)" label="非活跃车数" />
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/components/progressBar'
import TieNumber from '@/components/tieNumber'

export default {
    components: { ProgressBar, TieNumber },
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
.pbar {
    margin-bottom: 10px;
}
.tie-items {
    display: flex;
    justify-content: space-between;
}
</style>
