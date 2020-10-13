<template>
    <div class="container finance-container">
        <div class="filter">
            <choose
                v-model="date"
                class="choose-date"
                label="数据日期"
                :options="options"
            />
        </div>
        <div class="finance-box">
            <div class="bi-title">财务分析</div>
            <div class="list">
                <Card
                    :type="1"
                    label="IC卡人次"
                    :value="item.card26Times"
                    color="#42DFFF"
                />
                <Card
                    :type="2"
                    label="IC卡金额"
                    :value="item.card26Money"
                    color="#3C77FF"
                />
                <!-- <Card
                    :type="3"
                    label="现金人次"
                    :value="item.totalPerson"
                    color="#08F0C9"
                /> -->
                <Card
                    :type="4"
                    label="现金收入"
                    :value="item.totalMoney"
                    color="#F2F2F2"
                />
            </div>
        </div>
        <div class="icnum-box">
            <div class="bi-title">IC卡人次</div>
            <v-chart :options="chartOptions" class="bottom-chart" />
        </div>
    </div>
</template>

<script>
import RelationChoose from '@/components/relationChoose'
import Card from './widget/card'

export default {
    components: {
        Card,
        RelationChoose,
    },
    data () {
        return {
            items: {},
            date: '',
            options: [],
            chartOptions: {},
        }
    },
    computed: {
        item () {
            const item = this.items[this.date]
            return item || { card26Money: 0, card26Times: 0, totalMoney: 0, totalPerson: 0 }
        },
    },
    async created () {
        await this.getChartData()
        const { items } = await this.$axios.get('financial')
        this.options = Object.keys(items).map((date, index) => {
            if (index === 0) {
                this.date = date
            }
            return { id: date, label: date }
        })
        this.items = items
    },
    methods: {
        async getChartData () {
            const { items } = await this.$axios.get('financial/chart')
            const data = []
            const xdata = []
            items.forEach(item => {
                data.push(item.num)
                xdata.push(item.month)
            })
            const end = Math.round((12 / items.length) * 100)

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
                        end,
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

<style scoped lang="less">
.finance-container {
    position: relative;
    flex-wrap: wrap;
    .filter {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 40px;
    }
    .finance-box {
        display: block;
        width: 100%;
        margin-bottom: 75px;
        .list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 60px;
        }
    }
    .icnum-box {
        width: 100%;
    }
}

.choose-date {
    flex-shrink: 0;
}

.bottom-chart {
    width: 100%;
    height: 300px;
}
</style>
