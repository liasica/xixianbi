<template>
    <div class="container">
        <div class="alam-chart">
            <!-- 七日报警总数 -->
            <alarmweek :items="week" />
            <!-- 30日内报警总数 [ 03/20 — 04/20 ]  -->
            <alarmweek :items="month" />
        </div>
    </div>
</template>

<script>
import alarmweek from '@/views/home/alarmweek'

export default {
    components: { alarmweek },
    data () {
        return {
            compare: [],
            month: [],
            week: [],
            rank: [],
            driver: [],
        }
    },
    async created () {
        const { compare, month, week, rank, driver } = await this.$axios.get('alarm')
        this.compare = compare
        this.month = month
        this.week = week
        this.rank = rank
        this.driver = driver
    },
}
</script>

<style lang="less" scoped>
.alam-chart /deep/ .echarts {
    width: 832px;
    height: 682px;
}
</style>
