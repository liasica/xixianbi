## Vue 组件

### s-btn

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/s-btn.png)

-   `corner` 
    -   `string` 为`左上角`和`右下角`边角颜色
    -   `bool` 为`左上角`和`右下角`边角默认颜色为`#42dfff`
    -   `object`为四个角分别设置，格式为key=>value，例如`{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}`
-   `bg-color` `string` 背景和边框颜色

```html
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
```



### choose

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/choose.png)

```html
<choose class="choose" label="测试一下" :options="options" v-model="id" />
```

```javascript
export default {
    data() {
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
```



### progress-bar

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/progress-bar.png)

-   `label` `string` 名称(可为空)
-   `schedule` `[number, array]` 进度
    -   参数为number时为占比
    -   参数为array时进度为 arr[0] / arr[1]
-   `color` `string` 颜色

```html
<progress-bar label="通勤公交" :schedule="getRandomInt(100)" color="#3C77FF" />
```



### tie-number

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/tie-number.png)

-   `label` `string`
-   `number` `number` 变动数字

```html
<tie-number :number="getRandomInt(5000)" label="活跃车数" />
```



### radial

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/radial.png)

```html
<radial radial-id="radial3" :schedule="80" />
```



## bi-table

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/table.jpg)

```html
<bi-table :columns="columns" :source="source" />
```

```javascript
export default {
    data() {
        return {
            columns: [{ prop: 'id', label: '序号' }],
            source: [{ id: 1 }]
        }
    }
}
```



## pagination

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/pagination.jpg)

```html
<bi-pagination total="10" page.sync="1" @pagination="handleChange" />
```



## checkbox

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/checkbox.jpg)

```html
<bi-checkbox
    label="当日公交上线情况"
    :value.sync="value"
    @change="handleChange"
/>
```







## CSS 组件

### .bi-title


![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/bi-title.png)

```html
<div class="bi-title">当日公交上线情况</div>
```



### .thin-border  0.5像素边框

- `&.border-top`
- `&.border-right`
- `&.border-bottom`
- `&.border-left`
- `&.border-around` 四边



首页
- 当日公交上线情况 HomeOnline
- 当日车辆违规统计 HomeViolation
- 早高峰平均出车率 HomeWorkRate
- 车辆营收统计时间分布图 HomeRevenue
- 车辆运行能耗比较统计（日）HomeEnergy
- 当日车辆平均速度 HomeSpeed
- 当日营运里程  HomeMileage
- 当日完成班次数 HomeWorkTimes

综合管理
- 综合信息 complexInfo
- 车辆信息 complexCarInfo
- 运行数据 complexWorkInfo

场站管理
- 场站信息 stationInfo

机务管理
- 维修计划 maintenanceFixPlan
- 安全管理 maintenanceSafe

营运调度
- 车长信息 operationCarMaster
- 调度计划 operationDispatchPlan
- 排班计划 operationScheduPlan
- 营运分析 operationAnalyse

财务管理
- 财务分析 financeInfo

物资管理
- 物资入库 suppliesStock
  - 详细 suppliesDetail
- 物资调拨 suppliesAllocate

权限管理
- 角色管理 role
- 用户列表 user

系统管理
- 个人资料（不是表格）
- 操作日志 SystemOprationLog



TODO 组件
输入框
日期选择
时间选择