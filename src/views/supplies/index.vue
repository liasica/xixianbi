<template>
    <div class="container">
        <div class="filter-box">
            <choose
                v-model="inboundNo"
                class="choose"
                :width="300"
                label="入库编号"
                :options="inboundNoOptions"
            />
            <button class="search-btn" @click="onSearch">
                <i class="icon-search" />查询
            </button>
        </div>
        <div class="content">
            <div class="left">
                <div class="bi-title">物资名称</div>
                <div class="list">
                    <div v-for="item in items" :key="item.id">
                        <s-btn class="value">{{ item.materialName || '-' }}</s-btn>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="top">
                    <div class="info">
                        <div class="bi-title">物资名称</div>
                        <div class="info-list">
                            <div class="item">
                                <span class="title">物资条形码</span>
                                <s-btn class="value">{{ item.barCode }}</s-btn>
                            </div>
                            <div class="item">
                                <span class="title">物资代码</span>
                                <s-btn class="value">{{ item.materialCd }}</s-btn>
                            </div>
                            <div class="item">
                                <span class="title">入库数量</span>
                                <s-btn class="value">{{ item.inboundNum }}</s-btn>
                            </div>
                            <div class="item">
                                <span class="title">物资规格</span>
                                <s-btn class="value">{{ item.standard || '-' }}</s-btn>
                            </div>
                            <div class="item">
                                <span class="title">含税单价</span>
                                <s-btn class="value">{{ item.price }}</s-btn>
                            </div>
                            <div class="item">
                                <span class="title">含税金额</span>
                                <s-btn class="value">{{ item.amount }}</s-btn>
                            </div>
                        </div>
                    </div>
                    <div class="num">
                        <div class="bi-title">库存数量</div>
                        <div class="num-box">
                            <span class="title">库存数量</span>
                            <span class="value">{{ number }}</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bi-title">每月入库数量</div>
                    <v-chart :options="chartOptions" class="bottom-chart" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inboundNo: null,
            inboundNoOptions: [],
            chartOptions: {},
            items: [],
            current: 0,
            number: 0,
        }
    },
    computed: {
        item () {
            return this.items.length ? this.items[0] : {}
        },
    },
    created () {
        this.getChartData()
        this.getData()
    },
    methods: {
        async getChartData () {
            const { items } = await this.$axios.get('supply/chart')
            const data = []
            const xdata = []
            items.forEach(item => {
                data.push(item.num)
                xdata.push(item.month)
            })

            this.chartOptions = {
                legend: false,
                tooltip: {
                    formatter: p => `${p.name}: ${p.data}个`,
                },
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 10,
                    },
                ],
                xAxis: {
                    type: 'category',
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#42DFFF',
                        },
                    },
                    axisLabel: {
                        color: '#ffffff',
                        fontFamily: 'BDZongYi',
                        rotate: 45,
                    },
                    data: xdata,
                },
                yAxis: {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#42DFFF',
                            opacity: 0.6,
                        },
                    },
                    axisTick: { show: false },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#42DFFF',
                        },
                    },
                    axisLabel: {
                        // show: false,
                        // inside: true,
                        color: '#ffffff',
                        fontFamily: 'BDZongYi',
                        formatter: value => (value > 0 ? value : null),
                        textStyle: {
                            baseline: 'bottom',
                        },
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 34,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#08F0C9', // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(19, 249, 230, 0)', // 100% 处的颜色
                                }],
                                global: false, // 缺省为 false
                            },
                        },
                        data,
                    },
                ],
            }
        },
        async getData () {
            const { inboundNoGroup, item } = await this.$axios.get('supply', {
                params: {
                    inboundNo: this.inboundNo,
                },
            })
            this.inboundNoOptions = inboundNoGroup.map(value => ({
                id: value,
                label: value,
            }))
            if (!this.inboundNo && inboundNoGroup.length) {
                this.inboundNo = this.inboundNoOptions[0].id
            }
            this.number = item.number
            this.items = item.items
        },
        onSearch () {},
    },
}
</script>

<style lang="less" scoped>
.container{
    display: flex;
    flex-direction: column;
}
.filter-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    .search-btn {
        background-color: #42dfff;
        padding: 10px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 117px;
        letter-spacing: 8px;
        margin-left: 20px;
    }
    .icon-search {
        display: inline-block;
        background-image: url(~@images/search-white.png);
        background-size: cover;
        width: 26px;
        height: 26px;
    }
    .export-btn {
        width: 210px;
        height: 60px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-switch {
            display: inline-block;
            width: 44px;
            height: 42px;
            background: url(~@images/switch.png);
            background-size: cover;
            margin-right: 20px;
        }
    }
}
.content{
    display: flex;
}
.left {
    width: 310px;
    flex-shrink: 0;
    .list{
        min-height: 780px;
        background-color: rgba(42, 75, 112, 0.2);
        padding: 25px;
        overflow: auto;
        .value{
            padding: 12px 60px;
            margin-bottom: 16px;
        }
    }
}
.right {
    flex: 1;
    margin-left: 10px;
    .top{
        display: flex;
        margin-bottom: 30px;
    }
    .info-list{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 190px;
            margin-right: 16px;
            padding-top: 30px;
        }
        .value{
            padding: 12px;
            margin-top: 20px;
        }
    }
    .num{
        .num-box{
            width: 250px;
            height: 250px;
            background-image: url(./assets/circle.png);
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #42DFFF;
            .value{
                font-size: 30px
            }
        }
    }
}
.bottom-chart {
    width: 100%;
    height: 300px;
}
</style>
