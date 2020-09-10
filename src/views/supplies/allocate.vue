<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiInput
                    :value.sync="query.moveApplyNo"
                    label="调拨申请编号"
                />
                <choose
                    v-model="query.moveType"
                    class="choose"
                    label="调拨类型"
                    :options="typeGroup"
                />
                <choose
                    v-model="query.outboundWarehouse"
                    class="choose"
                    label="调出仓库"
                    :options="outGroup"
                />
                <choose
                    v-model="query.inboundWarehouse"
                    class="choose"
                    label="调入仓库"
                    :options="inGroup"
                />
                <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="物资调拨" />
                <vue-excel-xlsx
                    :data="list"
                    :columns="fields"
                    :filename="$route.meta.title"
                    :sheetname="$route.meta.title"
                >
                    <s-btn class="export-btn">
                        <i class="icon-switch" />
                        <span>导出数据</span>
                    </s-btn>
                </vue-excel-xlsx>
            </div>
            <BiTable :columns="columns" :source="list" :page.sync="page" />
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import BiCheckBox from '@/components/checkbox'
import BiInput from '@/components/input'

export default {
    components: {
        BiTable,
        BiCheckBox,
        BiInput,
    },
    data () {
        return {
            page: 1,
            query: {
                moveApplyNo: '', // 调拨申请单号
                moveNo: '', // 调拨单号
                moveType: '', // 调拨类型
                outboundWarehouse: '', // 调出仓库编号
                inboundWarehouse: '', // 调入仓库编号
            },
            typeGroup: [], // 调拨类型
            outGroup: [], // 调出仓库编号
            inGroup: [], // 调入仓库编号
            columns: [
                { prop: 'filaName', label: '详细' },
                { prop: 'bookName', label: '账套' },
                { prop: 'moveApplyNo', label: '调拨申请单号' },
                { prop: 'moveNo', label: '调拨单号' },
                { prop: 'instanceId', label: '工作流单据编号' },
                { prop: 'moveType', label: '调拨类型' },
                { prop: 'outboundWarehouseName', label: '调出仓库' },
                { prop: 'inboundWarehouseName', label: '调入仓库' },
                { prop: 'moveDate', label: '调拨发起时间' },
                { prop: 'outboundWarehouse', label: '调出人编号' },
                { prop: 'inboundWarehouse', label: '调入人编号' },
                { prop: 'status', label: '审批状态' },
            ],
            list: [],
        }
    },
    computed: {
        fields () {
            const fields = []
            this.columns.forEach(column => {
                if (column.label !== '序号') {
                    fields.push({ label: column.label, field: column.prop })
                }
            })
            return fields
        },
    },
    created () {
        this.getOptions()
        this.getData()
    },
    methods: {
        async getOptions () {
            const { typeGroup, outGroup, inGroup } = await this.$axios.get('allocate/filter')
            this.typeGroup = [{ id: '', label: '全部' }, ...typeGroup]
            this.outGroup = [{ id: '', label: '全部' }, ...outGroup]
            this.inGroup = [{ id: '', label: '全部' }, ...inGroup]
        },
        async getData () {
            const { items } = await this.$axios.get('allocate', {
                params: this.query,
            })
            this.list = items
        },
        onSearch () {
            this.page = 1
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
