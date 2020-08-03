<template>
    <div class="container">
        <el-tabs v-model="name" class="group-tab">
            <el-tab-pane label="第一场站" name="1"><group-form :name="1" /></el-tab-pane>
            <el-tab-pane label="第二场站" name="2"><group-form :name="2" /></el-tab-pane>
            <el-tab-pane label="第三场站" name="3"><group-form :name="3" /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import groupForm from '@/views/setting/groupForm'

export default {
    components: { groupForm },
    data () {
        return {
            name: '1',
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
