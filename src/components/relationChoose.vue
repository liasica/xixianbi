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
            :options="lineList"
        />
        <choose
            v-if="withDriver"
            v-model="choosed.driver"
            label="司机"
            value-index
            :options="driverList"
        />
        <button v-if="showAll" class="btn" @click="onReset">重置</button>
    </div>
</template>

<script>
export default {
    props: {
        withDriver: { type: Boolean, default: false },
        showAll: { type: Boolean, default: false },
    },
    data () {
        return {
            locked: false,
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
            const all = this.showAll ? [{ id: '', label: '全部' }] : []
            return this.groupList.length ? [...all, ...this.groupList[this.choosed.groupName].children] : all
        },
        driverList () {
            return this.lineList.length ? (this.lineList[this.choosed.lineNo].children || []) : []
        },
    },
    watch: {
        'choosed.filaName': function () {
            if (!this.locked) {
                const { groupName, lineNo } = this.choosed
                if (groupName === 0 && lineNo === 0) {
                    this.$emit('change', this.getChoosed())
                }
                this.$set(this.choosed, 'lineNo', 0)
                this.$set(this.choosed, 'groupName', 0)
            }
        },
        'choosed.groupName': function () {
            if (!this.locked) {
                const { lineNo } = this.choosed
                if (lineNo === 0) {
                    this.$emit('change', this.getChoosed())
                }
                this.$set(this.choosed, 'lineNo', 0)
            }
        },
        'choosed.lineNo': function () {
            if (!this.locked) {
                this.$emit('change', this.getChoosed())
            }
        },
        'choosed.driver': function () {
            this.$emit('change', this.getChoosed())
        },
    },
    async created () {
        const { lines } = await this.$axios.get('basic/line')
        this.lines = lines
        this.$emit('change', this.getChoosed())
        this.$emit('init', this.getChoosed())
    },
    methods: {
        getChoosed () {
            const { filaName: c, groupName: s, lineNo: l, driver: d } = this.choosed
            const filaName = this.lines.length ? this.lines[c] : null
            const groupName = (filaName && this.groupList.length) ? this.groupList[s] : null
            const lineNo = (groupName && this.lineList.length) ? this.lineList[l] : null
            const driver = (lineNo && this.driverList.length) ? this.driverList[d] : null
            return {
                filaName: filaName && filaName.id,
                groupName: groupName && groupName.id,
                lineNo: lineNo && lineNo.id,
                driver: driver && driver.id,
            }
        },
        onReset () {
            this.choosed.lineNo = 0
            this.$emit('reset', this.getChoosed())
        },
        setValue ({ filaName, groupName, lineNo }) {
            if (filaName) {
                this.locked = true
                const choosed = {}
                const fIndex = this.lines.findIndex(line => line.id === filaName)
                choosed.filaName = fIndex
                if (groupName) {
                    const groups = this.lines[fIndex].children
                    const gIndex = groups.findIndex(group => group.id === groupName)
                    choosed.groupName = gIndex
                    if (lineNo) {
                        const lines = groups[gIndex].children
                        const lIndex = lines.findIndex(line => line.id === lineNo)
                        choosed.lineNo = lIndex
                    }
                }
                this.choosed = choosed
                this.$nextTick(() => {
                    this.locked = false
                })
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
.btn{
    background-color: #42dfff;
    padding: 10px 20px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    letter-spacing: 8px;
}
</style>
