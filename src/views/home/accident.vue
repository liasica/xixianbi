<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiCheckBox label="当日车辆事故统计" />
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
                { prop: 'accidentNo', label: '事故编号' },
                { prop: 'accidentSite', label: '地点' },
                { prop: 'accidentTime', label: '事故时间' },
                { prop: 'busNo', label: '车辆编号' },
                { prop: 'dealName', label: '经办人姓名' },
                { prop: 'deptNo', label: '部门编号' },
                { prop: 'lisenceNo', label: '车辆牌照号' },
                { prop: 'opName', label: '司机姓名' },
                { prop: 'opNo', label: '司机编号' },
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
                const data = await this.$axios.get('home/accident')
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
