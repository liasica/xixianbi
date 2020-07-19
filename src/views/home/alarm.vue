<template>
    <div class="container">
        <div class="content">
            <div class="filter-box">
                <choose
                    v-model="current"
                    class="choose"
                    label=""
                    :options="options"
                    :width="450"
                />
            </div>
            <div>1</div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    data () {
        return {
            options: [
                { label: '七日报警总数', id: 'week' },
                { label: '30日报警总数', id: 'month' },
                { label: '本月和上月报警对比', id: 'compare' },
                { label: '前十名线路30日告警排名', id: 'rank' },
                // { label: '前十名线路30日告警排名', id: 'compare' },
            ],
            current: 'week',
        }
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            try {
                // 本月和上月报警类型对比 compare
                // 30日内报警总数，包括环比，同比 month
                // 7日内报警总数，包括环比，同比 week
                // 30日内线路告警排名 rank
                // 当日驾驶员告警排名 driver
                const data = await this.$axios.get('alarm')
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>
<style lang="less" scoped>
.container {
    display: flex;
    // min-height: calc(100vh - 130px);
    .content {
        flex: 1;
        height: 100%;
        margin-left: 20px;
    }
    .filter-box {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 25px;
    }

}
</style>
