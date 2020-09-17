<template>
    <div class="container home-container">
        <div class="left">
            <div class="bi-title">当日公交上线情况</div>
            <div v-if="home.busOnline" class="progress-bars">
                <progress-bar
                    class="pbar"
                    label="常规公交"
                    :schedule="[home.busOnline.normal, home.busOnline.total]"
                />
                <progress-bar
                    class="pbar"
                    label="定制公交"
                    :schedule="[home.busOnline.custom, home.busOnline.total]"
                    color="#08F0C9"
                />
                <progress-bar
                    class="pbar"
                    label="通勤公交"
                    :schedule="[home.busOnline.commute, home.busOnline.total]"
                    color="#3C77FF"
                />
            </div>
            <div v-if="home.busOnline" class="tie-items">
                <tie-number :number="home.busOnline.active" label="活跃车数" />
                <tie-number :number="home.busOnline.inactive" label="非活跃车数" />
            </div>
            <div v-if="home.alarmToday" class="violation">
                <div class="bi-title">当日车辆违规统计</div>
                <ul>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-alert.png')">
                        </s-btn>
                        <span>当日报警数</span>
                        <div class="value">{{ home.alarmToday.month }}</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-illegal.png')">
                        </s-btn>
                        <span>驾驶员违法违规</span>
                        <div class="value">{{ home.alarmToday.illegals || 0 }}</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-accident.png')">
                        </s-btn>
                        <span>驾驶员事故次数</span>
                        <div class="value">{{ home.alarmToday.accidents || 0 }}</div>
                    </li>
                    <li>
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-insurance.png')">
                        </s-btn>
                        <span>车辆保险到期</span>
                        <div class="value">{{ home.alarmToday.insures || 0 }}</div>
                    </li>
                </ul>
            </div>
            <div class="radials">
                <div class="bi-title">平均出车率（日）</div>
                <div v-if="home.avgBusRate" class="items">
                    <s-btn :corner="{ leftTop: '#42DFFF', rightTop: '#42DFFF' }" class="radial">
                        <radial radial-id="radial1" :schedule="home.avgBusRate[0]" />
                        <div class="radial-label">第一场站</div>
                    </s-btn>
                    <s-btn
                        :corner="{ leftTop: '#08F0C9', rightTop: '#08F0C9' }"
                        bg-color="#08F0C9"
                        class="radial radial2"
                    >
                        <radial radial-id="radial2" :schedule="home.avgBusRate[1]" />
                        <div class="radial-label">第二场站</div>
                    </s-btn>
                    <s-btn
                        :corner="{ leftTop: '#3C77FF', rightTop: '#3C77FF' }"
                        bg-color="#3C77FF"
                        class="radial radial3"
                    >
                        <radial radial-id="radial3" :schedule="home.avgBusRate[2]" />
                        <div class="radial-label">第三场站</div>
                    </s-btn>
                </div>
            </div>
        </div>
        <div class="mid">
            <div class="pile">
                <div class="income">
                    <div class="title">车辆累计月收入</div>
                    <div class="value">{{ home.incomeMonth }}</div>
                </div>
                <div class="count">
                    <div class="title">本月累计发车</div>
                    <div class="value">{{ home.bustimesMonth }}</div>
                </div>
                <div class="flow">
                    <div class="title">车辆累计月客流</div>
                    <div class="value">{{ home.passengerMonth }}</div>
                </div>
            </div>
            <div class="charts">
                <div class="chart-item">
                    <div class="title">车辆营收比较统计（日）</div>
                    <v-chart :options="incomeChart" />
                </div>
                <div class="chart-item">
                    <div class="title">车辆运行能耗比较统计（日）</div>
                    <v-chart :options="energyChart" />
                </div>
            </div>
        </div>
        <div class="right">
            <div class="bus-speed">
                <div class="bi-title">当日车辆平均速度</div>
                <transition v-if="speedRank.length > 0" name="fade" mode="out-in">
                    <div :key="speedRank[0].uuid" class="items">
                        <div v-for="item in speedRank" :key="item.uuid" class="speed-item">
                            <speed-icon :bg-color="item.bgColor" :color="item.color" />
                            <div class="speed-body">
                                <div class="speed">{{ item.speed.toFixed(2) }}km/h</div>
                                <div class="rank-info">
                                    <span class="busline">{{ item.label }}</span>
                                <!-- <span class="rank">{{ index+1 }}</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div v-if="distanceRank.length > 0" class="mileage">
                <div class="bi-title">当日营运里程</div>
                <transition name="fade" mode="out-in">
                    <div :key="distanceRank[0].uuid">
                        <div class="item">
                            <div class="label">{{ distanceRank[0].line }}</div>
                            <s-btn
                                class="mileage-data"
                                bg-color="#42DFFF"
                                :corner="{leftTop: '#42DFFF', rightTop: '#42DFFF', leftBottom: '#42DFFF', rightBottom: '#42DFFF'}"
                            >
                                <div style="color:#42DFFF">{{ distanceRank[0].distance }} KM</div>
                            </s-btn>
                        </div>
                        <div class="item">
                            <div class="label">{{ distanceRank[1].line }}</div>
                            <s-btn
                                class="mileage-data"
                                bg-color="#08F0C9"
                                :corner="{leftTop: '#08F0C9', rightTop: '#08F0C9', leftBottom: '#08F0C9', rightBottom: '#08F0C9'}"
                            >
                                <div style="color:#08F0C9">{{ distanceRank[1].distance }} KM</div>
                            </s-btn>
                        </div>
                        <div class="item">
                            <div class="label">{{ distanceRank[2].line }}</div>
                            <s-btn
                                class="mileage-data"
                                bg-color="#3C77FF"
                                :corner="{leftTop: '#3C77FF', rightTop: '#3C77FF', leftBottom: '#3C77FF', rightBottom: '#3C77FF'}"
                            >
                                <div style="color:#3C77FF">{{ distanceRank[2].distance }} KM</div>
                            </s-btn>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="total">
                <div class="bi-title">当日完成总班数</div>
                <div class="total-data">
                    <div class="label">总班次</div>
                    <div class="value">{{ home.busTimes }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import ProgressBar from '@/components/progressBar'
import TieNumber from '@/components/tieNumber'
import Radial from '@/components/radial'
import SpeedIcon from '@/components/speedIcon'

const rankItems = [
    {
        color: '#42DFFF',
        bgColor: '#0A2E41',
    },
    {
        color: '#F4BE45',
        bgColor: '#3B2E17',
    },
    {
        color: '#F06060',
        bgColor: '#3F1E22',
    },
    {
        color: '#08F0C9',
        bgColor: '#045648',
    },
    {
        color: '#3C77FF',
        bgColor: '#0C2357',
    },
    {
        color: '#FFFFFF',
        bgColor: '#393A3B',
    },
]

export default {
    components: { ProgressBar, TieNumber, Radial, SpeedIcon },
    data () {
        return {
            home: {},
            incomeChart: {},
            energyChart: {},
            options: {
                legend: false,
                tooltip: {},
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 10,
                    },
                    {
                        type: 'slider',
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 10,
                        height: 16,
                        top: '94%',
                    },
                ],
                grid: {
                    left: '54px',
                    bottom: '90px',
                    right: '10px',
                    // top: '20px',
                    top: '0px',
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
                        rotate: 45,
                    },
                },
                yAxis: {
                    splitLine: { show: false },
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
                        color: '#ffffff',
                        fontFamily: 'BDZongYi',
                        formatter: value => (value > 0 ? value : null),
                        textStyle: {
                            baseline: 'bottom',
                        },
                    },
                },
                // xAxis: {
                //     // show: false,
                //     type: 'category',
                //     axisLine: {
                //         lineStyle: {
                //             color: '#42DFFF',
                //         },
                //     },
                // },
                // yAxis: {
                //     splitLine: { show: false },
                //     axisTick: { show: false },
                //     axisLine: {
                //         show: false,
                //         lineStyle: {
                //             color: '#42DFFF',
                //         },
                //     },
                //     axisLabel: {
                //         color: '#ffffff',
                //         fontFamily: 'BDZongYi',
                //         formatter: value => (value > 0 ? value : null),
                //     },
                // },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 12,
                        itemStyle: {
                            // barBorderRadius: 6,
                            color: '#42DFFF',
                        },
                        data: [],
                    },
                ],
            },
            speedRank: [],
            speedTimer: null,
            distanceRank: [],
            distanceTimer: null,
        }
    },
    beforeDestroy () {
        clearInterval(this.speedTimer)
        clearInterval(this.distanceRank)
        this.speedTimer = null
        this.distanceTimer = null
    },
    async created () {
        const data = await this.$axios.get('home')
        this.home = data

        const { avgBusSpeed, busDistance } = data

        if (avgBusSpeed) {
            avgBusSpeed.slice(0, 6).forEach((item, index) => {
                this.$set(this.speedRank, index, { ...rankItems[index], ...item, uuid: uuidv4() })
            })

            const len1 = Math.ceil(avgBusSpeed.length / 6)
            let c1 = 1
            this.speedTimer = setInterval(() => {
                if (c1 >= len1) {
                    c1 = 0
                }
                c1 += 1
                const end = 6 * c1
                avgBusSpeed.slice(end - 6, end).forEach((item, index) => {
                    this.$set(this.speedRank, index, { ...rankItems[index], ...item, uuid: uuidv4() })
                })
            }, 6000)
        }

        if (busDistance) {
            busDistance.slice(0, 3).forEach((item, index) => {
                this.$set(this.distanceRank, index, { ...item, uuid: uuidv4() })
            })

            const len2 = Math.ceil(busDistance.length / 3)
            let c2 = 1
            this.distanceTimer = setInterval(() => {
                if (c2 >= len2) {
                    c2 = 0
                }
                c2 += 1
                const end = 3 * c2
                busDistance.slice(end - 3, end).forEach((item, index) => {
                    this.$set(this.distanceRank, index, { ...item, uuid: uuidv4() })
                })
            }, 5000)
        }

        this.setIcome(data.income)
        this.setEnergyChart(data.energies)
    },
    methods: {
        setIcome (items) {
            const options = JSON.parse(JSON.stringify(this.options))
            const data = []
            const xdata = []
            items.forEach(item => {
                data.push(item.num)
                xdata.push(item.date)
            })

            options.xAxis.data = xdata
            options.series[0].data = data
            options.series[0].name = '收入'

            const end = Math.round((10 / items.length) * 100)
            options.dataZoom[0].end = end
            options.dataZoom[1].end = end

            this.incomeChart = options
        },
        setEnergyChart (items) {
            const options = JSON.parse(JSON.stringify(this.options))
            const data = []
            const xdata = []
            items.forEach(energy => {
                data.push(energy.num)
                xdata.push(energy.addoilDate)
            })

            options.xAxis.data = xdata
            options.series[0].data = data
            options.series[0].name = '能耗'

            const end = Math.round((10 / items.length) * 100)
            options.dataZoom[0].end = end
            options.dataZoom[1].end = end

            this.energyChart = options
        },
    },
}
</script>

