<template>
    <div class="s-btn">
        <slot />
        <div class="bg" :style="bgStyle"></div>
        <div class="corner left" v-if="corner" :style="cornerStyle"></div>
        <div class="corner right" v-if="corner" :style="cornerStyle"></div>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: { type: String, default: '#7afff2' },
        corner: { type: [String, Boolean], default: false }
    },
    computed: {
        bgStyle () {
            return `border-color: ${this.bgColor}; box-shadow: inset 0 0 15px 0 ${this.bgColor};`
        },
        cornerStyle () {
            return typeof this.corner === 'boolean' ? '' : `border-color: ${this.corner}`
        }
    }
}
</script>
