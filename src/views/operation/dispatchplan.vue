<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    @change="choosed => filterData = choosed"
                    @init="choosed => filterData = choosed"
                    style="margin-right: 40px"
                />
                <button class="search-btn" @click="onFilter">
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
        </div>
    </div>
</template>

<script>
import RelationChoose from '@/components/relationChoose'
import BiTable from '@/components/table'
import BiCheckBox from '@/components/checkbox'

export default {
    components: {
        BiTable,
        BiCheckBox,
        RelationChoose
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 车队
                lineNo: '' // 线路
            },
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'projectName', label: '方案名称' },
                { prop: 'filaName', label: '公司' },
                { prop: 'lineNo', label: '线路' },
                { prop: 'isDefault', label: '默认方案' },
                { prop: 'isBlank', label: '是否作废' },
                { prop: 'isupdown', label: '是否上下行' },
                { prop: 'time', label: '开始时间点' },
                { prop: 'space', label: '发车间隔' },
                { prop: 'motorcadeSum', label: '间隔班次' },
                { prop: 'planTimes', label: '总班次' },
                { prop: 'singletime', label: '单程时间' },
                { prop: 'drivetime', label: '发车点当/次日' }
            ],
            source: [],
            list: [],
            isShowToday: false
        }
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                const data = await this.$axios.get('operation/dispatch')
                this.source = data.items
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter () {
            this.getData()
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
