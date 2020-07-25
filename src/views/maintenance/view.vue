<template>
    <div class="container maintenance-container">
        <div class="left">
            <div class="total">
                <div class="content">
                    <span class="title">运营里程</span>
                    <s-btn
                        class="value"
                        :corner="{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}"
                    >
                        {{ distance }}
                    </s-btn>
                    <span class="unit">KM</span>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">维修次数</div>
                <!-- <img style="width: 700px" :src="require('@images/demo/10.png')"> -->
                <v-chart :options="timesChart" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">维修信息</div>
                <div class="repair-item">
                    <span class="label">车辆</span>
                    <choose
                        v-if="buses.length > 0"
                        v-model="busIndex"
                        :options="buses"
                        :width="210"
                        :value-index="true"
                    />
                </div>
                <div v-for="(item, index) in repairs" :key="index" class="repair-item">
                    <span class="label">{{ item.label }}</span>
                    <s-btn class="value">{{ getProp(item.prop) }}</s-btn>
                </div>
                <div class="repair-item">
                    <span class="label">维修等级</span>
                    <s-btn
                        class="value-level"
                        :corner="{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}"
                    >
                        <span>二级维护</span>
                        <div class="repair-list">
                            <i class="icon-repair" />
                            <i class="icon-repair" />
                            <i class="icon-repair" />
                            <i class="icon-repair" />
                            <i class="icon-repair" />
                        </div>
                    </s-btn>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">出厂信息</div>
                <div v-for="(item, index) in factory" :key="index" class="factory-item">
                    <i :class="'icon icon-' + item.icon" />
                    <s-btn class="value">{{ getProp(item.prop) }}</s-btn>
                </div>
            </div>
        </div>
        <!-- <div class="right" /> -->
    </div>
</template>
<script>
import ProgressBar from '@/components/progressBar'

export default {
    components: { ProgressBar },
    data () {
        return {
            distance: 0,
            buses: [],
            item: {},
            busIndex: 0,
            repairs: [
                { prop: 'deptNo', label: '场站', value: '场站一' },
                { prop: 'planNo', label: '编号', value: 'WXH-19112305' },
                { prop: 'busLicense', label: '车牌号', value: '陕AV9276' },
                { prop: 'maintainSiteName', label: '维修点', value: '西咸汽车维修点' },
                { prop: 'checkinDate', label: '维修时间', value: '2019-11-23' },
                { prop: 'registerName', label: '维修人员', value: '杨建国' },
            ],
            factory: [
                { prop: 'checkoutDate', icon: 'time', value: '2018-09-24 12:00:00' },
                { prop: 'busNo', icon: 'number', value: '00123' },
                { prop: 'outOpName', icon: 'user', value: '王涛' },
            ],
            timesChart: {},
        }
    },
    watch: {
        async busIndex (v) {
            this.getPlan(this.buses[v].id || '')
        },
    },
    async created () {
        this.getData()
        this.getPlan()
    },
    methods: {
        async getData () {
            // 获取机务信息
            const { distance, times } = await this.$axios.get(
                'maintenance',
            )
            this.distance = distance
            this.setTimesChart(times)
        },
        setTimesChart (items) {
            const years = []
            const data = []
            items.forEach(item => {
                years.push(item.year)
                data.push(item.num)
            })
            this.timesChart = {
                legend: false,
                tooltip: {},
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
                    name: '年份',
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
                    data: years,
                },
                yAxis: {
                    name: '次',
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
                        barWidth: 12,
                        itemStyle: {
                            barBorderRadius: 6,
                            color: '#42DFFF',
                        },
                        data,
                    },
                ],
            }
        },
        async getPlan (busLicense) {
            // 获取维修计划
            const { item, busGroup } = await this.$axios.get(`maintenance/plan?busLicense=${busLicense || ''}`)
            // this.busGroup = busGroup
            this.item = item
            if (busGroup) {
                busGroup.forEach(b => {
                    this.buses.push({ id: b, label: b })
                })
            }
        },
        getProp (prop) {
            return this.item[prop] || ''
        },
    },
}
</script>
<style lang="less" scoped>
.maintenance-container {
    flex-wrap: wrap;
}
.left {
    flex: 1;
}
.mid,
.right {
    width: 310px;
    margin-left: 20px;
}
.total {
    height: 390px;
    background: url(~@images/bus-x-ray.png) bottom left no-repeat;
    background-size: auto 320px;
    .content {
        display: flex;
        align-items: center;
        .title {
            font-size: 24px;
            color: fade(#ffffff, 80);
        }
        .value {
            width: 260px;
            height: 68px;
            color: #42dfff;
            font-size: 40px;
            display: flex;
            align-items: center;
            margin: 0 26px 0 26px;
            padding: 0 30px;
        }
        .unit {
            font-size: 34px;
            color: #42dfff;
        }
    }
    img {
        width: 450px;
    }
}
.bottom {
    margin-top: 40px;
    /deep/ .echart {
        width: 950px;
        height: 420px;
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
.factory-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .icon {
        display: inline-block;
        width: 46px;
        height: 46px;
        background-size: cover;
    }
    .value {
        width: 240px;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        line-height: 1.2;
    }
    .icon-time {
        background-image: url('./assets/time.png');
    }
    .icon-number {
        background-image: url('./assets/number.png');
    }
    .icon-user {
        background-image: url('./assets/user.png');
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
