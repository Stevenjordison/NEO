<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartPie',
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
            title: String,
            data: Array,
            color: Array
        },
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()
                this.chart.setOption({
                    color: that.color,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {d}%'
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: that.title,
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '50%'],
                            data: that.data.map((item) => {
                                return {name: item.key, value: item.value.toFixed(2)}
                            }),
                            label: {
                                formatter: '{b}{d}%',
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200
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
