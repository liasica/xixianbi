<template>
    <div class="tie-number">
        <s-btn class="data">
            <div v-if="label" class="label" v-html="label" />
            <count-up
                class="number"
                :delay="delay"
                :end-val="number"
                :options="options"
                @ready="onReady"
            />
        </s-btn>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import CountUp from 'vue-countup-v2'

export default {
    components: { CountUp },
    props: {
        label: { type: String, default: '' },
        number: { type: Number, required: true },
    },
    data () {
        return {
            delay: 0,
            options: {
                useEasing: true,
                useGrouping: false,
                duration: 1,
            },
        }
    },
    methods: {
        onReady (instance) {
            const that = this
            instance.update(that.number)
        },
    },
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
