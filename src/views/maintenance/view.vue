<template>
    <div class="container maintenance-container">
        <div class="left">
            <div class="total">
                <img :src="require('@images/demo/7.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">维修次数</div>
                <img :src="require('@images/demo/10.png')" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">维修信息</div>
                <img :src="require('@images/demo/8.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">出厂信息</div>
                <img :src="require('@images/demo/11.png')" />
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">延迟信息</div>
                <img :src="require('@images/demo/9.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">超速信息</div>
                <img :src="require('@images/demo/12.png')" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.maintenance-container {
    flex-wrap: wrap;
}
.left {
    flex: 1;
}
.mid,
.right {
    width: 310px;
    margin-left: 20px;
}
.total {
    height: 390px;
    background: url(~@images/bus-x-ray.png) bottom right no-repeat;
    background-size: contain;
    img {
        width: 450px;
    }
}
.bottom {
    margin-top: 40px;
}
</style>