<style lang="less" scoped>
.left,
.right {
    width: 300px;
    flex-shrink: 0;
}
.mid {
    flex: 1;
    padding: 0 20px;
}
.pbar {
    margin-bottom: 10px;
}
.tie-items {
    display: flex;
    justify-content: space-between;
}
.violation {
    margin-top: 24px;
    li {
        display: flex;
        align-items: center;
        padding-bottom: 14px;
        margin-bottom: 14px;
        .value {
            flex: 1;
            text-align: right;
            opacity: 0.9;
            font-size: 28px;
        }
        span {
            opacity: 0.8;
        }
    }
    .icon {
        width: 42px;
        height: 42px;
        margin-right: 12px;
        img {
            width: 42px;
            height: 42px;
        }
    }
}
.radials {
    .items {
        display: flex;
        justify-content: space-between;
    }
    .radial {
        padding-bottom: 26px;
    }
}

.radial-label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 70px;
    bottom: -14px;
    left: 13px;
    font-size: 12px;
    background: #131c24;
    border: 1px solid #42dfff;
    box-shadow: inset 0 0 9px 0 #42dfff;
}

.radial2 {
    .radial-label {
        border: 1px solid #08f0c9;
        box-shadow: inset 0 0 9px 0 #08f0c9;
    }
}

