<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="type"
                    class="choose"
                    label="分类"
                    :options="type_options"
                />
                <div class="btn-box">
                    <!-- <button class="search-btn">
                        安全报警
                    </button> -->
                    <button class="search-btn" @click="onSearch">
                        <i class="icon-search" />查询
                    </button>
                </div>
            </div>
            <div class="filter-box">
                <BiCheckBox label="当日车辆违规统计" />
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
        .btn-box{
            display: flex;
        }
        .search-btn {
            background-color: #42dfff;
            padding: 10px;
            height: 50px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 117px;
            letter-spacing: 8px;
            margin-left: 20px;
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
