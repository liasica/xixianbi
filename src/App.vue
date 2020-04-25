<template>
    <div id="app">
        <bi-header />
        <transition name="fade">
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
