<template>
    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="item in columns" :key="item.prop">{{ item.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td
                        v-for="t in columns"
                        :key="t.prop"
                        :style="`text-align:${t.align}; max-width: ${t.width}px`"
                    >
                        <span v-if="t.render" v-html="t.render(item[t.prop])"></span>
                        <span v-else>{{ item[t.prop] || '-' }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <BiPagination v-if="total > 0" :total="total" :page.sync="current" />
    </div>
</template>

<script>
import BiPagination from '@/components/pagination'
export default {
    components: {
        BiPagination
    },
    props: {
        columns: { default: [] },
        source: { default: [] },
        pagination: {
            default: () => ({
                pageSize: 10
            })
        }
    },
    computed: {
        total () {
            return this.source.length
        },
        list () {
            return this.source.slice(
                (this.current - 1) * this.pagination.pageSize,
                this.current * this.pagination.pageSize
            )
        }
    },
    data () {
        return {
            current: 1
        }
    },
    methods: {}
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
