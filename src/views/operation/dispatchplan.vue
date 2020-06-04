<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose class="choose" label="方案名称" :options="cate_options" v-model="cate_id" />
                <choose class="choose" label="分公司" :options="station_options" v-model="station_id" />
                <choose class="choose" label="线路" :options="name_options" v-model="name_id" />
                <choose
                    class="choose"
                    label="发车点当/次日"
                    :options="status_options"
                    v-model="status_id"
                />
                <button class="search-btn">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="调度计划" :value.sync="isShowToday" />
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
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'
import BiCheckBox from '@/components/checkbox'
import Mock from 'mockjs'
const data = Mock.mock({
    'list|11': [
        {
            id: '01',
            planname: 'E16摆渡车计划',
            company: '场站1',
            name: '880',
            defplan: '是',
            iscancel: '否',
            isupdown: '上行',
            time: '08:05',
            space: '15',
            spaceturn: '47',
            totalturn: '47',
            singletime: '10',
            drivetime: '当日'
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
                { prop: 'planname', label: '方案名称' },
                { prop: 'company', label: '分公司' },
                { prop: 'name', label: '线路' },
                { prop: 'defplan', label: '默认方案' },
                { prop: 'iscancel', label: '是否作废' },
                { prop: 'isupdown', label: '是否上下行' },
                { prop: 'time', label: '开始时间点' },
                { prop: 'space', label: '发车间隔' },
                { prop: 'spaceturn', label: '间隔班次' },
                { prop: 'totalturn', label: '总班次' },
                { prop: 'singletime', label: '单程时间' },
                { prop: 'drivetime', label: '发车点当/次日' }
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
