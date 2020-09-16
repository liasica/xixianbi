<template>
    <el-form
        ref="form"
        class="form"
        style="width: 700px"
        :model="form"
        label-width="120px"
        size="small"
        :rules="rules"
    >
        <el-form-item label="常规公交">
            <el-input v-model.number="form.normal" />
        </el-form-item>
        <el-form-item label="定制公交">
            <el-input v-model.number="form.custom" />
        </el-form-item>
        <el-form-item label="通勤公交">
            <el-input v-model.number="form.commute" />
        </el-form-item>
        <el-form-item label="占地面积" prop="area">
            <el-input v-model.number="form.area" />
        </el-form-item>
        <el-form-item label="场地位置">
            <el-input v-model="form.position" />
        </el-form-item>
        <el-form-item label="场地规模">
            <el-input v-model="form.scale" />
        </el-form-item>
        <el-form-item label="场地分布">
            <el-input v-model="form.distribut" />
        </el-form-item>
        <el-form-item label="场地人员" prop="peoples">
            <el-input v-model.number="form.peoples" />
        </el-form-item>
        <el-form-item label="车长数量" prop="drivers">
            <el-input v-model.number="form.drivers" />
        </el-form-item>
        <el-form-item label="见习车长数量" prop="novitiates">
            <el-input v-model.number="form.novitiates" />
        </el-form-item>
        <el-form-item label="车辆总数" prop="parking">
            <el-input v-model.number="form.parking" />
        </el-form-item>
        <el-form-item label="累积进出量" prop="flow">
            <el-input v-model.number="form.flow" />
        </el-form-item>
        <el-form-item label="充电桩规模" prop="energy">
            <el-input v-model.number="form.energy" />
        </el-form-item>

        <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">
                立即保存
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        name: { type: Number, default: 1 },
    },
    data () {
        return {
            form: {
                area: 0,
                position: '',
                scale: '大型',
                distribut: '',
                peoples: 0,
                drivers: 0,
                novitiates: 0,
                parking: 0,
                flow: 0,
                energy: 0,
            },
            rules: {
                area: [{ type: 'number' }],
                peoples: [{ type: 'number' }],
                drivers: [{ type: 'number' }],
                novitiates: [{ type: 'number' }],
                parking: [{ type: 'number' }],
                flow: [{ type: 'number' }],
                energy: [{ type: 'number' }],
            },
        }
    },
    computed: {
        key () {
            return `GROUP_INFO_${this.name}`
        },
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
