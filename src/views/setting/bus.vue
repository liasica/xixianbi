<template>
    <div class="container">
        <el-form
            ref="form"
            class="form"
            style="width: 700px"
            :model="form"
            label-width="120px"
            size="small"
            :rules="rules"
        >
            <el-form-item label="定制公交" prop="custom">
                <el-input v-model.number="form.custom" />
            </el-form-item>
            <el-form-item label="通勤公交" prop="commute">
                <el-input v-model.number="form.commute" />
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
            key: 'BUS_NUMBER',
            form: {
                custom: 0,
                commute: 0,
            },
            rules: {
                custom: [{ type: 'number' }],
                commute: [{ type: 'number' }],
            },
        }
    },
    async created () {
        const { value } = await this.$axios.get(`setting?key=${this.key}`)
        if (value) { this.setform(value) }
    },
    methods: {
        setform (value) {
            this.form = value
        },
        async onSubmit () {
            const { value } = await this.$axios.post(
                `setting?key=${this.key}`,
                { value: this.form },
            )
            if (value) {
                this.$notify.success({ message: '保存成功' })
            }
            this.setform(value)
        },
    },
}
</script>
