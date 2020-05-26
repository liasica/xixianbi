<template>
    <div class="container finance-container">
        <div class="filter">
            <choose
                label="公司"
                :value="1"
                :options="[{id: 1, label: '西咸公交集团'}, {id: 2, label: '西咸公交子公司'}]"
            />
            <choose
                label="场站"
                :value="1"
                :options="[{id: 1, label: '场站一'}, {id: 2, label: '场站二'}, {id: 3, label: '场站三'}]"
            />
            <choose
                label="线路"
                :value="1"
                :options="[{id: 1, label: '880'}, {id: 2, label: '600'}, {id: 3, label: '1101'}]"
            />
            <choose
                label="司机"
                :value="1"
                :options="[{id: 1, label: '陈志强'}, {id: 2, label: '王慧波'}, {id: 2, label: '李彦'}]"
            />
            <choose
                label="数据日期"
                :value="1"
                :options="[{id: 1, label: '2019-07-28'}, {id: 2, label: '2019-07-29'}, {id: 2, label: '2019-07-30'}]"
            />
        </div>
        <div class="finance-box">
            <div class="bi-title">财务分析</div>
            <div class="list">
                <Card :type="1" label="IC卡人次" :value="0" color="#42DFFF" />
                <Card :type="2" label="IC卡金额" :value="0" color="#3C77FF" />
                <Card :type="3" label="IC卡人次" :value="0" color="#08F0C9" />
                <Card :type="4" label="投币收入" :value="0" color="#F2F2F2" />
            </div>
        </div>
        <div class="icnum-box">
            <div class="bi-title">IC卡人次</div>
        </div>
    </div>
</template>

<script>
import Card from './widget/card'
export default {
    components: {
        Card
    }
}
</script>

<style scoped lang="less">
.finance-container {
    position: relative;
    flex-wrap: wrap;
    .filter {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 40px;
    }
    .finance-box {
        display: block;
        width: 100%;
        margin-bottom: 75px;
        .list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 60px;
        }
    }
    .icnum-box {
        display: flex;
        width: 100%;
    }
}
</style>
