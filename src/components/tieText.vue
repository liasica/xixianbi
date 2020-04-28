<template>
    <div class="tie-text">
        <s-btn class="content">
            <slot></slot>
        </s-btn>
    </div>
</template>
<style lang="less" scoped>
.tie-text {
    position: relative;
    padding: 4px;
    height: 54px;
    &:before,
    &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 12px;
        left: 0;
        border: 1px solid #42dfff;
    }
    &:before {
        top: 0;
        border-bottom: none;
    }
    &:after {
        bottom: 0;
        border-top: none;
    }
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
