<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    @change="choosed => filterData = choosed"
                    @init="choosed => filterData = choosed"
                    style="margin-right: 40px; margin-bottom: 0"
                />
                <button class="search-btn" @click="onFilter">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <div></div>
                <s-btn class="export-btn">
                    <i class="icon-switch"></i>
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns" :source="list" />
            <BiPagination :total="total" :page.sync="page" @pagination="handleChange" />
        </div>
    </div>
</template>

<script>
import Mock from 'mockjs'

import RelationChoose from '@/components/relationChoose'
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'
import BiCheckBox from '@/components/checkbox'

const data = Mock.mock({
    'list|11': [
        {
            id: '01',
            station: '场站1',
            carteam: '第一车队',
            name: '880',
            time: '2018-10-31',
            times: '11',
            etimes: '11',
            rate: '100%'
        }
    ]
})

export default {
    components: {
        BiTable,
        BiPagination,
        BiCheckBox,
        RelationChoose
    },
    data () {
        return {
            filterData: {
                company: '', // 公司
                station: '', // 场站
                line: '' // 线路
            },
            total: 150,
            page: 12,
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'station', label: '公司' },
                { prop: 'carteam', label: '场站' },
                { prop: 'name', label: '线路名称' },
                { prop: 'time', label: '日期' },
                { prop: 'times', label: '总班次' },
                { prop: 'etimes', label: '准点班次' },
                { prop: 'rate', label: '线路首末班准点率' }
            ],
            list: data.list,
            isShowToday: false
        }
    },
    methods: {
        async onFilter () {
            console.info(this.filterData)
        },
        handleChange () {
            console.log(1)
        }
    }
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
