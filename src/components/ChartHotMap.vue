<template>
    <div class="charts" ref="chartMap"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import { styleJson } from '../script/helper'
    import 'echarts/extension/bmap/bmap'
    import 'echarts/lib/chart/heatmap'
    import 'echarts/lib/component/visualMap'

    export default {
        name: 'ChartHotMap',
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chartMap)
            this.chart.showLoading({
                text: '加载中...',
                color: '#0ff',
                textColor: '#fff',
                maskColor: 'rgba(255, 255, 255, 0)'
            })
            this.initChart()
        },
        props: {
            data: Array
        },
        watch: {
            data () {
                this.initChart()
            }
        },
        methods: {
            initChart () {
                const that = this
                if (that.data.length === 0) return
                that.chart.hideLoading()
                that.chart.setOption({
                    bmap: {
                        center: [114.04593607185, 22.566723556272],
                        zoom: 12,
                        roam: true
                    },
                    visualMap: {
                        show: false,
                        top: 'top',
                        min: 0,
                        max: 5,
                        seriesIndex: 0,
                        calculable: true,
                        inRange: {
                            color: ['blue', 'blue', 'green', 'yellow', 'red']
                        }
                    },
                    series: [{
                        type: 'heatmap',
                        coordinateSystem: 'bmap',
                        data: that.data,
                        pointSize: 5,
                        blurSize: 6
                    }]
                })
                const bmap = that.chart.getModel().getComponent('bmap').getBMap()
                bmap.addControl(new BMap.MapTypeControl())
                // bmap.setMapStyle({ style: 'midnight' })
            }
        }
    }
</script>

<style scoped>
    .charts {
        width: 100%;
        height: 100%;
    }
</style>
