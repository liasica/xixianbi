<template>
    <div class="container operation-container">
        <relation-choose
            style="margin-right: 40px"
            @change="onFilter"
            @init="rcInit = true"
        />
        <div class="filter" />
        <div class="left">
            <div class="car-info">
                <div class="bi-title">车长信息</div>
                <div class="item">
                    <span class="label">选择车辆</span>
                    <choose
                        v-if="drivers.length > 0"
                        v-model="driverIndex"
                        :options="buses"
                        :value-index="true"
                        class="value"
                    />
                </div>
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
                <div class="bi-title">调度信息</div>
                <BiTable
                    :columns="columns1"
                    :source="list1"
                    :pagination="false"
                    :show-number="false"
                />
            </div>
        </div>
        <div class="mid">
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
                        :show-jump="false"
                        :show-total="false"
                        :page-size="5"
                        :page.sync="page"
                    />
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">延迟信息</div>
                <v-chart :options="lateOptions" />
                <!-- <div class="repair-item">
                    <span class="label">发车方向</span>
                    <s-btn class="value">西咸</s-btn>
                </div>
                <img :src="require('@images/demo/18.png')"> -->
            </div>
            <div class="deviate-info">
                <div class="bi-title">偏线信息</div>
                <ul>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/dash.png')">
                        </s-btn>
                        <span>偏线里程</span>
                        <div class="value">{{ offline.distance }} KM</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/warning.png')">
                        </s-btn>
                        <span>报警时长</span>
                        <div class="value">{{ offline.time }} H</div>
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
                        :label="`<span style='font-size:12px;margin-right:6px;'>${item.busNoChar}</span>${item.time}秒`"
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

import { scheduColumns, scheduData } from './mock'

