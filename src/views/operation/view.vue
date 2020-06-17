<template>
    <div class="container operation-container">
        <relation-choose
            @change="choosed => filterData = choosed"
            @init="choosed => filterData = choosed"
            with-driver
            style="margin-right: 40px"
        />
        <div class="filter"></div>
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
                <BiTable :columns="columns1" :source="list1" :pagination="false" />
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
import RelationChoose from '@/components/relationChoose'
import TieText from '@/components/tieText'
import BiTable from '@/components/table'

import {
    driver,
    scheduColumns,
    scheduData,
    orderColumns,
    columns1,
    list1
} from './mock'

export default {
    components: {
        TieText,
        BiTable,
        RelationChoose
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 场站
                lineNo: '' // 线路
            },
            driver,
            scheduColumns,
            scheduData,
            orderColumns,
            orderSource: [],
            orderData: [],
            columns1,
            list1
        }
    },
    created () {
        this.getDate()
    },
    methods: {
        async getDate () {
            try {
                const data = await this.$axios.get('operation', {
                    params: {
                        line: this.filterData.lineNo
                    }
                })
                this.orderSource = data.items
                this.orderData = data.items
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter () {
            this.getDate()
        }
    }
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
