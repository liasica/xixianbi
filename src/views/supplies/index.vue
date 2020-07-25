<template>
    <div class="container home-container">
        <div class="left">
            left
        </div>
        <div class="right">
            <div class="bottom">
                <div class="bi-title">每月入库数量</div>
                <v-chart :options="chartOptions" class="bottom-chart" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            chartOptions: {},
        }
    },
    created () {
        this.getChartData()
    },
    methods: {
        async getChartData () {
            const { items } = await this.$axios.get('supply/chart')
            const data = []
            const xdata = []
            items.forEach(item => {
                data.push(item.num)
                xdata.push(item.month)
            })

            this.chartOptions = {
                legend: false,
                tooltip: {
                    formatter: p => `${p.name}: ${p.data}个`,
                },
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 10,
                    },
                ],
                xAxis: {
                    type: 'category',
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
                        rotate: 45,
                    },
                    data: xdata,
                },
                yAxis: {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#42DFFF',
                            opacity: 0.6,
                        },
                    },
                    axisTick: { show: false },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#42DFFF',
                        },
                    },
                    axisLabel: {
                        // show: false,
                        // inside: true,
                        color: '#ffffff',
                        fontFamily: 'BDZongYi',
                        formatter: value => (value > 0 ? value : null),
                        textStyle: {
                            baseline: 'bottom',
                        },
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 34,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#08F0C9', // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(19, 249, 230, 0)', // 100% 处的颜色
                                }],
                                global: false, // 缺省为 false
                            },
                        },
                        data,
                    },
                ],
            }
        },
    },
}
</script>

<style lang="less" scoped>
.left {
    width: 310px;
    flex-shrink: 0;
}
.right {
    flex: 1;
}
.bottom-chart {
    width: 100%;
    height: 300px;
}
</style>
