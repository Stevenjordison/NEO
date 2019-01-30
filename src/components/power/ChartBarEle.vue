<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'
    import {isDot} from '../../script/helper'

    export default {
        name: 'ChartBarEle',
        data () {
            return {
                chart: null,
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading({
                text: '加载中...',
                color: '#0ff',
                textColor: '#fff',
                maskColor: 'rgba(255, 255, 255, 0)',
            })
        },
        props: {
            title: String,
            data: Array,
            color: Array
        },
        watch: {
            data() {
                this.initChart()
            }
        },
        methods: {
            initChart () {
                const that = this
                console.log(that.data)
                this.chart.hideLoading()

                this.chart.setOption({
                    textStyle: {
                        color: '#fff',
                    },
                    color: that.color,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 30,
                        bottom: 30,
                    },
                    xAxis: {
                        type: 'category',
                        name: '月',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },

                    },
                    yAxis: {
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
                    },
                    series: [
                        {
                            name: that.data[0].name,
                            type: 'bar',
                            data: that.data[0].value
                        }, {
                            name: that.data[1].name,
                            type: 'bar',
                            data: that.data[1].value
                        }, {
                            name: that.data[2].name,
                            type: 'bar',
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
