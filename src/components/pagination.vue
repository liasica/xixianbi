<template>
    <div class="pagination">
        <ul>
            <li @click="onPrev">
                <span class="icon-left-arrow"></span>
            </li>
            <li
                v-for="(item, index) in list"
                :key="index"
                :class="['item', { active: page === index + 1}]"
                @click="onChange(item)"
            >{{ item }}</li>
            <li @click="onNext">
                <span class="icon-right-arrow"></span>
            </li>
        </ul>
        <div v-if="jump" class="jump">
            跳转至
            <input v-model="jumpNum" type="text" />
            <span @click="onJump">确定</span>
        </div>
        <div v-if="showTotal" class="total">共{{ totalPage }}页/{{ total }}条数据</div>
    </div>
</template>
<script>
export default {
    props: {
        total: { type: Number, default: 1 },
        page: { type: Number, default: 1 },
        jump: { type: Boolean, default: true },
        showTotal: { type: Boolean, default: true }
    },
    computed: {
        totalPage () {
            return Math.ceil(this.total / 10)
        },
        list () {
            let list = []
            let len = this.totalPage
            if (this.totalPage <= 5) {
                while (len--) {
                    list.push(this.totalPage - len)
                }
                return list
            }
            list.push(1)
            if (this.page <= 3) {
                list = list.concat([2, 3])
                list.push('...')
                list.push(this.totalPage)
            } else if (this.page > this.totalPage - 3) {
                list.push('...')
                let diff = this.totalPage - this.page
                list.push(this.page)
                while (diff--) {
                    list.push(this.totalPage - diff)
                }
            } else {
                list.push('...')
                list.push(this.page - 1)
                list.push(this.page)
                list.push(this.page + 1)
                list.push('...')
                list.push(this.totalPage)
            }

            return list
        }
    },
    data () {
        return {
            jumpNum: ''
        }
    },
    methods: {
        onJump () {
            console.log(this.jumpNum)
        },
        onPrev () {},
        onNext () {},
        onChange (value) {
            this.$emit('update:page', value)
        }
    }
}
</script>
<style lang="less">
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    ul {
        display: flex;
        align-items: center;
    }
    li {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        &.item {
            border-radius: 100%;
            &.active,
            &:hover {
                background-color: #08f0c9;
            }
        }
        cursor: pointer;
        &.disabled {
            opacity: 0.5;
        }
    }
    .icon-left-arrow,
    .icon-right-arrow {
        display: inline-block;
        width: 12px;
        height: 22px;
        background-image: url(~@images/arrow.png);
        background-size: cover;
    }
    .icon-left-arrow {
        transform: rotate(180deg);
    }
    .jump {
        margin-left: 60px;
        input {
            width: 70px;
            height: 30px;
            border: 1px solid #7afff2;
            text-align: center;
            margin: 0 15px;
        }
        span {
            cursor: pointer;
        }
    }
    .total {
        margin-left: 60px;
    }
}
</style>
