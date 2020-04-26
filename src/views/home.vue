<template>
    <div class="container home-container">
        <div class="left">
            <div class="bi-title">当日公交上线情况</div>
            <div class="progress-bars">
                <progress-bar class="pbar" label="常规公交" :schedule="getRandomInt(100)" />
                <progress-bar
                    class="pbar"
                    label="定制公交"
                    :schedule="getRandomInt(100)"
                    color="#08F0C9"
                />
                <progress-bar
                    class="pbar"
                    label="通勤公交"
                    :schedule="getRandomInt(100)"
                    color="#3C77FF"
                />
            </div>
            <div class="tie-items">
                <tie-number :number="getRandomInt(5000)" label="活跃车数" />
                <tie-number :number="getRandomInt(5000)" label="非活跃车数" />
            </div>
            <div class="violation">
                <div class="bi-title">当日车辆违规统计</div>
                <ul>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-alert.png')" />
                        </s-btn>
                        <span>本月30内报警数</span>
                        <div class="value">100</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-illegal.png')" />
                        </s-btn>
                        <span>驾驶员违法违规</span>
                        <div class="value">100</div>
                    </li>
                    <li class="thin-border border-bottom">
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-accident.png')" />
                        </s-btn>
                        <span>驾驶员事故次数</span>
                        <div class="value">100</div>
                    </li>
                    <li>
                        <s-btn class="icon" :corner="true">
                            <img :src="require('@images/violation-insurance.png')" />
                        </s-btn>
                        <span>车辆保险到期</span>
                        <div class="value">100</div>
                    </li>
                </ul>
            </div>
            <div class="radials">
                <div class="bi-title">早高峰平均出车率（日）</div>
                <div class="items">
                    <s-btn :corner="{ leftTop: '#42DFFF', rightTop: '#42DFFF' }" class="radial">
                        <radial radial-id="radial1" :schedule="getRandomInt(100)" />
                        <div class="radial-label">场站一</div>
                    </s-btn>
                    <s-btn
                        :corner="{ leftTop: '#08F0C9', rightTop: '#08F0C9' }"
                        bg-color="#08F0C9"
                        class="radial radial2"
                    >
                        <radial radial-id="radial2" :schedule="getRandomInt(100)" />
                        <div class="radial-label">场站二</div>
                    </s-btn>
                    <s-btn
                        :corner="{ leftTop: '#3C77FF', rightTop: '#3C77FF' }"
                        bg-color="#3C77FF"
                        class="radial radial3"
                    >
                        <radial radial-id="radial3" :schedule="getRandomInt(100)" />
                        <div class="radial-label">场站三</div>
                    </s-btn>
                </div>
            </div>
        </div>
        <div class="mid">
            <div class="pile">
                <div class="income">
                    <div class="title">车辆累计月收入</div>
                    <div class="value">{{ getRandomInt(15000000) }}</div>
                </div>
                <div class="count">
                    <div class="title">本月累计发车</div>
                    <div class="value">{{ getRandomInt(99999) }}</div>
                </div>
                <div class="flow">
                    <div class="title">车辆累计月客流</div>
                    <div class="value">{{ getRandomInt(15000000) }}</div>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import ProgressBar from '@/components/progressBar'
import TieNumber from '@/components/tieNumber'
import Radial from '@/components/radial'

export default {
    components: { ProgressBar, TieNumber, Radial },
    data () {
        return {}
    },
    methods: {
        getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max))
        }
    }
}
</script>

<style lang="less" scoped>
.left,
.right {
    width: 300px;
    flex-shrink: 0;
}
.mid {
    flex: 1;
    padding: 0 20px;
}
.pbar {
    margin-bottom: 10px;
}
.tie-items {
    display: flex;
    justify-content: space-between;
}
.violation {
    margin-top: 24px;
    li {
        display: flex;
        align-items: center;
        padding-bottom: 14px;
        margin-bottom: 14px;
        .value {
            flex: 1;
            text-align: right;
            opacity: 0.9;
            font-size: 28px;
        }
        span {
            opacity: 0.8;
        }
    }
    .icon {
        width: 42px;
        height: 42px;
        margin-right: 12px;
        img {
            width: 42px;
            height: 42px;
        }
    }
}
.radials {
    .items {
        display: flex;
        justify-content: space-between;
    }
    .radial {
        padding-bottom: 26px;
    }
}

.radial-label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 70px;
    bottom: -14px;
    left: 13px;
    font-size: 18px;
    background: #131c24;
    border: 1px solid #42dfff;
    box-shadow: inset 0 0 9px 0 #42dfff;
}

.radial2 {
    .radial-label {
        border: 1px solid #08f0c9;
        box-shadow: inset 0 0 9px 0 #08f0c9;
    }
}

.radial3 {
    .radial-label {
        border: 1px solid #3c77ff;
        box-shadow: inset 0 0 9px 0 #3c77ff;
    }
}

.pile {
    display: flex;
    justify-content: space-between;
    .title {
        text-align: center;
        font-size: 22px;
    }
    .value {
        font-size: 48px;
        letter-spacing: -4px;
        text-align: center;
    }
    .income {
        .value {
            color: #42dfff;
        }
    }
    .count {
        .value {
            color: #08f0c9;
        }
    }
    .flow {
        .value {
            color: #3c77ff;
        }
    }
}
</style>
