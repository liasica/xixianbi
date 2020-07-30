<template>
    <div class="container cars-container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="company_id"
                    class="choose"
                    label="公司"
                    :options="company_options"
                />
                <choose
                    v-model="station_id"
                    class="choose"
                    label="车队"
                    :options="station_options"
                />
                <choose
                    v-model="cate_id"
                    class="choose"
                    label="车辆类型"
                    :options="cate_options"
                />
                <choose
                    v-model="age_id"
                    class="choose"
                    label="车龄"
                    :options="age_options"
                />
                <button class="search-btn">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="车辆信息" :value.sync="showCarInfo" />
                <s-btn class="export-btn">
                    <i class="icon-switch" />
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns" :source="list" :page.sync="page" />
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
            id: '01',
            company: '西咸公司',
            station: '场站1',
            total_cars: '120',
            new_total: '70',
            oil_total: '50',
            upder5year: '70',
            high5year: '50',
            total_ways: '65',
            stations: '20个',
            time: '6:00-10:00',
            cars: '80/110',
        },
    ],
})

export default {
    components: {
        BiTable,
        BiPagination,
        BiCheckBox,
    },
    data () {
        return {
            total: 150,
            page: 1,
            columns: [
                { prop: 'company', label: '公司' },
                { prop: 'station', label: '场站' },
                { prop: 'total_cars', label: '总车辆' },
                { prop: 'new_total', label: '新能源数' },
                { prop: 'oil_total', label: '柴油数' },
                { prop: 'upder5year', label: '车龄五年以下' },
                { prop: 'high5year', label: '车龄五年以上' },
                { prop: 'total_ways', label: '总路线' },
                { prop: 'stations', label: '站点数量' },
                { prop: 'time', label: '运行时间' },
                { prop: 'cars', label: '运行车辆' },
                {
                    prop: 'oprate',
                    label: '操作',
                    render: () => '<button class="btn">车辆能耗</button>',
                },
            ],
            list: data.list,
            company_options: [
                { id: 1, label: '西咸公交' },
                { id: 2, label: '东咸公交' },
            ],
            company_id: 1,
            station_options: [
                { id: 1, label: '场站一' },
                { id: 2, label: '场站二' },
            ],
            station_id: 1,
            cate_options: [
                { id: 1, label: '纯电动' },
                { id: 2, label: '汽车' },
            ],
            cate_id: 1,
            age_options: [
                { id: 1, label: '5年以下' },
                { id: 2, label: '5年以上' },
            ],
            age_id: 1,
            showCarInfo: false,
        }
    },
    created () {},
    methods: {
        handleChange () {
            console.log(1)
        },
    },
}
</script>
<style lang="less">
.cars-container {
    display: flex;
    // min-height: calc(100vh - 130px);

    .content {
        flex: 1;
        height: 100%;
        margin-left: 20px;
    }
    .btn {
        background-color: #42dfff;
        width: 100px;
        height: 40px;
        border-radius: 8px;
    }
    .filter-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        .search-btn {
            background-color: #42dfff;
            padding: 10px;
            height: 50px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 117px;
            letter-spacing: 8px;
        }
        .icon-search {
            display: inline-block;
            background-image: url(~@images/search-white.png);
            background-size: cover;
            width: 26px;
            height: 26px;
        }
        .export-btn {
            width: 210px;
            height: 60px;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon-switch {
                display: inline-block;
                width: 44px;
                height: 42px;
                background: url(~@images/switch.png);
                background-size: cover;
                margin-right: 20px;
            }
        }
    }
}
</style>
