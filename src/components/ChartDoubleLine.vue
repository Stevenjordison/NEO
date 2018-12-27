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
            data: Array
        },
        watch: {
            data() {
                this.initChart()
            }
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
                    yAxis: [{
                        name: that.data[0].name,
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                    },{
                        name: that.data[1].name,
                        type: 'value',
                        splitLine: false,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                    }],
                    series: [
                        {
                            name: that.data[0].name,
                            type: 'line',
                            data: that.data[0].key,
                            color: '#4e83ff',
                            lineStyle: {
                                color: '#4e83ff'
                            },
                            label: {
                                formatter: '{b}{d}%',
                            }
                        }, {
                            name: that.data[1].name,
                            type: 'line',
                            data: that.data[1].key,
                            color: '#ffc508',
                            yAxisIndex: 1,
                            lineStyle: {
                                color: '#ffc508'
                            },
                            label: {
                                formatter: '{b}{d}%',
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
