<template>
    <div :class="['card-container', `type-${type}`]" :style="`color: ${color}`">
        <span class="label">{{ label }}</span>
        <span class="value">{{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        type: { type: Number, default: 1 },
        label: { type: String, default: '' },
        value: { type: Number, default: 0 },
        color: { type: String, default: '' },
    },
}
</script>

<style scoped lang="less">
.card-container {
    position: relative;
    padding-left: 12px;
    padding-top: 44px;
    &.type-1 {
        width: 300px;
        height: 256px;
        background-image: url('../assets/1.png');
        background-size: cover;
    }
    &.type-2 {
        width: 300px;
        height: 256px;
        background-image: url('../assets/2.png');
        background-size: cover;
    }
    &.type-3 {
        width: 300px;
        height: 256px;
        background-image: url('../assets/3.png');
        background-size: cover;
    }
    &.type-4 {
        width: 300px;
        height: 256px;
        background-image: url('../assets/4.png');
        background-size: cover;
    }
    .label {
        display: flex;
        font-size: 26px;
    }
    .value {
        display: flex;
        font-size: 40px;
        margin-top: 20px;
    }
}
</style>
