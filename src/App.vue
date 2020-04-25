<template>
    <div id="app">
        <bi-header />
        <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
import BiHeader from '@/components/header'

export default {
    components: { BiHeader }
}
</script>
