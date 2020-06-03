<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose class="choose" label="职工类型" :options="cate_options" v-model="cate_id" />
                <choose
                    class="choose"
                    label="年龄范围"
                    :options="station_options"
                    v-model="station_id"
                />
                <choose class="choose" label="车辆类型" :options="name_options" v-model="name_id" />
                <choose class="choose" label="车龄" :options="status_options" v-model="status_id" />
                <button class="search-btn">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="当日公交上线情况" :value.sync="isShowToday" />
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
            company: '西咸公司',
            station: '场站1',
            total: '34444公里',
            cate: '从业人员',
            name: '王三',
            age: '45',
            car: '无',
            carage: '无',
            line: '880',
            time: '6:00-10:00',
            statue: '运行'
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
                { prop: 'total', label: '总里程' },
                { prop: 'cate', label: '职工类型' },
                { prop: 'name', label: '员工姓名' },
                { prop: 'age', label: '年龄' },
                { prop: 'car', label: '驾驶车辆' },
                { prop: 'carage', label: '车龄' },
                { prop: 'line', label: '线路' },
                { prop: 'time', label: '运行时间' },
                { prop: 'statue', label: '车辆状态' }
            ],
            list: data.list,
            cate_options: [
                { id: 1, label: '从业人员' },
                { id: 2, label: '驾驶人员' }
            ],
            cate_id: 1,
            station_options: [
                { id: 1, label: '20-30' },
                { id: 2, label: '30-40' }
            ],
            station_id: 1,
            name_options: [
                { id: 1, label: '纯电动' },
                { id: 2, label: '柴油' }
            ],
            name_id: 1,
            status_options: [
                { id: 1, label: '<5' },
                { id: 2, label: '>5' }
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
