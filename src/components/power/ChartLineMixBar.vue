<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'
    import {isDot} from '../../script/helper'

    export default {
        name: 'ChartLineMixBar',
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading()
        },
        props: {
            data: Array,
            color: String,
            unit: String
        },
        watch: {
            data () {
                this.initChart()
            }
        },
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()

                this.chart.setOption({
                    textStyle: {
                        color: '#fff'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    grid: {
                        top: 30,
                        bottom: 30,
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 10
                            },
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: [{
                        name: that.data[0].name,
                        type: 'value',
                        splitLine: {  // 网格线
                            // show: false
                            lineStyle: {
                                color: '#4a4a4a',
                                type: 'dotted'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 10
                            },
                            formatter (value, index) {
                                let result = value
                                if (value > 10000) {
                                    result = (value / 10000)
                                    isDot(value) && (value = value.toFixed(1))
                                    result += '万'
                                }
                                return result
                            }
                        }
                    }],
                    series: [
                        {
                            name: that.data[0].name,
                            type: 'line',
                            data: that.data[0].value,
                            color: that.color,
                            lineStyle: {
                                color: that.color
                            },
                            label: {
                                formatter: '{b}{d}%吨'
                            }
                        }, {
                            name: that.data[1].name,
                            type: 'bar',
                            stack: 'item',
                            color: '#0f8891',
                            data: that.data[1].value,
                            barCategoryGap: '50%'
                        }, {
                            name: that.data[2].name,
                            type: 'bar',
                            stack: 'item',
                            color: '#e1ffff',
                            data: that.data[2].value
                        }
                    ]
                })
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
