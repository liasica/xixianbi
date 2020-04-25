<template>
    <label class="choose">
        <span v-html="label"></span>
        <s-btn class="wrapper" :style="`width: ${this.width}px;`">
            <div class="value" v-click-outside="onHide" @click="onLabelClick">{{ valueLabel }}</div>
            <transition name="fade">
                <s-btn class="v-popover" v-if="show">
                    <ul class="options" :style="`width: ${this.width}px;`">
                        <li
                            @click="onChoose(option.id)"
                            v-for="option in options"
                            :key="option.id"
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
    props: {
        label: { type: String },
        options: { type: Array, default: () => [] },
        value: { type: [String, Number] },
        width: { type: Number, default: 180 }
    },
    model: {
        prop: 'value',
        event: 'update'
    },
    computed: {
        valueLabel () {
            for (let i = 0; i < this.options.length; i++) {
                const o = this.options[i]
                if (o.id === this.value) {
                    return o.label
                }
            }
            return ''
        }
    },
    data () {
        return {
            show: false
        }
    },
    methods: {
        onHide () {
            this.show = false
        },
        onLabelClick () {
            this.show = !this.show
        },
        onChoose (id) {
            this.$emit('update', id)
        }
    }
}
</script>
