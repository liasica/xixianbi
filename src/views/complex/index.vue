<template>
    <div class="container complex-container">
        <div class="chart age">
            <div class="bi-title">场站车龄</div>
            <img :src="require('@images/demo/1.png')">
        </div>
        <div class="chart info">
            <div class="bi-title">车辆信息</div>
            <div v-for="(item, index) in info" :key="index" class="item">
                <img :src="require(`./assets/${item.icon}.png`)">
                <span>{{ item.label }}</span>
                <div class="right" :style="`color: ${item.color}`">
                    <span>{{ item.value }}</span>
                    <span class="unit">{{ item.unit }}</span>
                </div>
            </div>
        </div>
        <div class="chart job">
            <div class="bi-title">岗位占比</div>
            <img :src="require('@images/demo/3.png')">
        </div>
        <div class="chart age-cars">
            <div class="bi-title">场站车龄</div>
            <img :src="require('@images/demo/4.png')">
        </div>
        <div class="chart energy">
            <div class="bi-title">车辆耗能</div>
            <img :src="require('@images/demo/5.png')">
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            info: {
                income: {
                    icon: 'rmb',
                    label: '昨日收入',
                    value: '-',
                    unit: 'RMB',
                    color: '#42DFFF',
                },
                distance: {
                    icon: 'dashboard',
                    label: '累计里程',
                    value: '-',
                    unit: 'KM',
                    color: '#08F0C9',
                },
                passenger: {
                    icon: 'users',
                    label: '当日人次',
                    value: '2401679',
                    unit: '人次',
                    color: '#3C77FF',
                },
                oil: {
                    icon: 'battery',
                    label: '累计耗能',
                    value: '-',
                    unit: '度',
                    color: '#EBEBEB',
                },
            },
        }
    },
    async created () {
        const { info } = await this.$axios.get('complex')
        Object.keys(info).forEach(k => {
            this.$set(this.info[k], 'value', info[k] || '-')
        })
    },
}
</script>
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
    .item {
        border-bottom: 1px solid fade(#39bdd9, 50);
        padding: 26px 0 14px;
        display: flex;
        align-items: center;
        font-size: 22px;
        .right {
            flex: 1;
            text-align: right;
            font-size: 40px;
            .unit {
                font-size: 18px;
                margin-left: 10px;
            }
        }
    }
    img {
        width: 34px;
        height: 34px;
        object-fit: contain;
        margin-right: 11px;
    }
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
