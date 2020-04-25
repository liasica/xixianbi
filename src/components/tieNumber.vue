<template>
    <div class="tie-number">
        <s-btn class="data">
            <div class="label" v-html="label" v-if="label"></div>
            <count-up
                class="number"
                :delay="delay"
                :endVal="number"
                :options="options"
                @ready="onReady"
            />
        </s-btn>
    </div>
</template>

<script>
import CountUp from 'vue-countup-v2'

export default {
    props: {
        label: { type: String },
        number: { type: Number, required: true }
    },
    components: { CountUp },
    data () {
        return {
            delay: 0,
            options: {
                useEasing: true,
                useGrouping: false,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            }
        }
    },
    methods: {
        onReady (instance, CountUp) {
            const that = this
            instance.update(that.number + 100)
        }
    }
}
</script>

<style lang="less" scoped>
.tie-number {
    position: relative;
    padding: 4px;
    height: 70px;
    width: 136px;
    &:before,
    &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 12px;
        left: 0;
        border: 1px solid #42dfff;
    }
    &:before {
        top: 0;
        border-bottom: none;
    }
    &:after {
        bottom: 0;
        border-top: none;
    }
}
.data {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    * {
        line-height: 1;
    }
    .number {
        margin-top: 4px;
        color: #42dfff;
        font-size: 30px;
    }
}
</style>
