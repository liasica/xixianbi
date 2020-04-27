<template>
    <div class="container complex-container">
        <div class="chart age">
            <div class="bi-title">场站车龄</div>
            <img :src="require('@images/demo/1.png')" />
        </div>
        <div class="chart info">
            <div class="bi-title">车辆信息</div>
            <img :src="require('@images/demo/2.png')" />
        </div>
        <div class="chart job">
            <div class="bi-title">岗位占比</div>
            <img :src="require('@images/demo/3.png')" />
        </div>
        <div class="chart age-cars">
            <div class="bi-title">场站车龄</div>
            <img :src="require('@images/demo/4.png')" />
        </div>
        <div class="chart energy">
            <div class="bi-title">车辆耗能</div>
            <img :src="require('@images/demo/5.png')" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.complex-container {
    justify-content: space-between;
    flex-wrap: wrap;
}
.chart {
    margin-bottom: 60px;
}
.age {
    width: 502px;
    img {
        margin-top: -60px;
    }
}
.info {
    width: 400px;
}
.job {
    width: 300px;
}
.age-cars,
.energy {
    width: 620px;
    img {
        margin-top: -40px;
    }
}
</style>
