<template>
    <div class="container">
        <div class="content">
            <!-- <div class="filter-box">
                <choose
                    v-model="status"
                    class="choose"
                    label="状态"
                    :options="statusOptions"
                />
                <button class="search-btn" @click="onFilter">
                    <i class="icon-search" />查询
                </button>
            </div> -->
            <div class="filter-box">
                <div />
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
import RelationChoose from '@/components/relationChoose'

export default {
    components: {
        BiTable,
        RelationChoose,
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 车队
                lineNo: '', // 线路
            },
            columns: [
                { prop: 'filaName', label: '公司名称' },
                { prop: 'lineName', label: '线路名称' },
                { prop: 'upStation', label: '上车发行站点' },
                { prop: 'upTime', label: '运营时间' },
                { prop: 'downStation', label: '下车发行站点' },
                { prop: 'downTime', label: '运营时间' },
                { prop: 'groupNo', label: '所属车队' },
                {
                    prop: 'lineState',
                    label: '线路状态',
                    render: item => `<span>${item === 1 ? '营运中' : '已停运'}</span>`,
                },
            ],
            source: [],
            list: [],
            isShowToday: false,
            status: null,
            statusOptions: [
                { id: null, label: '全部' },
                { id: 1, label: '营运中' },
                { id: 0, label: '已停运' },
            ],
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
    watch: {
        'filterData.lineNo': async function () {
            await this.getData()
        },
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            // 1 营运中 0 已停运
            try {
                const data = await this.$axios.get('online', {
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
            // lineNo
            const list = this.source.filter(item => {
                if (this.status !== null) {
                    return item.lineState === this.status
                }
                return true
            })
            this.list = list
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
