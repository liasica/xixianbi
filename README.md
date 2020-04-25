## Vue 组件

### `s-btn`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/s-btn.png)

-   `corner` `string` 携带为左上角右下角边角颜色
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

### `choose`

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

### `progress-bar`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/progress-bar.png)

-   `label` `string` 名称(可为空)
-   `schedule` `number` 进度
-   `color` `string` 颜色

```html
<progress-bar label="通勤公交" :schedule="getRandomInt(100)" color="#3C77FF" />
```

### `tie-number`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/tie-number.png)

-   `label` `string`
-   `number` `number` 变动数字

```html
<tie-number :number="getRandomInt(5000)" label="活跃车数" />
```

## CSS 组件

### `.bi-title`

![preview](https://github.com/liasica/xixianbi/blob/master/extra-images/bi-title.png)

```html
<div class="bi-title" sty>当日公交上线情况</div>
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
