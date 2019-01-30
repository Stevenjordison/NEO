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
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading()
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
                this.chart.hideLoading()

                this.chart.setOption({
                    color: that.color,
                    textStyle: {
                        color: '#fff'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    xAxis: {
                        name: '月',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: [{
                        name: that.data[0].name,
                        type: 'value',
                        // min(value) {
                        //     return value.min;
                        // },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }, {
                        name: that.data[1].name,
                        type: 'value',
                        // min(value) {
                        //     return value.min;
                        // },
                        splitLine: false,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }],
                    series: [
                        {
                            name: that.data[0].name,
                            type: 'line',
                            data: that.data[0].value,
                            color: '#4e83ff',
                            lineStyle: {
                                color: '#4e83ff'
                            },
                            label: {
                                formatter: '{b}{d}%吨'
                            }
                        }, {
                            name: that.data[1].name,
                            type: 'line',
                            data: that.data[1].value,
                            color: '#ffc508',
                            yAxisIndex: 1,
                            lineStyle: {
                                color: '#ffc508'
                            },
                            label: {
                                formatter: '{b}{d}%度'
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
