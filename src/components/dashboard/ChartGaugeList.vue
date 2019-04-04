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
                dataList: []
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
            this.queryData()
        },
        props: {
            title: String,
            color: Array
        },
        methods: {
            initChart () {
                const that = this
                const highlight = '#03b7c9'
                that.chart.hideLoading()

                that.chart.setOption({
                    // backgroundColor: '#1b1b1b',
                    tooltip: {
                        formatter: '{a} <br/>{c} {b}'
                    },
                    series: (function () {
                        var result = []

                        that.dataList.forEach(function (item) {
                            result.push(
                                // 外围刻度
                                {
                                    type: 'gauge',
                                    center: item.pos,
                                    radius: '50%',
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
                                            color: highlight
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
                                    radius: '45%',
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
                                        show: 0
                                    },
                                    splitLine: {
                                        show: 0
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
                                            color: highlight
                                        }
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                }
                            )
                        })

                        return result
                    })()
                })
            },
            queryData () {
                const that = this
                that.$axios({
                    url: 'data/aosien',
                    method: 'post',
                    data: {
                        'SN': 'MjAxOTAzMTU2MDAwMDAwMQ==',
                        'CMD': 'GetData'
                    }
                }).then(res => {
                    const data = res.Data
                    console.log('PM2.5设备数据', data)
                    that.dataList = [
                        { name: '温度', value: data.Temperature.toFixed(0), unit: '℃', pos: ['16.6%', '50%'], range: [-10, 60] },
                        { name: '湿度', value: data.Humidity.toFixed(0), unit: '%RH', pos: ['49.8%', '50%'], range: [0, 100] },
                        { name: 'PM2.5', value: data.PM25.toFixed(0), unit: 'μg/m³', pos: ['83%', '50%'], range: [0, 100] }
                    ]
                    that.initChart()
                }, err => {
                    console.log(err)
                    that.$message.error('环境监测数据请求失败')
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
