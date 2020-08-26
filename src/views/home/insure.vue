<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiCheckBox label="车辆保险到期统计" />
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

export default {
    components: {
        BiTable,
        BiCheckBox,
    },
    data () {
        return {
            page: 1,
            columns: [
                { prop: 'insureCompany', label: '保险公司' },
                { prop: 'insureMoney', label: '保险金额' },
                { prop: 'insureNo', label: '保单号' },
                { prop: 'insureType', label: '保险类型' },
                { prop: 'lisenseNo', label: '车辆牌照号' },
                { prop: 'startDate', label: '开始时间' },
                { prop: 'endDate', label: '结束时间' },
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
        this.getData()
    },
    methods: {
        async getData () {
            try {
                const data = await this.$axios.get('home/insure')
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        onSearch () {
            this.page = 1
            this.getData()
        },
    },
}
</script>
