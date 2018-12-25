<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts-wordcloud'

    export default {
        name: 'ChartWordCloud',
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
            data: Array
        },
        methods: {
            initChart () {
                const that = this
                this.chart.hideLoading()

                let data = that.data.sort((a,b) => {return (b.value - a.value)}).map((item) => {
                    return {name: item.key, value: (item.value*100).toFixed(2)}
                })
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c}%'
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
                            type: 'wordCloud',
                            width: '100%',
                            height: '100%',
                            gridSize: 2,
                            sizeRange: [12, 50],
                            rotationRange: [0, 0],
                            shape: 'circle',
                            textStyle: {
                                normal: {
                                    color: function () {
                                        return 'rgb(' + [
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255)
                                        ].join(',') + ')';
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(255,255,255,.5)'
                                }
                            },
                            data: data,
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
