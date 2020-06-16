<template>
    <div class="relation-choose" v-if="lines.length > 0">
        <choose label="公司" v-model="choosed.company" value-index :options="lines" />
        <choose
            label="场站"
            value-index
            v-model="choosed.station"
            :options="lines[choosed.company].children"
        />
        <choose
            label="线路"
            value-index
            v-model="choosed.line"
            :options="lines[choosed.company].children[choosed.station].children"
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
                company: 0, // 公司
                station: 0, // 场站
                line: 0 // 线路
            }
        }
    },
    methods: {
        getChoosed () {
            const { company: c, station: s, line: l } = this.choosed
            const company = this.lines[c]
            const station = company.children[s]
            const line = station.children[l]
            return { company: company.id, station: station.id, line: line.id }
        }
    },
    async created () {
        const { lines } = await this.$axios.get('basic/line')
        this.lines = lines
        this.$emit('init', this.getChoosed())
    },
    watch: {
        'choosed.company' (v) {
            const { station, line } = this.choosed
            if (station === 0 && line === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'line', 0)
            this.$set(this.choosed, 'station', 0)
        },
        'choosed.station' (v) {
            const { line } = this.choosed
            if (line === 0) {
                this.$emit('change', this.getChoosed())
            }
            this.$set(this.choosed, 'line', 0)
        },
        'choosed.line' (v) {
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
