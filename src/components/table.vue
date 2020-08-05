<template>
    <div class="table-container">
        <div class="table-entity">
            <table class="table">
                <thead>
                    <tr>
                        <th v-if="showNumber">序号</th>
                        <th v-for="(item, ck) in columns" :key="ck">{{ item.label }}</th>
                    </tr>
                </thead>
                <tbody v-if="total>0">
                    <tr v-for="(item, index) in list" :key="index">
                        <td v-if="showNumber">{{ index + 1 + 10* (current -1) }}</td>
                        <td
                            v-for="(t, k) in columns"
                            :key="k"
                            :style="`text-align:${t.align}; max-width: ${t.width}px`"
                            @click="click(t, item)"
                        >
                            <span v-if="t.render" v-html="t.render(item[t.prop], item)" />
                            <span v-else>{{ item[t.prop] === undefined ? '-' :item[t.prop] }}</span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td :colspan="columns.length + (showNumber?1:0)" class="empty">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <BiPagination
            v-if="pagination && total > 0"
            :total="total"
            :page.sync="current"
            :page-size="pageSize"
            :jump="showJump"
            :show-total="showTotal"
        />
    </div>
</template>

<script>
import BiPagination from '@/components/pagination'

export default {
    components: {
        BiPagination,
    },
    props: {
        columns: { type: Array, default: () => [] },
        source: { type: Array, default: () => [] },
        showNumber: { type: Boolean, default: true },
        pagination: { type: Boolean, default: true },
        page: { type: Number, default: 1 },
        pageSize: { type: Number, default: 10 },
        showJump: { type: Boolean, default: true },
        showTotal: { type: Boolean, default: true },
        // pagination: {
        //     type: [Object, Boolean],
        //     default: () => ({
        //         pageSize: 10,
        //         jump: true,
        //         showTotal: true,
        //     }),
        // },
    },
    data () {
        return {
        }
    },
    computed: {
        current: {
            get () {
                return this.page
            },
            set (value) {
                this.$emit('update:page', value)
            },
        },
        total () {
            return this.source.length
        },
        list () {
            if (this.pagination) {
                return this.source.slice(
                    (this.current - 1) * this.pageSize,
                    this.current * this.pageSize,
                )
            }
            return this.source
        },
    },
    methods: {
        click (t, row) {
            // eslint-disable-next-line no-unused-expressions
            t.click && t.click(row)
        },
    },
}
</script>
<style lang="less">
.table-entity{
    width: 100%;
    max-width: 1260px;
    overflow: auto;
}
.table {
    width: 100%;
    white-space: nowrap;
    thead {
        border-bottom: 1px solid #42dfff;
        font-size: 18px;
    }
    tbody {
        tr {
            &:nth-child(2n) {
                background-color: fade(#2a4b70, 20);
            }
            th{
                word-break: keep-all;
                white-space:nowrap;
                padding: 0 10px;
                margin: 0 10px;
            }
        }
    }
    td {
        text-align: center;
        color: fade(#ffffff, 80);
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        font-size: 16px;
        word-break: keep-all;
        white-space:nowrap;
    }
    .empty{
        text-align: center;
        padding: 20px ;
    }
}
</style>
