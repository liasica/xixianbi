<template>
    <div class="s-btn">
        <slot />
        <div class="bg" :style="style"></div>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: { type: String, default: '#7afff2' }
    },
    computed: {
        style () {
            return `border-color: ${this.bgColor}; box-shadow: inset 0 0 15px 0 ${this.bgColor};`
        }
    }
}
</script>
