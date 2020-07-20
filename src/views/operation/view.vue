<template>
    <div class="container operation-container">
        <relation-choose
            with-driver
            style="margin-right: 40px"
            @change="onFilter"
            @init="onFilter"
        />
        <div class="filter" />
        <div class="left">
            <div class="car-info">
                <div class="bi-title">车长信息</div>
                <div class="car-user">
                    <img src="./assets/user.png" alt>
                    <TieText>
                        <div class="user-name">
                            <span class="title">司机</span>
                            <span>{{ driver.employeeName }}</span>
                        </div>
                    </TieText>
                </div>
                <div v-for="(item, index) in driverInfo" :key="index" class="item">
                    <span class="label">{{ item.label }}</span>
                    <s-btn class="value">{{ item.value }}</s-btn>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">调度计划</div>
                <BiTable
                    :columns="columns1"
                    :source="list1"
                    :pagination="false"
                    :show-number="false"
                />
            </div>
        </div>
        <div class="mid">
            <div class="schedu-box">
                <div class="bi-title">排班计划</div>
                <div class="schedu-plan">
                    <div class="title-box">
                        <span class="name">排班表</span>
                        <!-- <div>
                            <div class="item">
                                方案名称
                                <span>1121</span>
                            </div>
                            <div class="item">
                                部位号
                                <span>12</span>
                            </div>
                        </div>-->
                    </div>
                    <BiTable
                        :columns="orderColumns"
                        :source="orderData"
                        class="s-table"
                        :pagination="{pageSize: 5, jump: false, showTotal: false}"
                    />
                </div>
            </div>
            <div class="chart-box">
                <div class="side-chart">
                    <div class="bi-title">营运分析</div>
                    <v-chart :options="busChart" />
                </div>
                <div class="bottom side-chart">
                    <div class="bi-title">营运里程</div>
                    <v-chart :options="mileageChart" />
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">延迟信息</div>
                <div class="repair-item">
                    <span class="label">发车方向</span>
                    <s-btn class="value">西咸</s-btn>
                </div>
                <img :src="require('@images/demo/18.png')">
            </div>
            <div class="deviate-info">
                <div class="bi-title">偏线信息</div>
                <ul>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/dash.png')">
                        </s-btn>
                        <span>偏线里程</span>
                        <div class="value">46 KM</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/warning.png')">
                        </s-btn>
                        <span>报警时长</span>
                        <div class="value">{{ offline.time }} s</div>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <div class="bi-title">超速信息</div>
                <div class="progress-bars">
                    <progress-bar
                        v-for="(item, index) in overspeed"
                        :key="index"
                        class="pbar"
                        :label="`${item.time}秒`"
                        :schedule="item.speed"
                        right-text="km/h"
                        :no-border="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RelationChoose from '@/components/relationChoose'
import TieText from '@/components/tieText'
import BiTable from '@/components/table'
import ProgressBar from '@/components/progressBar'

import { scheduColumns, scheduData, orderColumns } from './mock'

