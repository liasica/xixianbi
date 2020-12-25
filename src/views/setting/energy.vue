<template>
    <div class="container">
        <el-form
            ref="form"
            class="form"
            style="width: 700px"
            :model="form"
            label-width="400px"
            :rules="rules"
        >
            <el-form-item
                v-for="(item, key) in form"
                :key="key"
                :label="key"
                :prop="key"
            >
                <el-select v-model="form[key]" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">立即保存</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: 'ENERGY_STATIONS',
            form: {},
            rules: {},
            options: [
                { value: '第一分公司', label: '第一分公司' },
                { value: '第二分公司', label: '第二分公司' },
                { value: '第三分公司', label: '第三分公司' },
                { value: '第四分公司', label: '第四分公司' },
                { value: '旅游客运公司', label: '旅游客运公司' },
            ],
        }
    },
    async created () {
        const { value } = await this.$axios.get(`setting?key=${this.key}`)
        this.setform(value)
    },
    // {"value":{"正阳公交场站":"场站1","西咸秦汉6充电站":"场站1","西咸沣东10充电站":"场站2","阿房宫场站一号站":"场站1","咸阳崇文塔公交场站":"场站1","西咸万泉公交充电站":"场站1","西咸大厦停车场场站":"场站1","西咸新区阿房宫充电站":"场站2","西咸新区原点新城充电站":"场站2","西咸公交临空产业园充电站":"场站3","西咸新区北杜中学KG8充电站":"场站2","西咸公交航投大厦孵化基地充电站":"场站1","西咸新区汽车维修服务中心充电站":"场站3"}}
    methods: {
        setform (value) {
            this.form = value
            Object.keys(value).forEach(k => {
                this.$set(this.rules, k, [{ required: true }])
            })
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
