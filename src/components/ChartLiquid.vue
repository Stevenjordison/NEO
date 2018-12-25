<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts-liquidfill'

    export default {
        name: 'ChartLiquid',
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading()
            this.initChart()
        },
        props: {
            color: Array
        },
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()

                this.chart.setOption({
                    series: [{
                        type: 'liquidFill',
                        //data: [0.6, 0.5, 0.4, 0.3],
                        data: [0.54, 0.5, 0.4, 0.3],
                        radius: '90%',
                        // 水球颜色
                        color: that.color,
                        center: ['50%', '50%'],
                        // outline  外边
                        outline: {
                            // show: false
                            borderDistance: 5,
                            itemStyle: {
                                borderWidth: 5,
                                borderColor: that.color[0]
                            }
                        },
                        label: {
                            normal: {
                                // textStyle: {
                                color: 'red',
                                insideColor: 'yellow',
                                fontSize: 30
                                // }
                            }
                        },
                        // 内图 背景色 边
                        backgroundStyle: {
                            color: 'rgba(4,24,74,0.8)'
                            // borderWidth: 5,
                            // borderColor: 'red',
                        }
                    }]
                })
            }
        }
    }
</script>

<style scoped>
    .charts {
        width: 100%;
        height: 120px;
    }
</style>
