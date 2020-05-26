<template>
    <div :class="['progress-wrapper', { 'no-border': noBorder }]">
        <div class="label" v-html="label" v-if="label"></div>
        <div class="progress-bar" :style="`border-color: ${this.color};`">
            <div class="progress" :style="style"></div>
        </div>
        <div class="schedule" :style="`color: ${color}`">{{ parseInt(target) }} {{ rightText }}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String, default: '' },
        schedule: { type: [Number, Array], default: 0 },
        color: { type: String, default: '#42DFFF' },
        rightText: { type: String, default: '' },
        noBorder: { type: Boolean, default: false }
    },
    computed: {
        style () {
            return `width: ${this.width}%; background-image: linear-gradient(270deg, rgba(66,223,255,0.05) 0%, ${this.color} 100%);`
        }
    },
    data () {
        return {
            width: 0,
            target: 0
        }
    },
    created () {
        this.width = 0
        setTimeout(() => {
            if (typeof this.schedule === 'number') {
                this.width = this.schedule
                this.target = this.schedule
            } else {
                const [num, max] = this.schedule
                this.width = (num / max) * 100
                this.target = num
            }
        }, 1)
    }
}
</script>

<style lang="less" scoped>
.progress-wrapper {
    display: flex;
    align-items: center;
    &.no-border {
        .progress-bar {
            border-color: transparent !important;
        }
    }
    .progress-bar {
        flex: 1;
        height: 28px;
        padding: 4px 2px;
        border: 1px solid #42dfff;
    }
    .progress {
        transition: all 500ms ease-out;
        height: 100%;
        width: 20%;
        transform: rotate(-180deg);
        background-image: linear-gradient(
            270deg,
            rgba(66, 223, 255, 0.05) 0%,
            #42dfff 100%
        );
    }
    .label {
        margin-right: 10px;
    }
    .schedule {
        font-size: 28px;
        min-width: 60px;
        text-align: right;
        flex-shrink: 0;
        margin-left: 5px;
    }
}
</style>
