<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="current"
                    class="choose"
                    label=""
                    :options="options"
                    :width="450"
                />
            </div>
            <div class="content-box">
                <div class="left">
                    <div class="bi-title" style="margin:0">当日驾驶员警告排名</div>
                    <div class="driver-rank">
                        <div class="title">
                            <span>排名</span>
                            <span>驾驶员</span>
                            <span>总数</span>
                        </div>
                        <div class="rank-list">
                            <div v-for="item in driver" :key="item.rank" class="driver">
                                <span>{{ item.rank }}</span>
                                <span>{{ item.driverName }}</span>
                                <span>{{ item.warnCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="bi-title">{{ title }}</div>
                    <alarm-parallel v-show="current==='week'" :items="week" />
                    <alarm-parallel v-show="current==='month'" :items="month" />
                    <month-parallel v-show="current==='compare'" :items="compare" />
                    <div v-show="current==='rank'" class="table">
                        <div class="thead">
                            <span>排名</span>
                            <span>线路</span>
                            <span>总数</span>
                        </div>
                        <div class="tbody">
                            <div v-for="item in rank" :key="item.rank" class="item">
                                <span>{{ item.rank }}</span>
                                <span>{{ item.lineName }}</span>
                                <span>{{ item.warnCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import alarmParallel from '@/views/home/alarmParallel'
import monthParallel from '@/views/home/monthParallel'

export default {
    components: {
        BiTable,
        alarmParallel,
        monthParallel,
    },
    data () {
        return {
            options: [
                { label: '七日报警总数', id: 'week' },
                { label: '30日报警总数', id: 'month' },
                { label: '本月和上月报警对比', id: 'compare' },
                { label: '前十名线路30日告警排名', id: 'rank' },
                // { label: '前十名线路30日告警排名', id: 'compare' },
            ],
            current: 'week',
            compare: [], // 本月和上月报警类型对比
            month: [], // 30日报警总数
            week: [], // 本月和上月报警对比
            rank: [], // 前十名线路30日告警排名
            driver: [], // 当日驾驶员告警排名
        }
    },
    computed: {
        title () {
            const list = {
                week: '七日报警总数',
                month: '30日报警总数',
                compare: '本月和上月报警对比',
                rank: '前十名线路30日告警排名',
            }
            return list[this.current]
        },
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                // 本月和上月报警类型对比 compare
                // 30日内报警总数，包括环比，同比 month
                // 7日内报警总数，包括环比，同比 week
                // 30日内线路告警排名 rank
                // 当日驾驶员告警排名 driver
                const data = await this.$axios.get('alarm')
                this.driver = data.driver
                this.compare = data.compare
                this.month = data.month
                this.week = data.week
                this.rank = data.rank
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>
<style lang="less" scoped>
.container {
    display: flex;
    // min-height: calc(100vh - 130px);
    .content {
        flex: 1;
        height: 100%;
        margin-left: 20px;
    }
    .filter-box {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 25px;
    }
    .content-box{
        display: flex;
    }
    .left{
        width: 380px;
        margin-right: 25px;
    }
    .right {
        flex:1;
        overflow: hidden;
        min-height: 580px;
    }
    .driver-rank{
        background-color: #122836;
        padding-top: 14px;
        .title, .driver {
            display: flex;
            span{
                flex:1;
                text-align: center;
            }
        }
        .rank-list{
            max-height: 550px;
            overflow: auto;
            padding-bottom: 20px;
        }
        .driver{
            min-height: 46px;
            line-height: 46px;
            margin-bottom: 14px;
            &:nth-child(1){
                background-color: rgba(8, 240, 201, 0.5);
            }
            &:nth-child(2){
                background-color: rgba(60, 119, 255, 0.5);
            }
            &:nth-child(3){
                background-color: rgba(66, 223, 255, 0.5);
            }
        }
    }
    .table{
        padding: 30px;
        border:1px solid #7AFFF2;
        overflow: hidden;
        .thead{
            display: flex;
            height: 64px;
            line-height: 64px;
            border-bottom: 1px solid #42DFFF;
            span{
                flex:1;
                text-align: center;
            }
        }
        .tbody{
            overflow: auto;
            max-height: 500px;
            .item{
                height: 64px;
                display: flex;
                line-height: 64px;
                &:nth-child(even){
                    background-color: rgba(42, 75, 112, 0.3);
                }
                span{
                    flex:1;
                    text-align: center;
                }
            }
        }
    }

}
</style>
<style>
.echarts {
    width: 800px;
    height: 600px;
}
</style>
