<template>
    <div class="relation-choose" v-if="lines.length > 0">
        <choose label="公司" v-model="choosed.filaName" value-index :options="lines" />
        <choose
            label="车队"
            value-index
            v-model="choosed.groupName"
            :options="lines[choosed.filaName].children"
        />
        <choose
            label="线路"
            value-index
            v-model="choosed.lineNo"
            :options="lines[choosed.filaName].children[choosed.groupName].children"
        />
        <choose
            v-if="withDriver"
            label="司机"
            :value="1"
            :options="[{id: 1, label: '李经西'}, {id: 2, label: '杨建国'}, {id: 3, label: '曹建民'}]"
        />
    </div>
</template>

<script>
export default {
    props: {
        withDriver: { type: Boolean, default: false }
    },
    data () {
        return {
            lines: [],
            choosed: {
                filaName: 0, // 公司
                groupName: 0, // 车队
                lineNo: 0 // 线路
            }
        }
    },
    methods: {
        getChoosed () {
            const { filaName: c, groupName: s, lineNo: l } = this.choosed
            const filaName = this.lines[c]
            const groupName = filaName.children[s]
            const lineNo = groupName.children[l]
            return {
                filaName: filaName.id,
                groupName: groupName.id,
                lineNo: lineNo.id
            }
        }
    },
    async created () {
        const { lines } = await this.$axios.get('basic/line')
        this.lines = lines
        this.$emit('init', this.getChoosed())
        this.$emit('change', this.getChoosed())
    },
    watch: {
        'choosed.filaName' (v) {
            const { groupName, lineNo } = this.choosed
            if (groupName === 0 && lineNo === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'lineNo', 0)
            this.$set(this.choosed, 'groupName', 0)
        },
        'choosed.groupName' (v) {
            const { lineNo } = this.choosed
            if (lineNo === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'lineNo', 0)
        },
        'choosed.lineNo' (v) {
            this.$emit('change', this.getChoosed())
        }
    }
}
</script>

<style lang="less" scoped>
.relation-choose {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
}
</style>
