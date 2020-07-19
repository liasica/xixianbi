<template>
    <div class="s-btn">
        <slot />
        <div class="bg" :style="bgStyle" />
        <div v-if="leftTop.show" class="corner left-top" :style="leftTop.style" />
        <div v-if="leftBottom.show" class="corner left-bottom" :style="leftBottom.style" />
        <div v-if="rightTop.show" class="corner right-top" :style="rightTop.style" />
        <div v-if="rightBottom.show" class="corner right-bottom" :style="rightBottom.style" />
    </div>
</template>

<script>
export default {
    props: {
        bgColor: { type: String, default: '#7afff2' },
        corner: { type: [String, Boolean, Object], default: false },
    },
    computed: {
        bgStyle () {
            return `border-color: ${this.bgColor}; box-shadow: inset 0 0 15px 0 ${this.bgColor};`
        },
        cornerStyle () {
            return typeof this.corner === 'boolean'
                ? ''
                : `border-color: ${this.corner}`
        },
        leftTop () {
            return {
                show:
                    this.corner === true
                    || typeof this.corner === 'string'
                    || this.corner.leftTop,
                style:
                    typeof this.corner === 'boolean'
                        ? ''
                        : `border-color: ${this.corner.leftTop || this.corner}`,
            }
        },
        leftBottom () {
            const style = this.corner.leftBottom || ''
            return {
                show: style !== '',
                style: `border-color: ${style}`,
            }
        },
        rightTop () {
            const style = this.corner.rightTop || ''
            return {
                show: style !== '',
                style: `border-color: ${style}`,
            }
        },
        rightBottom () {
            return {
                show:
                    this.corner === true
                    || typeof this.corner === 'string'
                    || this.corner.rightBottom,
                style:
                    typeof this.corner === 'boolean'
                        ? ''
                        : `border-color: ${this.corner.leftTop || this.corner}`,
            }
        },
    },
}
</script>
<style lang="less" scoped>
.s-btn {
    position: relative;
    cursor: pointer;
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
        // z-index: -1;
    }
    .corner {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        width: 14px;
        height: 12px;
        border: 3px solid #42dfff;
        &.left-top {
            top: -1px;
            left: -1px;
            border-right: none;
            border-bottom: none;
        }
        &.left-bottom {
            bottom: -1px;
            left: -1px;
            border-right: none;
            border-top: none;
        }
        &.right-top {
            right: -1px;
            top: -1px;
            border-left: none;
            border-bottom: none;
        }
        &.right-bottom {
            right: -1px;
            bottom: -1px;
            border-left: none;
            border-top: none;
        }
    }
}
</style>
