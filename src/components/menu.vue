<template>
    <div class="sidebar">
        <span class="title">
            <i class="icon-platform"></i>西咸BI
        </span>
        <router-link to="/" exact>首页</router-link>
        <router-link to="/complex" exact>综合管理</router-link>
        <router-link to="/online">公交上线情况</router-link>
        <router-link to="/energy">耗能数据</router-link>
        <router-link to="/cars">车辆信息</router-link>
        <router-link to="/station">场站管理</router-link>
        <router-link to="/maintenance">机务管理</router-link>
        <router-link to="/operation">营运管理</router-link>
        <router-link to="/finance">财务管理</router-link>
        <router-link to="/supplies">物资管理</router-link>
    </div>
</template>

<style lang="less" scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 130px;
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
    a {
        display: inline-block;
        margin-top: 20px;
        color: fade(#d8d8d8, 50);
        cursor: pointer;
        &.router-link-exact-active,
        &.active,
        &:hover {
            color: #ffffff;
        }
    }
}
</style>
