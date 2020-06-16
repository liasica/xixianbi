<template>
    <div class="container operation-container" v-if="lines.length > 0">
        <div class="filter">
            <choose label="公司" v-model="choosed.company" value-index :options="lines" />
            <choose
                label="场站"
                value-index
                v-model="choosed.station"
                :options="lines[choosed.company].children"
            />
            <choose
                label="线路"
                value-index
                v-model="choosed.line"
                :options="lines[choosed.company].children[choosed.station].children"
            />
            <choose
                label="司机"
                :value="1"
                :options="[{id: 1, label: '李经西'}, {id: 2, label: '杨建国'}, {id: 3, label: '曹建民'}]"
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

import {
    driver,
    scheduColumns,
    scheduData,
    orderColumns,
    orderData,
    columns1,
    list1,
    columns2,
    list2
} from './mock'

export default {
    components: {
        TieText,
        BiTable,
        BiPagination
    },
    data () {
        return {
            lines: [],
            choosed: {
                company: 0, // 公司
                station: 0, // 场站
                line: 0 // 线路
            },
            driver,
            scheduColumns,
            scheduData,
            orderColumns,
            orderData,
            columns1,
            list1,
            columns2,
            list2,
            total: 150,
            page: 1
        }
    },
    methods: {
        handleChange (value) {}
    },
    async created () {
        const { lines } = await this.$axios.get('apiv1/basic/line')
        this.lines = lines
    },
    watch: {
        'choosed.company' () {
            this.$set(this.choosed, 'station', 0)
            this.$set(this.choosed, 'line', 0)
        },
        'choosed.station' () {
            this.$set(this.choosed, 'line', 0)
        }
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
