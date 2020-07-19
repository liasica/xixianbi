<template>
    <div class="checkbox-wrapper" @click="onToggle">
        <i v-if="showCheckbox" class="check-box">{{ value ? '√' : '' }}</i>
        <span>{{ label }}</span>
    </div>
</template>
<script>
export default {
    props: {
        label: { type: String, default: '' },
        value: { type: Boolean, default: false },
        showCheckbox: { type: Boolean, default: false }
    },
    data () {
        return {}
    },
    methods: {
        onToggle () {
            this.$emit('update:value', !this.value)
            this.$emit('change', !this.value)
        }
    }
}
</script>
<style lang="less">
.checkbox-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    color: #08f0c9;
    font-size: 24px;
    .check-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #08f0c9;
        border-radius: 4px;
        width: 22px;
        height: 22px;
        margin-right: 16px;
        font-size: 12px;
    }
}
</style>
