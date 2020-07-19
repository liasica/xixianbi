<template>
    <v-chart :options="options" />
</template>

<script>
export default {
    props: {
        week: { type: Array, default: () => [] },
    },
    computed: {
        options () {
            const date = []
            const count = []
            const month = []
            const year = []
            this.week.forEach(w => {
                date.push(w.date)
                count.push(w.warnCount)
                month.push(w.monthOnMonth)
                year.push(w.yearOnYear)
            })
            const options = {
                legend: {
                    itemWidth: 40,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                tooltip: {},
                grid: {
                    left: 70,
                    right: 0,
                },
                xAxis: {
                    type: 'category',
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: date,
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#42DFFF',
                        },
                    },
                    axisLabel: {
                        color: '#ffffff',
                        fontFamily: 'BDZongYi',
                    },
                },
                yAxis: {
                    type: 'value',
                    // max (value) {
                    //     return value.max + 200
                    // },
                    splitLine: {
                        // show: false,
                        lineStyle: {
                            type: 'dashed',
                            color: '#42DFFF',
                            opacity: 0.3,
                        },
                    },
                    axisTick: { show: false },
                    axisLine: {
                        // show: false,
                        lineStyle: {
                            color: '#42DFFF',
                        },
                    },
                    axisLabel: {
                        // show: false,
                        // inside: true,
                        color: '#08F0C9',
                        fontFamily: 'BDZongYi',
                        formatter: value => (value > 0 ? value : null),
                        textStyle: {
                            baseline: 'bottom',
                        },
                    },
                },
                series: [
                    {
                        name: '近七日',
                        // data: [820, 932, 901, 934, 1290, 1330, 1320],
                        data: count,
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: '#08F0C9',
                        },
                        itemStyle: {
                            color: '#08F0C9',
                            borderWidth: 6,
                        },
                    },
                    {
                        name: '环比',
                        data: month,
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: '#3C77FF',
                        },
                        itemStyle: {
                            color: '#3C77FF',
                            borderWidth: 6,
                        },
                    },
                    {
                        name: '同比',
                        data: year,
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: '#42DFFF',
                        },
                        itemStyle: {
                            color: '#42DFFF',
                            borderWidth: 6,
                        },
                    },
                ],
            }
            return options
        },
    },
}
</script>

<style lang="less" scoped>
.alarm-week {
    width: 832px;
    height: 682px;
}
</style>
