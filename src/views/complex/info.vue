<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="query.position"
                    class="choose"
                    label="职工类型"
                    :options="position_options"
                />
                <choose
                    v-model="query.age"
                    class="choose"
                    label="年龄范围"
                    :options="age_options"
                />
                <choose
                    v-model="query.busAge"
                    class="choose"
                    label="车龄"
                    :options="busAge_options"
                />
                <button class="btn" @click="onReset">重置</button>
                <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="综合信息" />
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
            query: {
                position: '',
                age: '',
                busAge: '',
            },
            columns: [
                { prop: 'filaName', label: '公司' },
                { prop: 'totalDistance', label: '总里程' },
                { prop: 'position', label: '职工类型' },
                { prop: 'empName', label: '员工姓名' },
                { prop: 'age', label: '年龄' },
                { prop: 'busNo', label: '驾驶车辆' },
                { prop: 'busAge', label: '车龄' },
                { prop: 'lineNo', label: '线路' },
                { prop: 'operateDate', label: '营运时间' },
                // { prop: 'statue', label: '车辆状态' },
            ],
            list: [],
            position_options: [
                { id: '', label: '全部' },
                { id: '车长', label: '车长' },
            ],
            age_options: [
                { id: '', label: '全部' },
                { id: '20-30', label: '20-30' },
                { id: '31-40', label: '31-40' },
                { id: '41-50', label: '41-50' },
                { id: 'gt50', label: '51+' },
            ],
            busAge_options: [
                { id: '', label: '全部' },
                { id: 'le5', label: '<=5' },
                { id: 'gt5', label: '>5' },
            ],
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
                const data = await this.$axios.get('complex/info', {
                    params: this.query,
                })
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        async onSearch () {
            this.page = 1
            this.getData()
        },
        onReset () {
            this.query = {
                position: '',
                age: '',
                busAge: '',
            }
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
.btn{
    background-color: #42dfff;
    padding: 10px 20px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    letter-spacing: 8px;
}
</style>
