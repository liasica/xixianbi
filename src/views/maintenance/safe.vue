<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose class="choose" label="公司" :options="cate_options" v-model="cate_id" />
                <choose class="choose" label="线路" :options="station_options" v-model="station_id" />
                <choose class="choose" label="线路" :options="name_options" v-model="name_id" />
                <choose class="choose" label="车长" :options="status_options" v-model="status_id" />
                <choose
                    class="choose"
                    label="开始结束日期"
                    :options="status_options"
                    v-model="status_id"
                />
                <button class="search-btn">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="安全管理" :value.sync="isShowToday" />
                <s-btn class="export-btn">
                    <i class="icon-switch"></i>
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
            company: '西咸公司',
            station: '西咸通勤2号线',
            carno: '陕AV9575',
            driver: '李三',
            mile: '487.96',
            warntime: '48秒',
            begin: '2019-07-30 17:31:21',
            end: '2019-07-30 17:31:21',
            statue: '未处理'
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
                { prop: 'id', label: '序号' },
                { prop: 'company', label: '公司' },
                { prop: 'station', label: '场站' },
                { prop: 'carno', label: '车牌号' },
                { prop: 'driver', label: '司机' },
                { prop: 'mile', label: '偏线里程' },
                { prop: 'warntime', label: '报警时长' },
                { prop: 'begin', label: '报警开始时间' },
                { prop: 'end', label: '报警结束时间' },
                { prop: 'statue', label: '状态' }
            ],
            list: data.list,
            cate_options: [
                { id: 1, label: '常规公交' },
                { id: 2, label: '双层公交' }
            ],
            cate_id: 1,
            station_options: [
                { id: 1, label: '场站一' },
                { id: 2, label: '场站二' }
            ],
            station_id: 1,
            name_options: [
                { id: 1, label: '880' },
                { id: 2, label: '930' }
            ],
            name_id: 1,
            status_options: [
                { id: 1, label: '运营' },
                { id: 2, label: '停运' }
            ],
            status_id: 1,
            isShowToday: false
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
        flex-wrap: wrap;
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
