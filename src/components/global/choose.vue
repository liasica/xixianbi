<template>
    <label class="choose">
        <span v-if="label" v-html="label" />
        <s-btn class="wrapper" :style="`width: ${width}px;`">
            <div v-click-outside="onHide" class="value" @click="onLabelClick">{{ valueLabel }}</div>
            <transition name="fade">
                <s-btn v-if="show" class="v-popover">
                    <ul class="options" :style="`width: ${width}px;`">
                        <li
                            v-for="(option, index) in options"
                            :key="option.id"
                            :class="{ active: valueIndex ? index === value : option.id === value }"
                            @click="onChoose(index)"
                        >{{ option.label }}</li>
                    </ul>
                </s-btn>
            </transition>
        </s-btn>
    </label>
</template>

<script>
// options: [{id:xxx, label:xxxx}]

export default {
    model: {
        prop: 'value',
        event: 'update',
    },
    props: {
        label: { type: String, default: '' },
        options: { type: Array, default: () => [] },
        value: { type: [String, Number, null], default: null },
        width: { type: Number, default: 180 },
        valueIndex: { type: Boolean, default: false },
    },
    data () {
        return {
            show: false,
        }
    },
    computed: {
        valueLabel () {
            if (this.valueIndex) {
                return this.options[this.value].label
            }
            for (let i = 0; i < this.options.length; i += 1) {
                const o = this.options[i]
                if (o.id === this.value) {
                    return o.label
                }
            }

            return ''
        },
    },
    methods: {
        onHide () {
            this.show = false
        },
        onLabelClick () {
            this.show = !this.show
        },
        onChoose (index) {
            const value = this.valueIndex ? index : this.options[index].id
            this.$emit('update', value)
        },
    },
}
</script>

<style lang="less" scoped>
.choose {
    display: flex;
    align-items: center;
    // height: 50px;
    & > span {
        height: 100%;
        max-width: 40px;
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
            padding-right: 40px;
            line-height: 30px;
            &:after {
                position: absolute;
                content: '';
                right: 10px;
                width: 20px;
                height: 12px;
                background: url(~@images/choose-arrow.png) center no-repeat;
                background-size: 20px 12px;
            }
        }
        .v-popover {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            width: 100%;
            left: 0;
            top: 100%;
            padding: 6px 0;
            background: #121c25;
            z-index: 9;
            .options {
                overflow: auto;
                max-height: 180px;
            }
            li {
                @li-color: #ffffff;
                padding: 0 10px;
                margin: 4px 0;
                cursor: pointer;
                width: 100%;
                color: fade(@li-color, 50%);
                &.active {
                    color: @li-color;
                }
            }
        }
    }
}
</style>
