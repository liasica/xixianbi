<template>
    <div v-if="item.meta && !item.meta.hidden" class="menu-item">
        <span class="title" @click="toggleMenu">{{ item.meta.title }}</span>
        <div v-if="!item.meta.hidden" :class="[{ 'active': isShow || expand },'menu-item-box']">
            <router-link v-for="item in item.children" :key="item.name" :to="item.path" exact>
                <span class="title">{{ item.meta.title }}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
import { routes } from '@/router'

export default {
    props: {
        item: { default: {} },
        basePath: { type: String, default: '' },
        index: { type: Number }
    },
    computed: {
        expand () {
            const index = routes.findIndex(r => {
                return (
                    r.children.findIndex(c => c.path === this.$route.path) > -1
                )
            })
            return index === this.index
        }
    },
    data () {
        return {
            isShow: false
        }
    },
    methods: {
        toggleMenu () {
            this.isShow = !this.isShow
        }
    }
}
</script>
<style lang="less" scoped>
.menu-item {
    display: block;

    color: fade(#d8d8d8, 50);
    cursor: pointer;
    &.router-link-exact-active,
    &.active,
    &:hover {
        color: #ffffff;
    }
    .title {
        padding: 10px 0;
        display: block;
        color: fade(#d8d8d8, 50);
        &.active,
        &:hover {
            color: #ffffff;
        }
    }
    .router-link-exact-active {
        .title {
            color: #ffffff;
        }
    }
}
.menu-item-box {
    height: 0;
    overflow: hidden;
    padding-left: 10px;
    &.active {
        height: auto;
    }
    .title {
        font-size: 14px;
        padding: 5px 0;
    }
}
</style>
