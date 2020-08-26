<template>
    <div class="container">
        <div class="content">
            <!-- <div class="filter-box">
                <choose
                    v-model="type"
                    class="choose"
                    label="分类"
                    :options="type_options"
                />
                <div class="btn-box">
                    <button class="search-btn" @click="onSearch">
                        <i class="icon-search" />查询
                    </button>
                </div>
            </div> -->
            <div class="filter-box">
                <BiCheckBox label="当日车辆违规统计" />
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
                { prop: 'type', label: '分类' },
                { prop: 'auditId', label: '违法违规处罚编号' },
                { prop: 'dealDate', label: '处理日期' },
                { prop: 'registrationTime', label: '登记时间' },
                { prop: 'registrarId', label: '登记人编号' },
                { prop: 'registrarName', label: '登记人姓名' },
                { prop: 'illegalSituation', label: '违法违规情况', width: 300 },
                { prop: 'dealOpinion', label: '处罚意见' },
                { prop: 'driverName', label: '驾驶员姓名' },
                { prop: 'punishAmount', label: '处罚金额' },
            ],
            list: [],
            type_options: [],
            type: null,
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
        this.getTypes()
    },
    methods: {
        async getTypes () {
            try {
                const data = await this.$axios.get('home/illegal')
                this.type_options = data.typeGroup.map(item => ({
                    id: item,
                    label: item,
                }))
                if (this.type_options.length) {
                    this.type = this.type_options[0].id
                    this.getData()
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getData () {
            try {
                const data = await this.$axios.get('home/illegal', {
                    params: {
                        type: this.type,
                    },
                })
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
