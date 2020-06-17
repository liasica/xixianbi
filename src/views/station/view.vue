<template>
    <div class="container station-container">
        <div class="bi-title">场站信息</div>
        <choose class="station-choose" :options="companies" v-model="station" />
        <div class="violation">
            <div class="bi-title">当日车辆违规统计</div>
            <ul>
                <li class="thin-border border-bottom">
                    <img class="icon-users" :src="require('./assets/users.png')" />
                    <span>本月30内报警数</span>
                    <div class="value">20</div>
                </li>
                <li class="thin-border border-bottom">
                    <img class="icon-driver" :src="require('./assets/driver.png')" />
                    <span>驾驶员违法违规</span>
                    <div class="value">0</div>
                </li>
                <li class="thin-border border-bottom">
                    <img class="icon-user" :src="require('./assets/user.png')" />
                    <span>驾驶员事故次数</span>
                    <div class="value">0</div>
                </li>
            </ul>
        </div>
        <div class="bi-title">累计进出量</div>
        <div class="progress-bars">
            <progress-bar class="pbar" label="常规公交" :schedule="[12, 370]" />
            <progress-bar class="pbar" label="定制公交" :schedule="[3, 22]" color="#08F0C9" />
            <progress-bar class="pbar" label="通勤公交" :schedule="[2, 29]" color="#3C77FF" />
        </div>
        <div class="bi-title">充电桩规模</div>
        <div class="charge-places" v-if="chargingPosts">
            <img src="./assets/charge-places.png" alt />
            <p>电桩类别: {{ Object.keys(chargingPosts.type).map(key => key + '/' + chargingPosts.type[key]).join(' ') }}</p>
            <p>所属运营商: {{ chargingPosts.operator.join('/') }}</p>
            <p>累计充电时间: {{ (chargingPosts.time / 60).toFixed(2) }}小时</p>
        </div>
    </div>
</template>
<script>
import TieText from '@/components/tieText'
import ProgressBar from '@/components/progressBar'

export default {
    components: {
        TieText,
        ProgressBar
    },
    data () {
        return {
            station: '',
            companies: [],
            chargingPosts: null
        }
    },
    methods: {
        getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max))
        }
    },
    async created () {
        const { companies } = await this.$axios.get('basic/company')
        this.companies = companies
        this.station = companies[0].id
    },
    watch: {
        async station (v) {
            const { chargingPosts } = await this.$axios.get(
                `station?station=${v}`
            )
            this.chargingPosts = chargingPosts
        }
    }
}
</script>

<style lang="less" scoped>
.station-container {
    display: flex;
    flex-direction: column;
}
.demo {
    width: 330px;
    position: absolute;
}
.sub-title {
    width: 260px;
    margin-left: 20px;
}
.violation {
    margin-top: 24px;
    width: 330px;
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
    img {
        width: 100%;
        height: 100%;
    }
    .icon-users {
        width: 34px;
        height: 24px;
        margin-right: 12px;
    }
    .icon-driver {
        width: 30px;
        height: 32px;
        margin-right: 12px;
    }
    .icon-user {
        width: 28px;
        height: 34px;
        margin-right: 12px;
    }
}
.progress-bars {
    width: 330px;
}
.charge-places {
    // width: 330px;
    position: relative;
    padding-left: 100px;
    img {
        position: absolute;
        width: 120px;
        left: 0;
    }
    p {
        margin: 15px 0;
        font-size: 18px;
    }
}
</style>

<style lang="less">
.station-choose {
    .s-btn {
        width: 260px !important;
    }
}
</style>
