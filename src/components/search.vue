<template>
    <s-btn corner="#42DFFF">
        <div class="searcher">
            <div v-if="!focus" class="placeholder" @click="onPlaceHolderClick">
                搜索公交编号、
                <br>公交线路
            </div>
            <input
                v-if="focus"
                ref="input"
                type="search"
                @blur="onBlur"
            >
            <button class="btn-search" />
        </div>
    </s-btn>
</template>

<script>
export default {
    data () {
        return {
            focus: false,
        }
    },
    methods: {
        onPlaceHolderClick () {
            this.focus = true
            this.$nextTick(() => this.$refs.input.focus())
        },
        onBlur () {
            this.focus = false
        },
    },
}
</script>
