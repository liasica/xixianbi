<template>
    <div class="menu-item">
        <span class="title" @click="toggleMenu">{{ item.title }}</span>
        <div :class="[{ 'active': isShow },'menu-item-box']">
            <router-link v-for="item in item.children" :key="item.name" :to="item.path" exact>
                <span class="title">{{ item.title }}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: { default: {} },
        basePath: { type: String, default: '' }
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
