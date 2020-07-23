<template>
    <div v-if="lines.length > 0" class="relation-choose">
        <choose
            v-model="choosed.filaName"
            label="公司"
            value-index
            :options="lines"
        />
        <choose
            v-model="choosed.groupName"
            label="车队"
            value-index
            :options="groupList"
        />
        <choose
            v-model="choosed.lineNo"
            label="线路"
            value-index
            :options="lines[choosed.filaName].children[choosed.groupName].children"
        />
        <choose
            v-if="withDriver"
            v-model="choosed.driver"
            label="司机"
            value-index
            :options="driverList"
        />
    </div>
</template>

<script>
export default {
    props: {
        withDriver: { type: Boolean, default: false },
    },
    data () {
        return {
            lines: [],
            choosed: {
                filaName: 0, // 公司
                groupName: 0, // 车队
                lineNo: 0, // 线路
                driver: 0,
            },
        }
    },
    computed: {
        groupList () {
            return this.lines.length ? this.lines[this.choosed.filaName].children : []
        },
        lineList () {
            return this.groupList.length ? this.groupList[this.choosed.groupName].children : []
        },
        driverList () {
            return this.lineList.length ? this.lineList[this.choosed.lineNo].children : []
        },
    },
    watch: {
        'choosed.filaName': function () {
            const { groupName, lineNo } = this.choosed
            if (groupName === 0 && lineNo === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'lineNo', 0)
            this.$set(this.choosed, 'groupName', 0)
        },
        'choosed.groupName': function () {
            const { lineNo } = this.choosed
            if (lineNo === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'lineNo', 0)
        },
        'choosed.lineNo': function () {
            this.$emit('change', this.getChoosed())
        },
        'choosed.driver': function () {
            this.$emit('change', this.getChoosed())
        },
    },
    async created () {
        const { lines } = await this.$axios.get('basic/line')
        this.lines = lines
        this.$emit('init', this.getChoosed())
        this.$emit('change', this.getChoosed())
    },
    methods: {
        getChoosed () {
            const { filaName: c, groupName: s, lineNo: l, driver: d } = this.choosed
            const filaName = this.lines.length ? this.lines[c] : null
            const groupName = (filaName && filaName.children.length) ? filaName.children[s] : null
            const lineNo = (groupName && groupName.children.length) ? groupName.children[l] : null
            const driver = (lineNo && lineNo.children.length) ? lineNo.children[d] : null
            return {
                filaName: filaName && filaName.id,
                groupName: groupName && groupName.id,
                lineNo: lineNo && lineNo.id,
                driver: driver && driver.id,
            }
        },
    },
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
