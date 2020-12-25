<template>
    <div v-if="lines.length > 0" class="relation-choose">
        <choose
            v-model="choosed.filaName"
            label="公司"
            value-index
            :options="lines"
        />
        <choose
            v-model="choosed.lineNo"
            label="线路"
            value-index
            :options="lineList"
        />
        <button v-if="showAll && !hideReset" class="btn" @click="onReset">重置</button>
    </div>
</template>

<script>
export default {
    props: {
        showAll: { type: Boolean, default: false },
        hideReset: { type: Boolean, default: false },
    },
    data () {
        return {
            locked: false,
            lines: [],
            choosed: {
                filaName: 0, // 公司
                lineNo: 0, // 线路
            },
        }
    },
    computed: {
        lineList () {
            const items = this.lines.length ? this.lines[this.choosed.filaName].children : []
            const all = this.showAll ? [{ id: '', label: '全部' }] : []
            const lines = items.length ? [...all, ...items] : all
            return lines
        },
    },
    watch: {
        'choosed.filaName': function () {
            if (!this.locked) {
                if (this.choosed.lineNo === 0) {
                    this.$emit('change', this.getChoosed())
                } else {
                    this.$set(this.choosed, 'lineNo', 0)
                }
            }
        },
        'choosed.lineNo': function () {
            if (!this.locked) {
                this.$emit('change', this.getChoosed())
            }
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
            const { filaName: c, lineNo: l } = this.choosed
            const filaName = this.lines.length ? this.lines[c] : null
            const lineNo = (filaName && this.lineList.length) ? this.lineList[l] : null
            return {
                filaName: filaName && filaName.id,
                lineNo: lineNo && lineNo.id,
            }
        },
        onReset () {
            this.choosed.lineNo = 0
            this.$emit('reset', this.getChoosed())
        },
        setValue ({ filaName, lineNo }) {
            if (filaName) {
                this.locked = true
                const choosed = {}
                const fIndex = this.lines.findIndex(line => line.id === filaName)
                choosed.filaName = fIndex
                if (lineNo) {
                    const lines = this.lines[fIndex].children
                    const lIndex = lines.findIndex(line => line.id === lineNo)
                    choosed.lineNo = lIndex
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
