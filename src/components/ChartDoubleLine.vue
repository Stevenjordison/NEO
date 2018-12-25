<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartDoubleLine',
        data () {
            return {
                chart: null,
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading()
            this.initChart()
        },
        props: {
            data: Object, Array,
            color: Array
        },
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()

                this.chart.setOption({
                    color: that.color,
                    textStyle: {
                        color: '#fff'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                        }
                    },
                    legend: {
                        data: [{
                            name: '店内人数',
                            textStyle: {
                                color: '#4e83ff'
                            }
                        }, {
                            name: '店外人数',
                            textStyle: {
                                color: '#ffc508'
                            }
                        }]
                    },
                    xAxis: {
                        name: '时间(小时)',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                    },
                    yAxis: {
                        name: '客流量(人)',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        boundaryGap: false
                    },
                    series: [
                        {
                            name: '店内人数',
                            type: 'line',
                            data: that.data.period_in,
                            // areaStyle: {
                            //     color: {
                            //         x: 0,
                            //         y: 0,
                            //         x2: 0,
                            //         y2: 1,
                            //         colorStops: [{
                            //             offset: 0, color: 'rgba(78,131,255,1)' // 0% 处的颜色
                            //         }, {
                            //             offset: 1, color: 'rgba(78,131,255,.3)' // 100% 处的颜色
                            //         }]
                            //     }
                            // },
                            color: '#4e83ff',
                            lineStyle: {
                                color: '#4e83ff'
                            },
                            label: {
                                formatter: '{b}{d}%',
                                color: that.color[0]
                            }
                        }, {
                            name: '店外人数',
                            type: 'line',
                            data: that.data.period,
                            // areaStyle: {
                            //     color: {
                            //         x: 0,
                            //         y: 0,
                            //         x2: 0,
                            //         y2: 1,
                            //         colorStops: [{
                            //             offset: 0, color: 'rgba(225,197,8,1)' // 0% 处的颜色
                            //         }, {
                            //             offset: 1, color: 'rgba(225,197,8,.3)' // 100% 处的颜色
                            //         }]
                            //     }
                            // },
                            color: '#ffc508',
                            lineStyle: {
                                color: '#ffc508'
                            },
                            label: {
                                formatter: '{b}{d}%',
                                color: that.color[0]
                            }
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
