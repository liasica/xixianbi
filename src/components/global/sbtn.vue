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
<style lang="less" scoped>
.s-btn {
    position: relative;
    .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
        opacity: 0.3;
        border: 1px solid #7afff2;
        box-shadow: inset 0 0 15px 0 #7afff2;
    }
    .corner {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        width: 14px;
        height: 12px;
        border: 3px solid #42dfff;
        &.left {
            top: -1px;
            left: -1px;
            border-right: none;
            border-bottom: none;
        }
        &.right {
            right: -1px;
            bottom: -1px;
            border-left: none;
            border-top: none;
        }
    }
}
</style>
