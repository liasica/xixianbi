## Vue 组件

### s-btn

```

```

### choose

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

## Css 组件

### .bi-title

```html
<div class="bi-title" sty>当日公交上线情况</div>
```
