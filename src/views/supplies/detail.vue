<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <BiCheckBox label="物资入库" />
                <button class="back-btn" @click="onBack">
                    返回
                </button>
            </div>
            <BiTable :columns="columns" :source="list" :page.sync="page" />
        </div>
    </div>
</template>

<script>
// TODO
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
            inboundNo: null,
            columns: [
                { prop: 'barCode', label: '物资条形码' },
                { prop: 'printNum', label: '打印数量' },
                { prop: 'locationCd', label: '货位' },
                { prop: 'materialCd', label: '物资代码' },
                { prop: 'materialName', label: '物资名称' },
                { prop: 'standard', label: '物资规格' },
                { prop: 'Unit', label: '计量单位' },
                { prop: 'inboundNum', label: '入库数量' },
                // { prop: 'inboundNum', label: '库存数量' },
                { prop: 'price', label: '含税单价' },
                { prop: 'amount', label: '含税金额' },
            ],
            list: [],
            data: {},
        }
    },
    created () {
        const { id } = this.$route.query
        this.inboundNo = id
        this.getData()
    },
    methods: {
        async getData () {
            const { item } = await this.$axios.get('supply/detail', {
                params: {
                    inboundNo: this.inboundNo,
                },
            })
            this.data = item
            const { items } = item
            this.list = items
        },
        onBack () {
            this.$router.back()
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
        .back-btn {
            background-color: #42dfff;
            padding: 10px 20px;
            height: 50px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 8px;
        }
    }
}
</style>
