<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    :show-all="true"
                    style="margin-right: 40px"
                    @init="onInit"
                    @change="onFilter"
                    @reset="onReset"
                />
                <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox :label="$route.meta.title" />
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
import RelationChoose from '@/components/relationChoose'

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
                groupName: '', // 场站
                lineNo: '', // 线路
            },
            columns: [
                { prop: 'filaName', label: '公司名称' },
                { prop: 'groupName', label: '车队号' },
                { prop: 'lineNo', label: '线路' },
                { prop: 'busLicense', label: '车辆牌照号' },
                { prop: 'dataDate', label: '数据日期' },
                // { prop: 'deptName', label: '部门编号 BM0601=第一中心场站  BM0602第二中心场站   BM0603第三中心场站' },
                { prop: 'icMoney', label: 'IC卡金额', render: value => value || 0 },
                { prop: 'icTimes', label: 'IC卡人次', render: value => value || 0 },
                { prop: 'tbMoney', label: '现金合计收入', render: value => value || 0 },
                { prop: 'tbTimes', label: '现金合计人次', render: (_, item) => Math.ceil(item.tbMoney / 2) || 0 },
            ],
            source: [],
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
        fData () {
            return this.source.filter(item => item.groupName === this.filterData.groupName)
        },
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                const data = await this.$axios.get('financial/list')
                this.source = data.items
                this.list = this.fData
            } catch (err) {
                console.log(err)
            }
        },
        onInit (choosed) {
            this.filterData = choosed
            this.getData()
        },
        async onFilter (choosed) {
            this.filterData = choosed
        },
        onSearch () {
            this.page = 1
            if (this.filterData.lineNo) {
                this.list = this.fData.filter(item => item.lineNo === this.filterData.lineNo)
            } else {
                this.list = this.fData
            }
        },
        onReset (choosed) {
            this.filterData = choosed
            this.onSearch()
        },
    },
}
</script>
