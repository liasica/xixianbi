<template>
    <div class="container">
        <div class="sidebar">
            <span class="title"><i class="icon-home"></i>首页大屏</span>
            <a>公交上线情况</a>
            <a>车辆违规统计</a>
            <a>早高峰出车率</a>
            <a>车辆营收</a>
        </div>
        <div class="content">
            <BiTable :columns="columns" :source="list" />
        </div>
    </div>
</template>

<script>
import BiTable from '@/components/table'
import Mock from 'mockjs'
const data = Mock.mock({
    'list|10': [{
        id: '01',
        cate: '常规公交',
        station: '场站1',
        name: '880',
        start: '泾河新城管委会',
        start_time: '07:00:00-19:00:00',
        end: '后卫寨地铁站',
        end_time: '07:00:00-19:00:00',
        fleet: '1号车队',
        statue: '运营'
    }]
})

export default {
    components: {
        BiTable
    },
    data () {
        return {
            columns: [
                { prop: 'id', label: '序号' },
                { prop: 'cate', label: '公交分类' },
                { prop: 'station', label: '场站' },
                { prop: 'name', label: '线路名称' },
                { prop: 'start', label: '上车发行站点' },
                { prop: 'start_time', label: '运营时间' },
                { prop: 'end', label: '下车发行站点' },
                { prop: 'end_time', label: '运营时间' },
                { prop: 'fleet', label: '所属车队' },
                { prop: 'statue', label: '线路状态' }
            ],
            list: data.list
        }
    },
    created () {
    }
}
</script>
<style lang="less" scoped>
  .container{
    display: flex;
    height: calc(100vh - 130px);
    .sidebar{
      height: 100%;
      width: 121px;
      font-size: 16px;
      background-color: #122836;
      padding: 50px 6px 0;
      .title{
        font-size: 20px;
        color: #42DFFF;
      }
      .icon-home{
        display: inline-block;
        background-image: url('~@images/home.png');
        background-size: cover;
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      a{
        display: inline-block;
        margin-top: 54px;
        color: fade(#D8D8D8, 50);
        cursor: pointer;
        &.active, &:hover{
          color: #ffffff;
        }
      }
    }
    .content{
      flex: 1;
      height: 100%;
      margin-left: 20px;
    }
  }
</style>
