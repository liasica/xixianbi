<template>
    <div class="table-container">
        <div class="table-entity">
            <table class="table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="item in columns" :key="item.prop">{{ item.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in list" :key="index">
                        <td>{{ index + 1 + 10* (current -1) }}</td>
                        <td
                            v-for="t in columns"
                            :key="t.prop"
                            :style="`text-align:${t.align}; max-width: ${t.width}px`"
                        >
                            <span v-if="t.render" v-html="t.render(item[t.prop])" />
                            <span v-else>{{ item[t.prop] || '-' }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <BiPagination
            v-if="pagination && total > 0"
            :total="total"
            :page.sync="current"
            :jump="pagination && pagination.jump"
            :show-total="pagination && pagination.showTotal"
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
        pagination: {
            type: [Object, Boolean],
            default: () => ({
                pageSize: 10,
                jump: true,
                showTotal: true,
            }),
        },
    },
    data () {
        return {
            current: 1,
        }
    },
    computed: {
        total () {
            return this.source.length
        },
        list () {
            if (this.pagination) {
                return this.source.slice(
                    (this.current - 1) * this.pagination.pageSize,
                    this.current * this.pagination.pageSize,
                )
            }
            return this.source
        },
    },
    methods: {},
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
