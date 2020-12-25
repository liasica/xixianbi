<template>
    <div class="container">
        <el-tabs v-model="name" class="group-tab">
            <el-tab-pane label="第一分公司" name="第一分公司"><group-form name="第一分公司" /></el-tab-pane>
            <el-tab-pane label="第二分公司" name="第二分公司"><group-form name="第二分公司" /></el-tab-pane>
            <el-tab-pane label="第三分公司" name="第三分公司"><group-form name="第三分公司" /></el-tab-pane>
            <el-tab-pane label="第四分公司" name="第四分公司"><group-form name="第四分公司" /></el-tab-pane>
            <el-tab-pane label="旅游客运公司" name="旅游客运公司"><group-form name="旅游客运公司" /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import groupForm from '@/views/setting/groupForm'

export default {
    components: { groupForm },
    data () {
        return {
            name: '第一分公司',
        }
    },
    methods: {
    },
}
</script>

<style lang="less" scoped>
.group-tab {
    width: 100%;
}
/deep/ .el-tabs__item:not(.is-active) {
    color: #ffffff;
}
</style>
