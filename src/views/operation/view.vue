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
                            <span class="title">姓名</span>
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
                <BiTable :columns="columns1" :source="list1" :pagination="false" />
            </div>
        </div>
        <div class="mid">
            <div>
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
                        :pagination="{pageSize: 10, jump: false, showTotal: false}"
                    />
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/14.png')">
            </div>
            <div class="bottom">
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/16.png')">
            </div>
        </div>
    </div>
</template>
<script>
import RelationChoose from '@/components/relationChoose'
import TieText from '@/components/tieText'
import BiTable from '@/components/table'

import { scheduColumns, scheduData, orderColumns } from './mock'

export default {
    components: {
        TieText,
        BiTable,
        RelationChoose,
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
    },
    methods: {
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
