<template>
    <div class="energe-container">
        <div class="sidebar">
            <span class="title">
                <i class="icon-platform"></i>综合管理
            </span>
            <a>综合信息</a>
            <a>车辆信息</a>
            <a>运行数据</a>
        </div>
        <div class="content">
            <div class="header-box">
                <span>车辆耗能</span>
                <s-btn class="back-btn">返回</s-btn>
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
            list: data.list
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
}
</style>
