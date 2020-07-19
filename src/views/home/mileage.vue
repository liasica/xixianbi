<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    style="margin-right: 40px; margin-bottom: 0"
                    @change="choosed => filterData = choosed"
                    @init="choosed => filterData = choosed"
                />
                <button class="search-btn" @click="onFilter">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="当日营运里程" :value.sync="isShowToday" />
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
            <BiTable :columns="columns" :source="list" />
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import BiCheckBox from '@/components/checkbox'
import RelationChoose from '@/components/relationChoose'

export default {
    components: {
        BiTable,
        BiCheckBox,
        RelationChoose,
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 场站
                lineNo: '', // 线路
            },
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'filaName', label: '场站' },
                { prop: 'groupName', label: '车队' },
                { prop: 'lineNo', label: '线路名称' },
                { prop: 'car_no', label: '车辆牌照' },
                { prop: 'allotTime', label: '线路时间' },
                { prop: 'totalDis', label: '总里程' },
                { prop: 'distance', label: '运营里程' },
                { prop: 'noRunDistance', label: '非运营里程' },
                { prop: 'runDistance', label: 'GPS里程' },
                { prop: 'plan', label: '计划里程' },
                { prop: 'def', label: '额定里程' },
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
                const data = await this.$axios.get('home/distance', {
                    params: {
                        line: this.filterData.lineNo,
                    },
                })
                this.source = data.items
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        async onFilter () {
            this.getData()
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
