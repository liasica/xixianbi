<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiCheckBox label="维修计划" />
                <s-btn class="export-btn">
                    <i class="icon-switch" />
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns" :source="list" />
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
            columns: [
                { prop: 'planNo', label: '维修计划编号' },
                { prop: 'busNo', label: '车辆编号' },
                { prop: 'busLicense', label: '车辆牌照' },
                { prop: 'busModel', label: '车辆型号' },
                { prop: 'planMaintenanceDate', label: '维修计划日期' },
                { prop: 'maintainSiteName', label: '承修站点' },
                { prop: 'busMaintenanceType', label: '维修类别' },
                { prop: 'degreeCode', label: '维修类型' },
                { prop: 'inOpName', label: '进厂司机姓名' },
                { prop: 'checkinDate', label: '进厂登记时间' },
                { prop: 'handerName', label: '进厂登记人' },
                { prop: 'checkoutDate', label: '出厂时间' },
                { prop: 'handerNo', label: '交接员编号' },
                { prop: 'outOpName', label: '出厂司机' },
            ],
            list: [],
        }
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                const data = await this.$axios.get('maintenance/plan-table')
                this.list = data.items
            } catch (err) {
                console.log(err)
            }
        },
        handleChange () {
            console.log(1)
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
