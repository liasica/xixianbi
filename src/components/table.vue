<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="item in columns" :key="item.prop">{{ item.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in source" :key="index">
                <td v-for="t in columns" :key="t.prop">
                    <span v-if="t.render" v-html="t.render(item[t.prop])"></span>
                    <span v-else>{{ item[t.prop] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ['columns', 'source'],
    data () {
        return {}
    }
}
</script>
<style lang="less">
.table {
    width: 100%;
    thead {
        border-bottom: 1px solid #42dfff;
    }
    tbody {
        tr {
            &:nth-child(2n) {
                background-color: fade(#2a4b70, 20);
            }
        }
    }
    td {
        text-align: center;
        color: fade(#ffffff, 80);
        height: 50px;
        line-height: 50px;
    }
}
</style>
