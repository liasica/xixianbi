<template>
    <div class="container operation-container">
        <div class="filter">
            <choose
                label="公司"
                :value="1"
                :options="[{id: 1, label: '西咸公交集团'}, {id: 2, label: '西咸公交子公司'}]"
            />
            <choose
                label="场站"
                :value="1"
                :options="[{id: 1, label: '场站一'}, {id: 2, label: '场站二'}, {id: 3, label: '场站三'}]"
            />
            <choose
                label="线路"
                :value="1"
                :options="[{id: 1, label: '880'}, {id: 2, label: '600'}, {id: 3, label: '1101'}]"
            />
            <choose
                label="司机"
                :value="1"
                :options="[{id: 1, label: '张三'}, {id: 2, label: '李四'}, {id: 2, label: '王五'}]"
            />
        </div>
        <div class="left">
            <div class="car-info">
                <div class="bi-title">车长信息</div>
                <div class="car-user">
                    <img src="./assets/user.png" alt />
                    <TieText>
                        <div class="user-name">
                            <span class="title">姓名</span>
                            <span>徐卫峰</span>
                        </div>
                    </TieText>
                </div>
                <div v-for="(item, index) in driver" :key="index" class="item">
                    <span class="label">{{ item.label }}</span>
                    <s-btn class="value">{{ item.value }}</s-btn>
                </div>
            </div>
            <div class="bottom">
                <div class="bi-title">调度计划</div>
                <BiTable :columns="columns1" :source="list1" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">排班计划</div>
                <div class="schedu-plan">
                    <div class="title-box">
                        <span class="name">排班表</span>
                        <div>
                            <div class="item">
                                方案名称
                                <span>1121</span>
                            </div>
                            <div class="item">
                                部位号
                                <span>12</span>
                            </div>
                        </div>
                    </div>
                    <BiTable :columns="columns2" :source="list2" class="s-table" />
                    <BiPagination
                        :total="total"
                        :page.sync="page"
                        @pagination="handleChange"
                        :jump="false"
                        :showTotal="false"
                    />
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/14.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/16.png')" />
            </div>
        </div>
    </div>
</template>
<script>
import TieText from '@/components/tieText'
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'

export default {
    components: {
        TieText,
        BiTable,
        BiPagination
    },
    data () {
        return {
            driver: [
                { label: '车牌号', value: '陕AV9267' },
                { label: '物理卡号', value: '2D5A0531' },
                { label: '司机工号', value: 'XIA000001' },
                { label: '打卡时间', value: '2019-07-23 12:32:34' }
            ],
            scheduColumns: [
                { prop: 'plan', label: '800摆渡车计划' },
                { prop: 'up', label: '上行方向' },
                { prop: 'down', label: '下行方向' }
            ],
            scheduData: [
                { plan: '车牌号', up: '上行', down: '下行' },
                { plan: '开始时间点', up: '08:05', down: '08:10' },
                { plan: '发车间隔', up: '10', down: '10' },
                { plan: '间隔班次', up: '50', down: '51' },
                { plan: '总班次', up: '50', down: '51' },
                { plan: '单程时间', up: '43', down: '43' }
            ],
            orderColumns: [
                { prop: 'timeup', label: '时间点' },
                { prop: 'up', label: '开往上行' },
                { prop: 'timedown', label: '时间点' },
                { prop: 'down', label: '开往下行' }
            ],
            orderData: [
                {
                    timeup: '08:00',
                    up: '泾河新城管委会',
                    timedown: '08:05',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:10',
                    up: '泾河新城管委会',
                    timedown: '08:15',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:20',
                    up: '泾河新城管委会',
                    timedown: '08:25',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:30',
                    up: '泾河新城管委会',
                    timedown: '08:35',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:40',
                    up: '泾河新城管委会',
                    timedown: '08:45',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:50',
                    up: '泾河新城管委会',
                    timedown: '08:55',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:00',
                    up: '泾河新城管委会',
                    timedown: '09:05',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:10',
                    up: '泾河新城管委会',
                    timedown: '09:15',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:20',
                    up: '泾河新城管委会',
                    timedown: '09:25',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:30',
                    up: '泾河新城管委会',
                    timedown: '09:35',
                    down: '后卫寨地铁站'
                }
            ],
            columns1: [
                { prop: 'plan', label: '800摆渡车计划', align: 'left' },
                { prop: 'up', label: '上行方向' },
                { prop: 'down', label: '下行方向' }
            ],
            list1: [
                {
                    plan: '是否上下行',
                    up: '上行',
                    down: '下行'
                },
                {
                    plan: '开始时间点',
                    up: '08:05',
                    down: '08:10'
                },
                {
                    plan: '发车间隔',
                    up: '10',
                    down: '10'
                },
                {
                    plan: '间隔班次',
                    up: '50',
                    down: '51'
                },
                {
                    plan: '总班次',
                    up: '50',
                    down: '51'
                },
                {
                    plan: '单程时间',
                    up: '43',
                    down: '43'
                }
            ],
            columns2: [
                { prop: 'uptime', label: '时间点' },
                { prop: 'up', label: '开往上行' },
                { prop: 'downtime', label: '时间点' },
                { prop: 'down', label: '开往下行' }
            ],
            list2: [
                {
                    uptime: '08:00',
                    up: '泾河新城管委会',
                    downtime: '08:05',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '08:10',
                    up: '泾河新城管委会',
                    downtime: '08:15',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '08:20',
                    up: '泾河新城管委会',
                    downtime: '08:25',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '08:30',
                    up: '泾河新城管委会',
                    downtime: '08:35',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '08:40',
                    up: '泾河新城管委会',
                    downtime: '08:45',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '08:50',
                    up: '泾河新城管委会',
                    downtime: '08:55',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '09:00',
                    up: '泾河新城管委会',
                    downtime: '09:05',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '09:10',
                    up: '泾河新城管委会',
                    downtime: '09:15',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '09:20',
                    up: '泾河新城管委会',
                    downtime: '09:25',
                    down: '后卫寨地铁站'
                },
                {
                    uptime: '09:30',
                    up: '泾河新城管委会',
                    downtime: '09:35',
                    down: '后卫寨地铁站'
                }
            ],
            total: 150,
            page: 1
        }
    },
    methods: {
        handleChange (value) {}
    }
}
</script>
<style lang="less">
.operation-container {
    flex-wrap: wrap;
    .filter {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 40px;
    }
    .left {
        width: 310px;
    }
    .mid {
        flex: 1;
    }
    .right {
        width: 320px;
    }
    .bottom {
        margin-top: 40px;
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
}
</style>
