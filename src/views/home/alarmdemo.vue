<template>
    <div class="container">
        <div class="alam-chart">
            <!-- 七日报警总数 -->
            <alarm-parallel :items="week" />
            <!-- 30日内报警总数 [ 03/20 — 04/20 ]  -->
            <alarm-parallel :items="month" />
            <!-- 本月和上月报警对比 -->
            <month-parallel :items="compare" />
        </div>
    </div>
</template>

<script>
import alarmParallel from '@/views/home/alarmParallel'
import monthParallel from '@/views/home/monthParallel'

export default {
    components: { alarmParallel, monthParallel },
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
