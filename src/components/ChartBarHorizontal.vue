<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartBarHorizontal',
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
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()

                this.chart.setOption({
                    textStyle: {
                        color: '#fff',
                    },
                    color: ['#23cefe'],
                    tooltip : {
                        show:false
                    },
                    grid: {
                        height:'90%',
                        width:'60%',
                        left: '30%',
                        bottom: 'center'
                    },
                    xAxis: {
                        show:false,
                    },
                    yAxis: {
                        type: 'category',
                        axisLine:{
                            show:false,
                            lineStyle:{ //坐标轴的显示
                            }
                        },
                        inverse:true,
                        nameGap:"100",
                        data: ['景点名称','景点名称','景点名称','景点名称','景点名称','景点名称',],
                        axisLabel:{
                            textStyle:{
                                color: '#dce3f0'
                            },
                            width:"10",
                        },

                    },
                    series: [
                        {
                            name: '最多人数',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230],
                            barGap:'-100%',
                            barWidth:"4",
                            itemStyle: {
                                normal: {
                                    show:true,
                                    color: '#fbe157'
                                },
                                emphasis:{
                                    show:false
                                }
                            },

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
