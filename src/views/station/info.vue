<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiCheckBox label="场站信息" />
                <s-btn class="export-btn">
                    <i class="icon-switch" />
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns" :source="list" :pagination="false" />
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
            total: 150,
            columns: [
                { prop: 'station', label: '场站' },
                { prop: 'normal', label: '常规公交' },
                { prop: 'custom', label: '定制公交' },
                { prop: 'commute', label: '通勤公交' },
                { prop: 'area', label: '场地面积' },
                { prop: 'position', label: '场地位置' },
                { prop: 'scale', label: '场地规模' },
                { prop: 'distribut', label: '场地分布' },
                { prop: 'peoples', label: '场站人员' },
                { prop: 'drivers', label: '车辆车长' },
                { prop: 'novitiates', label: '见习车长' },
                { prop: 'parking', label: '停泊总数' },
                { prop: 'flow', label: '累计进出量' },
                { prop: 'energy', label: '充电桩规模' },
            ],
            list: [],
        }
    },
    async created () {
        const { items } = await this.$axios.get('station/info')
        this.list = items || []
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
