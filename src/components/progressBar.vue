<template>
    <div class="progress-wrapper">
        <div class="label" v-html="label" v-if="label"></div>
        <div class="progress-bar" :style="`border-color: ${this.color};`">
            <div class="progress" :style="style"></div>
        </div>
        <div class="schedule" :style="`color: ${color}`">{{ parseInt(schedule) }}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String, default: '' },
        schedule: { type: Number, default: 0 },
        color: { type: String, default: '#42DFFF' }
    },
    computed: {
        style () {
            return `width: ${this.width}%; background-image: linear-gradient(270deg, rgba(66,223,255,0.05) 0%, ${this.color} 100%);`
        }
    },
    data () {
        return {
            width: 0
        }
    },
    created () {
        this.width = 0
        setTimeout(() => {
            this.width = this.schedule
        }, 1)
    }
}
</script>

<style lang="less" scoped>
.progress-wrapper {
    display: flex;
    align-items: center;
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
    width: 60px;
    text-align: right;
    flex-shrink: 0;
}
</style>
