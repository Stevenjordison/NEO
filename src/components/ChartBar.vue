<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartBar',
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
            this.initChart()
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
                this.chart.hideLoading()

                this.chart.setOption({
                    textStyle: {
                        color: '#fff',
                    },
                    color: ['#23cefe'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 40,
                        bottom: 20,
                        left: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间',
                        data: that.data.map((item, index) => {return index}),
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
                        name: '人数',
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
                        }
                    },
                    series: [
                        {
                            name: '客流人数',
                            type: 'bar',
                            barWidth: '40%',
                            data: that.data
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
