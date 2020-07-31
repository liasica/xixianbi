<template>
    <div class="container complex-container">
        <div class="chart age">
            <div class="bi-title">场站车龄</div>
            <v-chart :options="ageChart" class="age-chart" />
        </div>
        <div class="chart info">
            <div class="bi-title">车辆信息</div>
            <div v-for="(item, index) in info" :key="index" class="item">
                <img :src="require(`./assets/${item.icon}.png`)">
                <span>{{ item.label }}</span>
                <div class="right" :style="`color: ${item.color}`">
                    <span>{{ item.value }}</span>
                    <span class="unit">{{ item.unit }}</span>
                </div>
            </div>
        </div>
        <div class="chart job">
            <div class="bi-title">岗位占比</div>
            <!-- <img :src="require('@images/demo/3.png')"> -->
            <v-chart :options="jobChart" class="job-chart" />
        </div>
        <div class="chart age-cars">
            <div class="bi-title">场站车龄</div>
            <img :src="require('@images/demo/4.png')">
        </div>
        <div class="chart energy">
            <div class="bi-title">车辆耗能</div>
            <!-- <img :src="require('@images/demo/5.png')"> -->
            <v-chart :options="energyOptions" class="energy-chart" />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            ageChart: {},
            jobChart: {},
            energyOptions: {},
            info: {
                income: {
                    icon: 'rmb',
                    label: '本月收入',
                    value: '-',
                    unit: 'RMB',
                    color: '#42DFFF',
                },
                distance: {
                    icon: 'dashboard',
                    label: '本月里程',
                    value: '-',
                    unit: 'KM',
                    color: '#08F0C9',
                },
                passenger: {
                    icon: 'users',
                    label: '本月人次',
                    value: '2401679',
                    unit: '人次',
                    color: '#3C77FF',
                },
                oil: {
                    icon: 'battery',
                    label: '累计耗能',
                    value: '-',
                    unit: '度',
                    color: '#EBEBEB',
                },
            },
        }
    },
    async created () {
        const { info, busAgeItems, posItems, energyItems } = await this.$axios.get('complex')
        Object.keys(info).forEach(k => {
            this.$set(this.info[k], 'value', info[k] || 0)
        })
        this.setAgeChart(busAgeItems)
        this.setJobChart(posItems)
        this.setEnergyChart(energyItems)
    },
    methods: {
        setAgeChart (source) {
            this.ageChart = {
                legend: {
                    itemWidth: 40,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: () => {

                    // },
                },
                grid: {
                    left: 40,
                    right: 40,
                    bottom: 20,
                },
                dataset: {
                    source,
                    // source: [
                    //     ['year', '场站1', '场站2', '场站3'],
                    //     ['0', 43.3, 85.8, 93.7],
                    //     ['1', 83.1, 73.4, 55.1],
                    //     ['2', 86.4, 65.2, 82.5],
                    //     ['3', 72.4, 53.9, 39.1],
                    // ],
                },
                xAxis: {
                    name: '年',
                    type: 'category',
                    splitLine: {
                        show: false,
                    },
                    axisTick: { show: false },
                    axisLine: {
                        // show: false,
                        lineStyle: {
                            color: '#41AEC6',
                        },
                    },
                    axisLabel: {
                        color: '#FFF',
                        fontFamily: 'BDZongYi',
                    },
                    nameTextStyle: {
                        color: '#FFF',
                        fontFamily: 'BDZongYi',
                    },
                },
                yAxis: {
                    name: '辆',
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    axisTick: { show: false },
                    axisLine: {
                        // show: false,
                        lineStyle: {
                            color: '#41AEC6',
                        },
                    },
                    nameTextStyle: {
                        color: '#FFF',
                        fontFamily: 'BDZongYi',
                    },
                    axisLabel: {
                        // show: false,
                        // inside: true,
                        color: '#FFF',
                        fontFamily: 'BDZongYi',
                        // formatter: value => (value > 0 ? value : null),
                        textStyle: {
                            baseline: 'bottom',
                        },
                    },
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#FFF',
                        },
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#07F0C9',
                        },
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#3C77FF',
                        },
                    },
                ],
            }
        },
        setJobChart (data) {
            const colors = ['#07F0C9', '#0096D6', '#3C77FF', '##F2F2F2']

            data.forEach((item, index) => {
                const color = colors[index] || false
                if (color) {
                    item.itemStyle = { color }
                    data[index] = item
                }
            })

            this.jobChart = {
                tooltip: {},
                legend: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                        label: {
                            color: '#FFF',
                            fontFamily: 'BDZongYi',
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#FFF',
                            },
                        },
                    },
                ],
            }
        },
        setEnergyChart (items) {
            const end = Math.round((10 / items.length) * 100)
            const xData = []
            const d1 = []
            const d2 = []
            items.forEach(item => {
                xData.push(item.prepare1)
                d1.push(item.total)
                d2.push(item.amount)
            })
            this.energyOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                    },
                },
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end,
                    },
                    {
                        type: 'slider',
                        show: true,
                        realtime: true,
                        start: 0,
                        end,
                        height: 16,
                        top: '96%',
                    },
                ],
                grid: {
                    bottom: '90px',
                },
                legend: {
                    data: ['充电量', '充电金额'],
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xData,
                        axisPointer: {
                            type: 'shadow',
                        },
                        axisLabel: {
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                            rotate: 45,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '电量',
                        axisLabel: {
                            formatter: '{value} 度',
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                        nameTextStyle: {
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#07F0C9',
                                opacity: 0.3,
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '金额',
                        axisLabel: {
                            formatter: '{value} 元',
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#3C77FF',
                                opacity: 0.3,
                            },
                        },
                        nameTextStyle: {
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                    },
                ],
                series: [
                    {
                        name: '充电量',
                        type: 'bar',
                        itemStyle: {
                            color: '#07F0C9',
                        },
                        data: d1,
                    },
                    {
                        name: '充电金额',
                        type: 'line',
                        yAxisIndex: 1,
                        lineStyle: {
                            color: '#3C77FF',
                        },
                        itemStyle: {
                            color: '#3C77FF',
                            borderWidth: 6,
                        },
                        data: d2,
                    },
                ],
            }
        },
    },
}
</script>
<style lang="less" scoped>
.complex-container {
    justify-content: space-between;
    flex-wrap: wrap;
}
.chart {
    margin-bottom: 60px;
}
.age {
    width: 502px;
}
.age-chart {
    width: 502px;
    height: 440px;
}
.info {
    width: 400px;
    .item {
        border-bottom: 1px solid fade(#39bdd9, 50);
        padding: 26px 0 14px;
        display: flex;
        align-items: center;
        font-size: 22px;
        .right {
            flex: 1;
            text-align: right;
            font-size: 40px;
            .unit {
                font-size: 18px;
                margin-left: 10px;
            }
        }
    }
    img {
        width: 34px;
        height: 34px;
        object-fit: contain;
        margin-right: 11px;
    }
}
.job {
    width: 300px;
}
.age-cars,
.energy {
    width: 620px;
    img {
        margin-top: -40px;
    }
}
.job-chart {
    width: 300px;
    height: 300px;
}
.energy-chart {
    width: 620px;
    height: 410px;
}
</style>
