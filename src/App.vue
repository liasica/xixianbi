<template>
    <div id="app">
        <bi-header />
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath" />
        </transition>
    </div>
</template>

<script>
import BiHeader from '@/components/header'

export default {
    components: { BiHeader }
}
</script>
<style lang="less">
.app {
    min-height: 100vh;
}
</style>
