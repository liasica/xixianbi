<template>
    <div class="container operation-container">
        <div class="filter">
            <choose
                label="公司"
                :value="1"
                :options="[{id: 1, label: '西咸公交集团'}, {id: 2, label: '西咸公交子公司'}]"
            />
            <choose
                label="场站"
                :value="1"
                :options="[{id: 1, label: '场站一'}, {id: 2, label: '场站二'}, {id: 3, label: '场站三'}]"
            />
            <choose
                label="线路"
                :value="1"
                :options="[{id: 1, label: '880'}, {id: 2, label: '600'}, {id: 3, label: '1101'}]"
            />
            <choose
                label="司机"
                :value="1"
                :options="[{id: 1, label: '张三'}, {id: 2, label: '李四'}, {id: 2, label: '王五'}]"
            />
        </div>
        <div class="left">
            <div>
                <div class="bi-title">车长信息</div>
                <img :src="require('@images/demo/13.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">调度计划</div>
                <img :src="require('@images/demo/15.png')" />
            </div>
        </div>
        <div class="mid">
            <div>
                <div class="bi-title">排班计划</div>
                <img :src="require('@images/demo/17.png')" />
            </div>
        </div>
        <div class="right">
            <div>
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/14.png')" />
            </div>
            <div class="bottom">
                <div class="bi-title">营运分析</div>
                <img :src="require('@images/demo/16.png')" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            driver: [
                { label: '车牌号', value: '陕AV9267' },
                { label: '物理卡号', value: '2D5A0531' },
                { label: '司机工号', value: 'XIA000001' },
                { label: '打卡时间', value: '2019-07-23 12:32:34' }
            ],
            scheduColumns: [
                { prop: 'plan', label: '800摆渡车计划' },
                { prop: 'up', label: '上行方向' },
                { prop: 'down', label: '下行方向' }
            ],
            scheduData: [
                { plan: '车牌号', up: '上行', down: '下行' },
                { plan: '开始时间点', up: '08:05', down: '08:10' },
                { plan: '发车间隔', up: '10', down: '10' },
                { plan: '间隔班次', up: '50', down: '51' },
                { plan: '总班次', up: '50', down: '51' },
                { plan: '单程时间', up: '43', down: '43' }
            ],
            orderColumns: [
                { prop: 'timeup', label: '时间点' },
                { prop: 'up', label: '开往上行' },
                { prop: 'timedown', label: '时间点' },
                { prop: 'down', label: '开往下行' }
            ],
            orderData: [
                {
                    timeup: '08:00',
                    up: '泾河新城管委会',
                    timedown: '08:05',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:10',
                    up: '泾河新城管委会',
                    timedown: '08:15',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:20',
                    up: '泾河新城管委会',
                    timedown: '08:25',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:30',
                    up: '泾河新城管委会',
                    timedown: '08:35',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:40',
                    up: '泾河新城管委会',
                    timedown: '08:45',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '08:50',
                    up: '泾河新城管委会',
                    timedown: '08:55',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:00',
                    up: '泾河新城管委会',
                    timedown: '09:05',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:10',
                    up: '泾河新城管委会',
                    timedown: '09:15',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:20',
                    up: '泾河新城管委会',
                    timedown: '09:25',
                    down: '后卫寨地铁站'
                },
                {
                    timeup: '09:30',
                    up: '泾河新城管委会',
                    timedown: '09:35',
                    down: '后卫寨地铁站'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.operation-container {
    flex-wrap: wrap;
}
.filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
}
.left {
    width: 310px;
}
.mid {
    flex: 1;
}
.right {
    width: 320px;
}
.bottom {
    margin-top: 40px;
}
</style>
