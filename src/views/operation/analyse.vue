<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    :show-all="true"
                    style="margin-right: 40px; margin-bottom: 0"
                    @change="onFilter"
                    @reset="onReset"
                />
                <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="营运分析" />
                <export-excel
                    :data="list"
                    :fields="fields"
                    type="xlsx"
                    :name="`${$route.meta.title}.xlsx`"
                >
                    <s-btn class="export-btn">
                        <i class="icon-switch" />
                        <span>导出数据</span>
                    </s-btn>
                </export-excel>
            </div>
            <BiTable :columns="columns" :source="list" :page.sync="page" />
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
        RelationChoose,
    },
    data () {
        return {
            page: 1,
            filterData: {
                filaName: '', // 公司
                groupName: '', // 车队
                lineNo: '', // 线路
            },
            columns: [
                { prop: 'filaName', label: '公司' },
                { prop: 'lineNo', label: '线路' },
                { prop: 'planBus', label: '计划发车' },
                { prop: 'realBus', label: '实际发车' },
                { prop: 'planDis', label: '计划营运公里' },
                { prop: 'realDis', label: '实际营运公里' },
                { prop: 'planTimes', label: '计划圈次' },
                { prop: 'times', label: '实际圈次' },
                { prop: 'runDate', label: '营运日期' },
            ],
            source: [],
            list: [],
            isShowToday: false,
        }
    },
    computed: {
        fields () {
            const fields = {}
            this.columns.forEach(column => {
                if (column.label !== '序号') {
                    fields[column.label] = column.prop
                }
            })
            return fields
        },
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                const data = await this.$axios.get('operation/anlysis')
                this.source = data.items
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter (choosed) {
            this.filterData = choosed
        },
        onSearch () {
            this.page = 1
            if (this.filterData.lineNo) {
                this.list = this.source.filter(item => item.lineNo === this.filterData.lineNo)
            } else {
                this.list = this.source
            }
        },
        onReset (choosed) {
            this.filterData = choosed
            this.onSearch()
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
