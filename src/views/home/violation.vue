<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose class="choose" label="分类" :options="cate_options" v-model="cate_id" />
                <button class="search-btn">
                    <i class="icon-search"></i>查询
                </button>
            </div>
            <div class="filter-box">
                <BiCheckBox label="当日车辆违规统计" :value.sync="isShowToday" />
                <s-btn class="export-btn">
                    <i class="icon-switch"></i>
                    <span>导出数据</span>
                </s-btn>
            </div>
            <BiTable :columns="columns1" :source="list1" />
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import BiPagination from '@/components/pagination'
import BiCheckBox from '@/components/checkbox'
import Mock from 'mockjs'
const data1 = Mock.mock({
    'list|11': [
        {
            id: '01',
            cate: '车辆违规',
            no: 'CFW-20190712-063',
            time: '2019-07-12',
            reg_time: '2019-07-12',
            reg_no: '10042',
            reg_name: '白祎松',
            content:
                'X102路驾驶员张保升。7月18日7：17分在阿房宫场站，私自挪动车载监控',
            result: '罚款',
            driver: '张保升',
            amount: '100.00'
        }
    ]
})
const data2 = Mock.mock({
    'list|11': [
        {
            id: '01',
            cate: '车辆违规',
            no: 'CFW-20190712-063',
            borrow_no: '10042',
            borrow_time: '2019-07-12',
            borrow_name: '白祎松',
            check_time: '2019-07-12',
            amount: '10000',
            apply_amount: '10000',
            file: 'http://baidu.com',
            reason: '车辆事故',
            result: '同意'
        }
    ]
})
const data3 = Mock.mock({
    'list|11': [
        {
            id: '01',
            cate: '车辆违规',
            no: '343241',
            car_no: '陕A-343241',
            ins_no: '343241',
            ins_company: '人寿保险',
            ins_cate: '交强险',
            ins_amount: '10000',
            start_time: '2019-07-12',
            end_time: '2019-07-12',
            day: '13',
            expires: true
        }
    ]
})
export default {
    components: {
        BiTable,
        BiPagination,
        BiCheckBox
    },
    data () {
        return {
            total: 150,
            page: 12,
            columns1: [
                { prop: 'id', label: '序号' },
                { prop: 'cate', label: '分类' },
                { prop: 'no', label: '违法违规处罚编号' },
                { prop: 'time', label: '处理日期' },
                { prop: 'reg_time', label: '登记时间' },
                { prop: 'reg_no', label: '登记人编号' },
                { prop: 'reg_name', label: '登记人姓名' },
                { prop: 'content', label: '违法违规情况', width: 300 },
                { prop: 'result', label: '处罚意见' },
                { prop: 'driver', label: '驾驶员姓名' },
                { prop: 'amount', label: '处罚金额' }
            ],
            list1: data1.list,
            columns2: [
                { prop: 'id', label: '序号' },
                { prop: 'cate', label: '分类' },
                { prop: 'no', label: '事故编号' },
                { prop: 'borrow_no', label: '借款人编号' },
                { prop: 'borrow_time', label: '借款时间' },
                { prop: 'borrow_name', label: '借款人姓名' },
                { prop: 'check_time', label: '登记时间' },
                { prop: 'amount', label: '借款金额' },
                { prop: 'apply_amount', label: '本事故申请中借额' },
                { prop: 'file', label: '借条附件' },
                { prop: 'reason', label: '借款事由' },
                { prop: 'result', label: '审批意见' }
            ],
            list2: data2.list,
            columns3: [
                { prop: 'id', label: '序号' },
                { prop: 'cate', label: '分类' },
                { prop: 'no', label: '车号' },
                { prop: 'car_no', label: '牌照号' },
                { prop: 'ins_no', label: '保险号码' },
                { prop: 'ins_company', label: '保险公司' },
                { prop: 'ins_cate', label: '保险类型' },
                { prop: 'ins_amount', label: '保险金额' },
                { prop: 'start_time', label: '开始日期' },
                { prop: 'end_time', label: '结束日期' },
                { prop: 'day', label: '离到期天数' },
                { prop: 'expires', label: '是否已过期' }
            ],
            list3: data3.list,
            cate_options: [
                { id: 1, label: '车辆违规' },
                { id: 2, label: '车辆违规' },
                { id: 3, label: '车辆违规' }
            ],
            cate_id: 1,
            isShowToday: false
        }
    },
    created () {},
    methods: {
        handleChange () {
            console.log(1)
        }
    }
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
