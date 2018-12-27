<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/gauge'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartGaugeList',
        data () {
            return {
                chart: null,
                demoData: [
                    { name: '电压', value: 220, unit: 'V', pos: ['16.6%', '25%'], range: [0, 400] },
                    { name: '电流', value: 32, unit: 'A', pos: ['49.8%', '25%'], range: [0, 60] },
                    { name: '功率因数', value: 0.9, pos: ['83%', '25%'], range: [0.1, 1.0], splitNum: 9 },
                    { name: '温度', value: 21, unit: '℃', pos: ['16.6%', '75%'], range: [-10, 60] },
                    { name: '湿度', value: 75, unit: '%RH', pos: ['49.8%', '75%'], range: [0, 100] },
                    { name: 'PM2.5', value: 13, unit: 'μg/m³', pos: ['83%', '75%'], range: [0, 100] }
                ]
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading({
                text: '加载中...',
                color: '#0ff',
                textColor: '#fff',
                maskColor: 'rgba(255, 255, 255, 0)'
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
                const highlight = '#03b7c9';
                that.chart.hideLoading()

                that.chart.setOption({
                    // backgroundColor: '#1b1b1b',
                    tooltip: {
                        formatter: '{a} <br/>{c} {b}'
                    },
                    series: (function() {
                        var result = [];

                        that.demoData.forEach(function(item) {
                            result.push(
                                // 外围刻度
                                {
                                    type: 'gauge',
                                    center: item.pos,
                                    radius: '33.33%',  // 1行3个
                                    splitNumber: item.splitNum || 10,
                                    min: item.range[0],
                                    max: item.range[1],
                                    startAngle: 225,
                                    endAngle: -45,
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            width: 2,
                                            shadowBlur: 0,
                                            color: [
                                                [1, highlight]
                                            ]
                                        }
                                    },
                                    axisTick: {
                                        show: true,
                                        lineStyle: {
                                            color: highlight,
                                            width: 1
                                        },
                                        length: -1,
                                        splitNumber: 10
                                    },
                                    splitLine: {
                                        show: true,
                                        length: -4,
                                        lineStyle: {
                                            color: highlight,
                                        }
                                    },
                                    axisLabel: {
                                        distance: -15,
                                        textStyle: {
                                            color: highlight,
                                            fontSize: 10,
                                            fontWeight: 'bold'
                                        }
                                    },
                                    pointer: {
                                        width: 5,
                                        show: 0
                                    },
                                    detail: {
                                        show: 0
                                    }
                                },

                                // 内侧指针、数值显示
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: item.pos,
                                    radius: '30.33%',
                                    startAngle: 225,
                                    endAngle: -45,
                                    min: item.range[0],
                                    max: item.range[1],
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            width: 2,
                                            color: [
                                                [1, 'rgba(255,255,255,.1)']
                                            ]
                                        }
                                    },
                                    axisTick: {
                                        show: 0,
                                    },
                                    splitLine: {
                                        show: 0,
                                    },
                                    axisLabel: {
                                        show: 0
                                    },
                                    pointer: {
                                        width: 3,
                                        show: true,
                                        length: '105%'
                                    },
                                    detail: {
                                        show: true,
                                        offsetCenter: [0, '110%'],
                                        textStyle: {
                                            fontSize: 11,
                                            color: '#fff'
                                        },
                                        formatter: [
                                            '{value} ' + (item.unit || ''),
                                            '{name|' + item.name + '}'
                                        ].join('\n'),
                                        rich: {
                                            name: {
                                                fontSize: 12,
                                                lineHeight: 24,
                                                color: '#ddd'
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: highlight,
                                        }
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                }
                            );
                        });

                        return result;
                    })()
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
