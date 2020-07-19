<template>
    <v-chart :options="options" />
</template>

<script>
export default {
    props: {
        items: { type: Array, default: () => [] },
    },
    computed: {
        options () {
            const source = [
                ['警告类型', '本月', '上月'],
            ]
            this.items.forEach(({ warnContent, warnCount, lastMonthCount }) => {
                // sourceData.
                source.push([warnContent, warnCount, lastMonthCount])
            })
            const options = {
                legend: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                tooltip: {},
                dataset: {
                    source,
                },
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
                    },
                },
                yAxis: {
                    axisTick: { show: false },
                    splitLine: {
                        // show: false,
                        lineStyle: {
                            type: 'dashed',
                            color: '#42DFFF',
                            opacity: 0.3,
                        },
                    },
                    axisLine: {
                        // show: false,
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
                        itemStyle: {
                            color: '#2177FF',
                        },
                    },
                    {
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            color: '#00F4C7',
                        },
                    },
                ],
            }
            return options
        },
    },
}
</script>
