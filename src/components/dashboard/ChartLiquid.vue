<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts-liquidfill'
    import 'echarts/lib/component/title'

    export default {
        name: 'ChartLiquid',
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading({
                text: '加载中...',
                color: '#0ff',
                maskColor: 'rgba(255, 255, 255, 0)'
            })
            this.initChart()
        },
        props: {
            color: Array,
            data: Number
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
                    title: {
                        text: '日环比:',
                        textStyle: {
                            width: '100%',
                            color: '#fff',
                            align: 'center',
                            fontSize: 14
                        }
                    },
                    series: [{
                        type: 'liquidFill',
                        //data: [0.6, 0.5, 0.4, 0.3],
                        data: that.handleData(that.data),
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
                                color: '#f66',
                                insideColor: 'yellow',
                                fontSize: 30,
                                fontFamily: 'DIN-Medium'
                            }
                        },
                        // 内图 背景色 边
                        backgroundStyle: {
                            color: 'rgba(4,24,74,0.8)'
                        }
                    }]
                })
            },
            handleData (num) {
                const data = []
                for (let i = 1; i < 5; i++) {
                    let result = (num * (i / 4) / 100).toFixed(2)
                    data.push(result)
                }
                return data.reverse()
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
