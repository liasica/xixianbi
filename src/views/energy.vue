<template>
    <div class="container energe-container">
        <div class="content">
            <div class="header-box">
                <span>车辆耗能</span>
                <s-btn class="back-btn">返回</s-btn>
            </div>
            <div class="summery-box">
                <div class="left-box">
                    <div v-for="(item,index) in car_info" :key="index" class="item">
                        <i :class="'icon icon-'+item.icon"></i>
                        <div class="num-box">
                            <s-btn class="num">
                                <span class="title">{{ item.label }}</span>
                                <span>{{ item.value }}</span>
                            </s-btn>
                        </div>
                    </div>
                </div>
                <div class="right-box"></div>
            </div>
            <BiTable :columns="columns" :source="list" />
            <!-- <BiPagination :total="total" :page.sync="page" @pagination="handleChange" /> -->
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'
import BiCheckBox from '@/components/checkbox'
import Mock from 'mockjs'
const data = Mock.mock({
    'list|11': [
        {
            way_name: '880',
            driver: '@cname',
            no: '陕A332',
            location: '场站东1',
            total_mileage: '3232',
            mileage: '3434',
            speed: '43',
            direction: '后卫寨地铁站',
            charge_location: '场站1',
            is_charge: '是',
            charge_total: '455',
            charge_time: '4',
            charge_total_time: '54',
            charge_total_price: '555.00',
            energe_status: '充电',
            warning_reason: ''
        }
    ]
})

export default {
    components: {
        BiTable,
        BiPagination,
        BiCheckBox
    },
    data () {
        return {
            total: 150,
            page: 12,
            columns: [
                { prop: 'way_name', label: '线路名称' },
                { prop: 'driver', label: '驾驶员' },
                { prop: 'no', label: '车辆编号' },
                { prop: 'location', label: '车辆位置' },
                { prop: 'total_mileage', label: '总里程' },
                { prop: 'mileage', label: 'GPS里程' },
                { prop: 'speed', label: 'GPS车速' },
                { prop: 'direction', label: 'GPS方向' },
                { prop: 'charge_location', label: '充电位置' },
                { prop: 'is_charge', label: '是否充电' },
                { prop: 'charge_total', label: '累计充电量' },
                { prop: 'charge_time', label: '当前充电时间' },
                { prop: 'charge_total_time', label: '充电累计时间' },
                { prop: 'charge_total_price', label: '充电累计金额' },
                { prop: 'energe_status', label: '电源状态' },
                { prop: 'warning_reason', label: '告警原因' }
            ],
            list: data.list,
            car_info: [
                { label: '线路', value: '808', icon: 'bus' },
                { label: '驾驶员', value: '张三', icon: 'driver' },
                { label: '时间', value: '2019-07-23', icon: 'time' }
            ],
            energy_info: [
                { label: '充电金额', value: '68232.32', unit: 'RMB' },
                { label: '昨日里程', value: '25600', unit: 'KM' },
                { label: 'GPS车速', value: '3434', unit: 'KM' },
                { label: '当前电量', value: '48232.32', unit: '度' },
                { label: 'GPS里程', value: '3434', unit: 'KM' }
            ]
        }
    },
    created () {},
    methods: {
        handleChange () {
            console.log(1)
        }
    }
}
</script>
<style lang="less">
.energe-container {
    display: flex;
    // min-height: calc(100vh - 130px);
    .sidebar {
        min-height: 100%;
        width: 121px;
        font-size: 16px;
        background-color: #122836;
        padding: 50px 6px 0;
        .title {
            font-size: 20px;
            color: #42dfff;
        }
        .icon-platform {
            display: inline-block;
            background-image: url('~@images/platform.png');
            background-size: cover;
            width: 18px;
            height: 18px;
            margin-right: 10px;
        }
        a {
            display: inline-block;
            margin-top: 54px;
            color: fade(#d8d8d8, 50);
            cursor: pointer;
            &.active,
            &:hover {
                color: #ffffff;
            }
        }
    }
    .content {
        flex: 1;
        height: 100%;
        margin-left: 20px;
    }
    .header-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .back-btn {
            width: 100px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .summery-box {
        .icon {
            display: inline-block;
            width: 50px;
            height: 50px;
            background-size: cover;
            margin-right: 6px;
        }
        .icon-bus {
            background-image: url('~@images/bus.png');
        }
        .icon-driver {
            background-image: url('~@images/driver.png');
        }
        .icon-time {
            background-image: url('~@images/time.png');
        }
        .left-box {
            .item {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .num-box {
                    position: relative;
                    padding: 4px;
                    height: 60px;
                    width: 230px;
                    padding: 10px;
                    .title {
                        width: 60px;
                        font-size: 18px;
                    }
                    .num {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 20px;
                    }
                    &:before,
                    &:after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 12px;
                        left: 0;
                        border: 1px solid #42dfff;
                    }
                    &:before {
                        top: 0;
                        border-bottom: none;
                    }
                    &:after {
                        bottom: 0;
                        border-top: none;
                    }
                }
            }
        }
    }
}
</style>
