<template>
    <div class="container">
        <el-form
            ref="form"
            class="form"
            style="width: 700px"
            :model="form"
            label-width="120px"
            size="small"
        >
            <el-form-item v-for="(pos, index) in form.positions" :key="index">
                <div class="positem">
                    <el-input v-model="form.positions[index].name" placeholder="输入岗位名称" />
                    <el-input v-model.number="form.positions[index].value" placeholder="输入岗位数量" />
                    <el-button
                        class="op"
                        icon="el-icon-plus"
                        circle
                        @click="handleAdd"
                    />
                    <el-button
                        :disabled="index === 0 && form.positions.length === 1"
                        class="op"
                        icon="el-icon-minus"
                        circle
                        type="danger"
                        style="margin-left: 0;"
                        @click="handleDelete(index)"
                    />
                </div>
            </el-form-item>

            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">
                    立即保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: 'WORK_POSITIONS',
            form: {
                positions: [{ name: '', value: 0 }],
            },
        }
    },
    async created () {
        const { value } = await this.$axios.get(`setting?key=${this.key}`)
        if (value) { this.setform(value) }
    },
    methods: {
        setform (value) {
            console.info(value)
            this.form.positions = value
        },
        async onSubmit () {
            const { value } = await this.$axios.post(
                `setting?key=${this.key}`,
                { value: this.form.positions },
            )
            if (value) {
                this.$notify.success({ message: '保存成功' })
            }
            this.setform(value)
        },
        handleAdd () {
            this.form.positions.push({ name: '', value: 0 })
        },
        handleDelete (index) {
            this.$confirm('删除岗位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.form.positions.splice(index, 1)
                this.$message({ type: 'success', message: '已删除岗位, 保存后生效!' })
            }).catch(() => {})
        },
    },
}
</script>

<style lang="less" scoped>
.positem {
    display: flex;
    column-gap: 10px;
}
.op {
    flex-shrink: 0;
}
</style>
