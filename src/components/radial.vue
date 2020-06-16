<template>
    <div :id="radialId" class="circle-progress"></div>
</template>

<script>
import { CircleProgress } from '@/plugins/circle-progress'

export default {
    props: {
        schedule: { type: Number, required: true },
        radialId: { type: String, required: true }
    },
    data () {
        return {
            progress: null
        }
    },
    mounted () {
        this.progress = new CircleProgress(`#${this.radialId}`, {
            max: 100,
            value: this.schedule,
            textFormat: 'percent'
        })
    }
}
</script>