.radial3 {
    .radial-label {
        border: 1px solid #3c77ff;
        box-shadow: inset 0 0 9px 0 #3c77ff;
    }
}

.title {
    text-align: center;
    font-size: 22px;
}

.pile {
    display: flex;
    justify-content: space-between;
    .value {
        font-size: 40px;
        letter-spacing: -1px;
        text-align: center;
    }
    .income {
        .value {
            color: #42dfff;
        }
    }
    .count {
        .value {
            color: #08f0c9;
        }
    }
    .flow {
        .value {
            color: #3c77ff;
        }
    }
}
// .chart-item {
//     position: relative;
//     &:before,
//     &:after {
//         position: absolute;
//         content: '';
//         background: #42dfff;
//         left: -3px;
//     }
//     &:before {
//         width: 5px;
//         height: 34px;
//         bottom: 0;
//     }
//     &:after {
//         width: 37px;
//         height: 5px;
//         bottom: -3px;
//     }
// }
.bus-speed {
    .items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .speed-item {
        display: flex;
        align-items: center;
        width: 48%;
        margin-bottom: 20px;
    }
    .speed-body {
        position: relative;
        margin-left: 4px;
        line-height: 1;
        &:after {
            position: absolute;
            content: '';
            left: 0;
            bottom: -10px;
            width: 100%;
            height: 2px;
            background: #033651;
        }
    }
    .speed {
        opacity: 0.9;
    }
    .rank-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .busline {
        font-size: 12px;
        opacity: 0.8;
    }
    .rank {
        opacity: 1;
        font-size: 26px;
    }
}
.mileage {
    margin-top: 20px;
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 68px;
        margin-bottom: 20px;
    }
    .mileage-data {
        display: flex;
        align-items: center;
        height: 68px;
        margin-left: 10px;
        font-size: 28px;
        padding: 10px;
        width: 200px;
        flex-shrink: 0;
    }
}
.total {
    margin-top: 20px;
}
.total-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
    padding-left: 164px;
    background: url(~@images/radar.png) left center no-repeat;
    background-size: 144px 150px;
    line-height: 1;
    .label {
        opacity: 0.7;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .value {
        font-size: 45px;
        color: #42dfff;
    }
}
</style>

<style lang="less">
.home-container {
    .charts {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        .title {
            margin-bottom: 20px;
        }
        & > div {
            width: calc(50% - 6px);
        }
        .echarts {
            position: relative;
            width: 100%;
            // height: 450px;
            height: 300px;
            // border-bottom: 1px solid #42dfff;
            // border-left: 1px solid #42dfff;
            // &:before {
            //     position: absolute;
            //     content: '';
            //     background: #42dfff;
            //     left: -3px;
            //     height: 34px;
            //     width: 5px;
            //     top: 10px;
            // }
        }
    }
}
</style>