export default {
    components: {
        TieText,
        BiTable,
        RelationChoose,
        ProgressBar,
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 场站
                lineNo: '', // 线路
                driver: '', // 司机
            },
            driver: {},
            scheduColumns,
            scheduData,
            orderColumns,
            orderSource: [],
            orderData: [],
            list1: [],
            busChart: {},
            mileageChart: {},
            chartOptions: {
                legend: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                tooltip: {},
                grid: {
                    width: 240,
                    left: 70,
                    right: 0,
                },
                dataset: {
                    source: [
                        // ['月份', '实际发车数', '实际趟数'],
                        // ['2020-01', 1647, 7794],
                    ],
                },
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 50,
                    },
                    {
                        type: 'slider',
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 50,
                        height: 16,
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
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            color: '#2177FF',
                        },
                    },
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            color: '#00F4C7',
                        },
                    },
                ],
            },
            offline: {
                time: '',
            },
            overspeed: [],
        }
    },
    computed: {
        columns1 () {
            const list = [
                { prop: 'plan', label: `${this.filterData.lineNo}摆渡车计划`, align: 'left' },
                { prop: 'up', label: '上行方向' },
                { prop: 'down', label: '下行方向' },
            ]
            return list
        },
        driverInfo () {
            return [
                { label: '车牌号', value: this.driver.busNoChar },
                { label: '物理卡号', value: this.driver.cardNo },
                { label: '司机工号', value: this.driver.opNo },
                { label: '打卡时间', value: this.driver.startTime },
            ]
        },
    },
    created () {
        this.getData()
        this.getLineplan()
        this.getPageData()
        this.getDataInfo()
    },
    methods: {
        async getPageData () {
            const { analysis } = await this.$axios.get('operation')
            const busChart = JSON.parse(JSON.stringify(this.chartOptions))
            const mileageChart = JSON.parse(JSON.stringify(this.chartOptions))
            busChart.dataset.source = [['月份', '实际发车数', '实际趟数']]
            mileageChart.dataset.source = [['月份', '计划里程', '实际里程']]
            analysis.forEach(a => {
                busChart.dataset.source.push([a.month, parseInt(a.realBus, 10), parseInt(a.times, 10)])
                mileageChart.dataset.source.push([a.month, parseInt(a.planDis, 10), parseInt(a.realDis, 10)])
            })
            this.busChart = busChart
            this.mileageChart = mileageChart
        },
        async getDataInfo () {
            // 获取机务信息
            const { offline, overspeed } = await this.$axios.get(
                'maintenance',
            )
            this.offline = offline
            this.overspeed = overspeed
        },
        async getData () {
            try {
                const data = await this.$axios.get('operation/planlist', {
                    params: {
                        line: this.filterData.lineNo,
                    },
                })
                const list = data.items.map(item => ({
                    ...item,
                    upStations: data.upStations[1],
                    downStations: data.downStations[1],
                }))
                this.orderSource = list
                this.orderData = list
            } catch (err) {
                console.log(err)
            }
        },
        async getDriverInfo () {
            try {
                const data = await this.$axios.get('basic/driver', {
                    params: {
                        id: this.filterData.driver,
                    },
                })
                this.driver = data.driver
            } catch (err) {
                console.log(err)
            }
        },
        async getLineplan () {
            try {
                const data = await this.$axios.get('operation/lineplan', {
                    params: {
                        lineNo: this.filterData.lineNo,
                    },
                })
                const list = data.items
                let rlt = []
                if (list.length === 2) {
                    rlt = [
                        {
                            plan: '是否上下行',
                            up: list[0].isUpDown === 0 ? '上行' : '下行',
                            down: list[1].isUpDown === 0 ? '上行' : '下行',
                        },
                        {
                            plan: '开始时间点',
                            up: list[0].firstBusTime,
                            down: list[1].firstBusTime,
                        },
                        {
                            plan: '发车间隔',
                            up: '-',
                            down: '-',
                        },
                        {
                            plan: '间隔班次',
                            up: list[0].sendPlanNum,
                            down: list[1].sendPlanNum,
                        },
                        {
                            plan: '总班次',
                            up: list[0].motorcadeSum,
                            down: list[1].motorcadeSum,
                        },
                        {
                            plan: '单程时间',
                            up: '-',
                            down: '-',
                        },
                    ]
                }
                this.list1 = rlt
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter (choosed) {
            this.filterData = choosed
            this.getData()
            this.getDriverInfo()
            this.getLineplan()
        },
    },
}
</script>
<style lang="less">
.operation-container {
    flex-wrap: wrap;
    .left {
        width: 310px;
    }
    .mid {
        flex: 1;
    }
    .right {
        width: 320px;
    }
    .car-info {
        .item {
            display: flex;
            margin-bottom: 16px;
            align-self: center;
            justify-content: space-between;
            .label {
                padding: 15px 0;
            }
            .value {
                width: 210px;
                min-height: 50px;
                font-size: 22px;
                padding: 10px;
            }
        }
        .car-user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                width: 70px;
                height: 70px;
            }
            .user-name {
                width: 200px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 18px;
            }
            .title {
                color: fade(#ffffff, 80);
                font-size: 20px;
            }
        }
    }
    .schedu-plan {
        border: 1px solid #7afff2;
        margin: 0 8px;
        padding-bottom: 30px;
        .title-box {
            background-color: fade(#2a4b70, 20);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 30px;
            .name {
                color: fade(#08f0c9, 70);
            }
            > div {
                display: flex;
                .item {
                    height: 45px;
                    font-size: 20px;
                    border: 1px solid fade(#42dfff, 80);
                    margin-left: 24px;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    span {
                        font-size: 30px;
                        color: fade(#08f0c9, 80);
                    }
                }
            }
        }
        .s-table {
            th {
                padding: 15px 0;
            }
            td {
                padding: 6px 0;
            }
        }
    }
    .chart-box{
        display: flex;
        align-items: center;
        padding-top: 20px;
        padding-left: 8px;
    }
    .side-chart {
        width: 100%;
        overflow: hidden;
    }

    .side-chart /deep/ .echarts {
        height: 380px;
    }

    .echarts {
        width: 320px;
    }
}
.repair-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    .value,
    .value-level {
        width: 210px;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 15px 10px;
        line-height: 1;
    }
    .value-level {
        height: 100px;
        flex-direction: column;
        padding: 15px 0;
        .repair-list {
            display: flex;
            margin-top: 15px;
            width: 100%;
            justify-content: space-around;
        }
        .icon-repair {
            display: inline-block;
            width: 36px;
            height: 36px;
            background-image: url('./assets/repair.png');
            background-size: cover;
        }
    }
}
.deviate-info {
    .icon {
        width: 42px;
        height: 42px;
        margin-right: 12px;
        img {
            width: 42px;
            height: 42px;
        }
    }
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
}
</style>