export default {
    components: {
        TieText,
        BiTable,
        RelationChoose,
        ProgressBar,
    },
    data () {
        return {
            page: 1,
            late: {},
            lateOptions: {},
            filterData: {
                filaName: '', // 公司
                groupName: '', // 场站
                lineNo: '', // 线路
            },
            rcInit: false,
            scheduColumns,
            scheduData,
            orderColumns: [
                { prop: 'up', label: '时间点' },
                { prop: 'upStation', label: '开往上行', render: (v, item) => (item.up ? v : '') },
                { prop: 'down', label: '时间点' },
                { prop: 'downStation', label: '开往下行', render: (v, item) => (item.down ? v : '') },
            ],
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
            buses: [],
            driverIndex: 0,
            drivers: [],
            columns1: [],
        }
    },
    computed: {
        driver () {
            return this.drivers[this.driverIndex] || {}
        },
        driverInfo () {
            const { driver } = this
            return [
                { label: '车牌号', value: driver.busNoChar },
                { label: '物理卡号', value: driver.cardNo },
                { label: '司机工号', value: driver.opNo },
                { label: '打卡时间', value: (driver.startTime || ' ').split(' ')[1] },
            ]
        },
    },
    created () {
        this.getData()
        this.getLineplan()
        this.getPageData()
    },
    methods: {
        async getPageData () {
            const { analysis, overspeed, offline, late } = await this.$axios.get('operation')
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
            this.offline = offline
            this.overspeed = overspeed
            this.setLateChart(late)
        },
        setLateChart ({ overview, items }) {
            this.late = items
            const hs = []
            const ontime = []
            const late = []
            const forward = []
            const lateTime = []
            overview.forEach(o => {
                hs.push(o.h)
                let t = 0
                o.items.forEach((item, i) => {
                    switch (i) {
                        default:
                            t += item.num
                            break
                        case 1:
                            lateTime.push(parseFloat((Math.abs(item.diff) / 60).toFixed(2), 2))
                            late.push(item.num)
                            break
                        case 2:
                            forward.push(item.num)
                            // forward.push(parseFloat((Math.abs(item.diff) / 60).toFixed(2), 2))
                            break
                    }
                })
                ontime.push(t)
            })
            // console.info(ontime, late, forward)
            this.lateOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                    },
                    // formatter: '{b0}点<br />{b1}: {c1}',
                    formatter: params => {
                        // console.info(params)
                        // return 'test'
                        const h = params[0].name
                        let label = `${h} 点<br>`
                        params.forEach(p => {
                            label += `${p.marker} ${p.seriesName}: ${p.value} ${p.seriesType === 'bar' ? '辆' : '分'} <br>`
                        })
                        if (items[h]) {
                            label += '晚点车辆<br>'
                            items[h].forEach(item => {
                                label += `<span style="font-size:12px">${item.busNoChar}</span><br>`
                            })
                        }
                        return label
                    },
                },
                legend: {
                    data: ['提前', '晚点', '准点', '晚点时间'],
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'BDZongYi',
                    },
                },
                grid: {
                    // width: 240,
                    left: 60,
                    right: 60,
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
                xAxis: [
                    {
                        type: 'category',
                        data: hs,
                        axisPointer: {
                            type: 'shadow',
                        },
                        axisLabel: {
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '车数',
                        // min: 0,
                        // max: 25,
                        // interval: 5,
                        axisLabel: {
                            formatter: '{value} 辆',
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
                                color: '#3C77FF',
                                opacity: 0.3,
                            },
                        },
                        max: v => v.max + 50,
                    },
                    {
                        type: 'value',
                        name: '分钟',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value} m',
                            color: '#ffffff',
                            fontFamily: 'BDZongYi',
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#42DFFF',
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
                        name: '准点',
                        type: 'bar',
                        data: ontime,
                        itemStyle: {
                            color: '#42DFFF',
                        },
                    },
                    {
                        name: '晚点',
                        type: 'bar',
                        data: late,
                        itemStyle: {
                            color: '#ff42b2',
                        },
                    },
                    {
                        name: '提前',
                        type: 'bar',
                        data: forward,
                        itemStyle: {
                            color: '#00F4C7',
                        },
                    },
                    {
                        name: '晚点时间',
                        type: 'line',
                        yAxisIndex: 1,
                        data: lateTime,
                        lineStyle: {
                            color: '#ff42b2',
                        },
                        itemStyle: {
                            color: '#ff42b2',
                            borderWidth: 6,
                        },
                    },
                ],
            }
        },
        async getData () {
            try {
                const { items } = await this.$axios.get('operation/planlist', {
                    params: {
                        line: this.filterData.lineNo,
                    },
                })
                this.orderData = items
            } catch (err) {
                console.log(err)
            }
        },
        async getDriverInfo () {
            const { items } = await this.$axios.get('operation/drivers')
            this.drivers = items
            const buses = []
            items.forEach(item => {
                buses.push({ id: item.busNoChar, label: item.busNoChar })
            })
            this.buses = buses
            // this.driver = data.driver
        },
        async getLineplan () {
            try {
                const { items, planProjectName } = await this.$axios.get('operation/lineplan', {
                    params: {
                        lineNo: this.filterData.lineNo,
                    },
                })
                if (!planProjectName || items.length < 1) {
                    return
                }
                this.columns1 = [
                    { prop: 'plan', label: planProjectName, align: 'left' },
                    { prop: 'up', label: '上行方向' },
                    { prop: 'down', label: '下行方向' },
                ]
                const list = items
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
                            up: list[0].interval,
                            down: list[1].interval,
                        },
                        {
                            plan: '间隔班次',
                            up: list[0].sendPlanNum,
                            down: list[1].sendPlanNum,
                        },
                        {
                            plan: '总班次',
                            up: list[0].totalTimes,
                            down: list[1].totalTimes,
                        },
                        {
                            plan: '单程时间',
                            up: list[0].singleTime,
                            down: list[1].singleTime,
                        },
                    ]
                }
                this.list1 = rlt
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter (choosed) {
            if (this.rcInit) {
                return
            }
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
            margin-bottom: 16px;
            img {
                width: 54px;
                height: 54px;
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
.bottom /deep/ th:first-child {
    width: 100px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: block;
    white-space: normal;
}
</style>
