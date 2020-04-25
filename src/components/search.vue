<template>
    <s-btn corner="#42DFFF">
        <div class="searcher">
            <div class="placeholder" v-if="!focus" @click="onPlaceHolderClick">
                搜索公交编号、
                <br />公交线路
            </div>
            <input ref="input" type="search" v-if="focus" @blur="onBlur" />
            <button class="btn-search"></button>
        </div>
    </s-btn>
</template>

<script>
export default {
    data () {
        return {
            focus: false
        }
    },
    methods: {
        onPlaceHolderClick () {
            this.focus = true
            this.$nextTick(() => this.$refs.input.focus())
        },
        onBlur () {
            this.focus = false
        }
    }
}
</script>
