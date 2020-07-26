<template>
    <label class="input-box">
        <span v-if="label" v-html="label" />
        <s-btn class="wrapper" :style="`width: ${width}px;`">
            <input
                :value="value"
                class="value"
                type="text"
                @input="onChange"
            >
        </s-btn>
    </label>
</template>

<script>

export default {
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        label: { type: String, default: '' },
        value: { type: [String, Number, null], default: null },
        width: { type: Number, default: 180 },
    },
    data () {
        return {

        }
    },
    methods: {
        onChange (e) {
            const { value } = e.currentTarget
            this.$emit('update:value', value)
        },
    },
}
</script>

<style lang="less" scoped>
.input-box {
    display: flex;
    align-items: center;
    // height: 50px;
    margin-bottom: 10px;
    & > span {
        height: 100%;
        max-width: 60px;
        line-height: 1;
        display: flex;
        align-items: center;
        margin-right: 15px;
    }
    .wrapper {
        .value {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            width: 100%;
            height: 100%;
            padding: 10px;
            display: flex;
            align-items: center;
            font-size: 22px;
            line-height: 30px;
        }
    }
}
</style>
