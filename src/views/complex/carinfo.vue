<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="station_id"
                    class="choose"
                    label="场站"
                    :options="station_options"
                />
                <choose
                    v-model="name_id"
                    class="choose"
                    label="车辆类型"
                    :options="name_options"
                />
                <choose
                    v-model="status_id"
                    class="choose"
                    label="车龄"
                    :options="status_options"
                />
                <button class="search-btn">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="车辆信息" :value.sync="isShowToday" />
                <s-btn class="export-btn">
                    <i class="icon-switch" />
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns" :source="list" />
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
            compnay: '西咸公司',
            station: '场站1',
            total: '120',
            new_energy: '70',
            old_energy: '50',
            down5: '70',
            up5: '50',
            line_total: '65',
            station_total: '20个',
            time: '6:00-10:00',
            cars: '80/110',
            oprate: '车辆耗能',
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
            page: 12,
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'compnay', label: '公司' },
                { prop: 'station', label: '场站' },
                { prop: 'total', label: '总车辆' },
                { prop: 'new_energy', label: '新能源数' },
                { prop: 'old_energy', label: '柴油数' },
                { prop: 'down5', label: '车龄五年以下' },
                { prop: 'up5', label: '车龄五年以上' },
                { prop: 'line_total', label: '总线路' },
                { prop: 'station_total', label: '站点数量' },
                { prop: 'time', label: '运行时间' },
                { prop: 'cars', label: '运行车辆' },
                { prop: 'oprate', label: '操作' },
            ],
            list: data.list,
            station_options: [
                { id: 1, label: '场站一' },
                { id: 2, label: '场站二' },
            ],
            station_id: 1,
            name_options: [
                { id: 1, label: '纯电动' },
                { id: 2, label: '柴油' },
            ],
            name_id: 1,
            status_options: [
                { id: 1, label: '<5' },
                { id: 2, label: '>5' },
            ],
            status_id: 1,
            isShowToday: false,
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
<style lang="less" scoped>
.container {
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
        .icon-home {
            display: inline-block;
            background-image: url('~@images/home.png');
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
