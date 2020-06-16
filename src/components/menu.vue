<template>
    <div class="sidebar">
        <span class="title">
            <i class="icon-platform"></i>西咸BI
        </span>
        <div class="menu-box">
            <MenuItem
                v-for="(route, index) in routes"
                :key="route.name"
                :item="route"
                :base-path="route.path"
                :index="index"
            ></MenuItem>
        </div>
    </div>
</template>
<script>
import { routes } from '@/router'
import MenuItem from '@/components/menuItem.vue'

export default {
    components: { MenuItem },
    computed: {
        routes () {
            return routes
        }
    }
}
</script>
<style lang="less" scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 200px;
    font-size: 16px;
    background-color: #122836;
    padding: 30px 6px 0;
    display: flex;
    flex-direction: column;
    z-index: 9;
    // transition: all 0.25s;
    .title {
        font-size: 20px;
        color: #42dfff;
    }
    .icon-platform {
        display: inline-block;
        background-image: url('~@images/platform.png');
        background-size: cover;
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
    .menu-box {
        display: block;
    }
}
</style>
