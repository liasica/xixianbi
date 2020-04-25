<template>
    <div class="container">
        <div class="bi-title" sty>当日公交上线情况</div>
        <choose class="choose" label="测试一下" :options="options" v-model="id" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            options: [
                { id: 1, label: '标签一' },
                { id: 2, label: '标签二' },
                { id: 3, label: '标签三' }
            ],
            id: 1
        }
    }
}
</script>
