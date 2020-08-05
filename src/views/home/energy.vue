<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="date"
                    class="choose"
                    label="日期"
                    :options="date_options"
                />
                <!-- <button class="search-btn" @click="onSearch">
                    <i class="icon-search" />查询
                </button> -->
            </div>
            <div class="filter-box">
                <BiCheckBox label="车辆运行能耗比较统计" />
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
                { prop: 'filaName', label: '公司名称' },
                { prop: 'groupName', label: '车队号' },
                { prop: 'lineNo', label: '线路' },
                { prop: 'busNo', label: '车辆编号' },
                { prop: 'prepare1', label: '车辆牌照' },
                { prop: 'addoilDate', label: '时间' },
                { prop: 'addoilNum', label: '能耗数量' },
                { prop: 'totalOilAmount', label: '能耗金额' },
            ],
            list: [],
            date: null,
            date_options: [],
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
    watch: {
        async date () {
            this.page = 1
            this.getData()
        },
    },
    created () {
        this.getDates()
    },
    methods: {
        async getDates () {
            try {
                const data = await this.$axios.get('home/energy')
                this.date_options = data.dateGroup.map(item => ({
                    id: item,
                    label: item,
                }))
                if (this.date_options.length) {
                    this.date = this.date_options[0].id
                    this.getData()
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getData () {
            try {
                const data = await this.$axios.get('home/energy', {
                    params: {
                        date: this.date,
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
