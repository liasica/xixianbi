<template>
    <div class="container station-container">
        <div class="bi-title">场站信息</div>
        <choose v-model="station" class="station-choose" :options="companies" />
        <div class="bi-title" style="margin-top: 20px;">累计进出量</div>
        <div v-if="settings && busInfo" :key="uuid" class="progress-bars">
            <progress-bar class="pbar" label="常规公交" :schedule="[settings.normal, busInfo.normal]" />
            <progress-bar
                class="pbar"
                label="定制公交"
                :schedule="[settings.custom, busInfo.custom]"
                color="#08F0C9"
            />
            <progress-bar
                class="pbar"
                label="通勤公交"
                :schedule="[settings.commute, busInfo.commute]"
                color="#3C77FF"
            />
        </div>
        <div class="bi-title" style="margin-top: 20px;">充电桩规模</div>
        <div v-if="chargingPosts" class="charge-places">
            <img src="./assets/charge-places.png" alt>
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
        ProgressBar,
    },
    data () {
        return {
            station: '',
            companies: [],
            chargingPosts: null,
            settings: null,
            busInfo: null,
            uuid: +new Date(),
        }
    },
    watch: {
        async station (v) {
            const { chargingPosts, settings, busInfo } = await this.$axios.get(
                `station?station=${v}`,
            )
            this.uuid = +new Date()
            this.chargingPosts = chargingPosts
            this.settings = settings
            this.busInfo = busInfo
        },
    },
    async created () {
        const { companies } = await this.$axios.get('basic/company')
        this.companies = companies
        this.station = companies[0].id
    },
    methods: {
        getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max))
        },
    },
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
