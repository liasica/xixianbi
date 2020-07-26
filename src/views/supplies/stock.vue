<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiInput
                    :value.sync="query.inboundNo"
                    label="入库单编号"
                />
                <choose
                    v-model="query.warehouseName"
                    class="choose"
                    label="仓库"
                    :options="warehouseGroup"
                />
                <div class="input-box">
                    <span>入库时间</span>
                    <s-btn class="wrapper">
                        <datepicker
                            v-model="query.inboundDate"
                            :language="lang"
                            format="yyyy-MM-dd"
                            calendar-class="calendar-box"
                            wrapper-class="calendar-wrapper"
                            input-class="calendar-input"
                        />
                    </s-btn>
                </div>
                <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="物资入库" />
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
// TODO
import BiTable from '@/components/table'
import BiCheckBox from '@/components/checkbox'
import BiInput from '@/components/input'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import { parseTime } from '@/utils'

export default {
    components: {
        BiTable,
        BiCheckBox,
        BiInput,
        Datepicker,
    },
    data () {
        return {
            lang: zh,
            query: {
                inboundNo: '', // 入库单编号
                warehouseName: '', // 仓库
                inboundDate: '', // 入库时间
            },
            warehouseGroup: [], // 仓库列表
            columns: [
                { prop: 'inboundNo', label: '入库编号' },
                { prop: 'inboundDate', label: '入库时间' },
                { prop: 'warehouseName', label: '仓库' },
                { prop: 'inboundType', label: '入库类别' },
                { prop: 'inboundMethod', label: '入库方式' },
                {
                    prop: 'confirmFlag',
                    label: '使用标志',
                    render: item => `<span>${item === 1 ? '是' : '否'}</span>`,
                },
                {
                    prop: 'isUse',
                    label: '确认标志',
                    render: item => `<span>${item === 1 ? '是' : '否'}</span>`,
                },
                { prop: 'totalAmount', label: '总金额' },
                { prop: 'isBooking', label: '是否记账', render: item => `<span>${item === 1 ? '是' : '否'}</span>` },
                {
                    prop: '',
                    label: '详细',
                    click: this.onClick,
                    render: () => '<span class="table-btn">详细</span>',
                },
            ],
            list: [],
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
            const { items, warehouseGroup } = await this.$axios.get('supply/list', {
                params: {
                    ...this.query,
                    inboundDate: this.query.inboundDate ? parseTime(this.query.inboundDate, '{y}-{m}-{d}') : '',
                },
            })
            if (!this.warehouseGroup.length) {
                this.warehouseGroup = warehouseGroup.map(value => ({
                    id: value,
                    label: value,
                }))
                if (this.warehouseGroup.length) {
                    this.query.warehouseName = this.warehouseGroup[0].id
                }
            }
            this.list = items
        },
        onSearch () {
            this.getData()
        },
        onClick (row) {
            // 跳转到详情页
            this.$router.push({
                path: '/supplies/detail',
                query: {
                    id: row.inboundNo,
                },
            })
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
.input-box {
    display: flex;
    align-items: center;
    & > span {
        height: 100%;
        max-width: 40px;
        line-height: 1;
        display: flex;
        align-items: center;
        margin-right: 15px;
    }
    .wrapper {
        height: 100%;
    }
}
</style>
<style lang="less" >
.table-btn{
    background-color: #42dfff;
    border-radius: 8px;
    padding: 10px 30px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
.calendar-wrapper{
    height: 100%;
    >div{
        &:first-child{
            height: 100%;
        }
    }
    .calendar-input{
        height: 100%;
        width: 200px;
        padding-left: 20px;
    }
    .calendar-box{
        border: 1px solid rgba(122,255,242,0.3);
        box-shadow: inset 0 0 15px 0 rgba(122,255,242,0.3);
        background-color: #121c25;
    }
    .prev,.next, .day__month_btn{
        &:hover{
            background-color: rgba(122,255,242,0.3) !important;
        }
    }
}
</style>
