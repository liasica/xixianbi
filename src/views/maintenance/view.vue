<template>
    <div class="container maintenance-container">
        <div class="left">
            <div class="total">
                <div class="content">
                    <span class="title">运营里程</span>
                    <s-btn
                        class="value"
                        :corner="{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}"
                    >{{ distance }}</s-btn>
                    <span class="unit">KM</span>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">维修次数</div>
                <img :src="require('@images/demo/10.png')" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">维修信息</div>
                <div v-for="(item, index) in repairs" :key="index" class="repair-item">
                    <span class="label">{{ item.label }}</span>
                    <s-btn class="value">{{ item.value }}</s-btn>
                </div>
                <div class="repair-item">
                    <span class="label">维修等级</span>
                    <s-btn
                        class="value-level"
                        :corner="{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}"
                    >
                        <span>二级维护</span>
                        <div class="repair-list">
                            <i class="icon-repair"></i>
                            <i class="icon-repair"></i>
                            <i class="icon-repair"></i>
                            <i class="icon-repair"></i>
                            <i class="icon-repair"></i>
                        </div>
                    </s-btn>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">出厂信息</div>
                <div v-for="(item, index) in factory" :key="index" class="factory-item">
                    <i :class="'icon icon-' + item.icon"></i>
                    <s-btn class="value">{{ item.value }}</s-btn>
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
                <img :src="require('@images/demo/18.png')" />
            </div>
            <div class="deviate-info">
                <div class="bi-title">偏线信息</div>
                <ul>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/dash.png')" />
                        </s-btn>
                        <span>偏线里程</span>
                        <div class="value">46 KM</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('./assets/warning.png')" />
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
                        rightText="km/h"
                        :noBorder="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProgressBar from '@/components/progressBar'

export default {
    components: { ProgressBar },
    data () {
        return {
            distance: 0,
            offline: {
                time: ''
            },
            overspeed: [],
            repairs: [
                { label: '地点', value: '场站一' },
                { label: '信息', value: 'WXH-19112305' },
                { label: '车牌号', value: '陕AV9276' },
                { label: '维修点', value: '西咸汽车维修点' },
                { label: '维修时间', value: '2019-11-23' },
                { label: '维修人员', value: '杨建国' }
            ],
            factory: [
                { icon: 'time', value: '2018-09-24 12:00:00' },
                { icon: 'number', value: '00123' },
                { icon: 'user', value: '王涛' }
            ]
        }
    },
    async created () {
        this.getData()
    },
    methods: {
        async getData () {
            // 获取机务信息
            const { distance, offline, overspeed } = await this.$axios.get(
                'maintenance'
            )
            this.distance = distance
            this.offline = offline
            this.overspeed = overspeed
        },
        getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max))
        }
    }
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
    background: url(~@images/bus-x-ray.png) bottom right no-repeat;
    background-size: contain;
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
