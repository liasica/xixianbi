## Vue 组件

### `s-btn`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/s-btn.png)

-   `corner` 
    -   `string` 为`左上角`和`右下角`边角颜色
    -   `bool` 为`左上角`和`右下角`边角默认颜色为`#42dfff`
    -   `object`为四个角分别设置，格式为key=>value，例如`{leftTop: '#42dfff', leftBottom: '#42dfff', rightTop: '#42dfff', rightBottom: '#42dfff'}`
-   `bg-color` `string` 背景和边框颜色

```
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



### choose`

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



### progress-bar`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/progress-bar.png)

-   `label` `string` 名称(可为空)
-   `schedule` `number` 进度
-   `color` `string` 颜色

```html
<progress-bar label="通勤公交" :schedule="getRandomInt(100)" color="#3C77FF" />
```



### tie-number`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/tie-number.png)

-   `label` `string`
-   `number` `number` 变动数字

```html
<tie-number :number="getRandomInt(5000)" label="活跃车数" />
```



### `radial`

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

### `.bi-title`


![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/bi-title.png)

```html
<div class="bi-title">当日公交上线情况</div>
```



### `.thin-border` 0.5像素边框

- `&.border-top`
- `&.border-right`
- `&.border-bottom`
- `&.border-left`
- `&.border-around` 四边