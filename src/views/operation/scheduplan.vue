<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <relation-choose
                    @change="choosed => filterData = choosed"
                    @init="choosed => filterData = choosed"
                    style="margin-right: 40px; margin-bottom: 0"
                />
                <!-- <choose
                    class="choose"
                    label="发车点当/次日"
                    :options="status_options"
                    v-model="status_id"
                />-->
                <button class="search-btn">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <div></div>
                <s-btn class="export-btn">
                    <i class="icon-switch"></i>
                    <span>导出数据</span>
                </s-btn>
            </div>
            <div class="scroll-table">
                <BiTable :columns="columns" :source="items" v-if="items.length > 0" />
                <div v-else>该线路暂无调度排班计划</div>
            </div>
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'
import RelationChoose from '@/components/relationChoose'

export default {
    components: {
        BiTable,
        BiPagination,
        RelationChoose
    },
    data () {
        return {
            filterData: {
                filaName: '', // 公司
                groupName: '', // 场站
                lineNo: '' // 线路
            },
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'filaName', label: '公司' },
                { prop: 'groupName', label: '车队' },
                { prop: 'lineNo', label: '线路' }
            ],
            items: [],
            status_options: [
                { id: 1, label: '运营' },
                { id: 2, label: '停运' }
            ],
            status_id: 1,
            isShowToday: false
        }
    },
    methods: {
        async getPlans () {
            const { items, max } = await this.$axios.get(
                `operation/plan?line=${this.filterData.lineNo}`
            )
            for (let i = 1; i <= max; i++) {
                this.columns.push({
                    prop: `time-${i}`,
                    label: `时间${i}`
                })
                this.columns.push({
                    prop: `direction-${i}`,
                    label: `开往方向${i}`
                })
            }
            this.items = items.map(item => {
                const { filaName, groupName, lineNo, projectName } = item
                const plans = {}
                item.plans.forEach((plan, i) => {
                    plans[`time-${i + 1}`] = plan.planTime
                    plans[`direction-${i + 1}`] = `${
                        plan.isUpDown ? '下行' : '上行'
                    } - ${plan.toStation}`
                })
                console.info(plans)
                return { filaName, groupName, lineNo, projectName, ...plans }
            })
        },
        handleChange () {
            console.log(1)
        }
    },
    watch: {
        async 'filterData.lineNo' () {
            await this.getPlans()
        }
    }
}
</script>
<style lang="less" scoped>
.container {
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
        width: 100%;
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

.scroll-table {
    table {
        position: relative;
        th {
            padding: 0 20px;
        }
        .fix-head {
            position: absolute;
            left: 0;
            width: 100px;
        }
    }
}
</style>
