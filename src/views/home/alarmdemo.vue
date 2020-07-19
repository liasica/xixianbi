<template>
    <div class="container">
        <div class="alam-chart">
            <alarmweek :week="week" />
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
