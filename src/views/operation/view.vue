<template>
    <div class="container operation-container">
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
                :options="[{id: 1, label: '张三'}, {id: 2, label: '李四'}, {id: 2, label: '王五'}]"
            />
        </div>
        <div class="left">
            <div>
                <div class="bi-title">车长信息</div>
                <img :src="require('@images/demo/13.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">调度计划</div>
                <img :src="require('@images/demo/15.png')" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">排班计划</div>
                <img :src="require('@images/demo/17.png')" />
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/14.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/16.png')" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.operation-container {
    flex-wrap: wrap;
}
.filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
}
.left {
    width: 310px;
}
.mid {
    flex: 1;
}
.right {
    width: 320px;
}
.bottom {
    margin-top: 40px;
}
</style>
