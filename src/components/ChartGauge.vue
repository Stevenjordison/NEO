<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/gauge'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartGauge',
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
                that.chart.hideLoading()

                that.chart.setOption({
                    // backgroundColor: '#1b1b1b',
                    tooltip: {
                        formatter: '{a} <br/>{c} {b}'
                    },
                    series: [
                        // {
                        //     name: '停车位',
                        //     type: 'gauge',
                        //     min: 0,
                        //     max: that.data[0].total,
                        //     // splitNumber: that.data[0].total/6,
                        //     radius: '40%',
                        //     axisLine: {
                        //         lineStyle: {
                        //             color: [[0.3, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                        //             width: 2,
                        //             shadowColor: '#fff', //默认透明
                        //             shadowBlur: 10
                        //         }
                        //     },
                        //     axisLabel: {
                        //         textStyle: {
                        //             fontWeight: 'bolder',
                        //             fontSize: 10,
                        //             color: '#fff',
                        //             shadowColor: '#fff', //默认透明
                        //             shadowBlur: 5
                        //         }
                        //     },
                        //     axisTick: {
                        //         length: 5,
                        //         lineStyle: {
                        //             color: 'auto',
                        //             shadowColor: '#fff', //默认透明
                        //             shadowBlur: 10
                        //         }
                        //     },
                        //     splitLine: {
                        //         length: 8,
                        //         lineStyle: {
                        //             width: 2,
                        //             color: '#fff',
                        //             shadowColor: '#fff', //默认透明
                        //             shadowBlur: 10
                        //         }
                        //     },
                        //     pointer: {
                        //         width: 2,
                        //         shadowColor: '#fff', //默认透明
                        //         shadowBlur: 5
                        //     },
                        //     title: {
                        //         offsetCenter: [0, '-140%'],
                        //         textStyle: {
                        //             fontWeight: 'bolder',
                        //             fontStyle: 'italic',
                        //             color: '#fff',
                        //             shadowColor: '#fff', //默认透明
                        //             shadowBlur: 10
                        //         }
                        //     },
                        //     detail: {
                        //         shadowBlur: 5,
                        //         offsetCenter: [0, '130%'],
                        //         formatter(value) {
                        //             return `剩余车位${that.data[0].total - value}`
                        //         },
                        //         textStyle: {
                        //             fontWeight: 'bolder',
                        //             fontSize: 16,
                        //             color: '#fafafa'
                        //         }
                        //     },
                        //     data: [{ value: that.data[0].value, name: that.data[0].name }]
                        // },
                        {
                            name: '停车位',
                            type: 'gauge',
                            center: ['25%', '50%'],
                            radius: '40%',
                            min: 0,
                            max: that.data[1].total,
                            // splitNumber: that.data[1].total/10,
                            axisLine: {
                                lineStyle: {
                                    color: [[0.3, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                                    width: 2,
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontSize: 10,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisTick: {
                                length: 5,
                                lineStyle: {
                                    color: 'auto',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            splitLine: {
                                length: 8,
                                lineStyle: {
                                    width: 2,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            pointer: {
                                width: 2,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5
                            },
                            title: {
                                offsetCenter: [0, '-140%'],
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            detail: {
                                shadowBlur: 5,
                                offsetCenter: [0, '130%'],
                                formatter(value) {
                                    return `剩余车位${that.data[1].total - value}`
                                },
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontSize: 16,
                                    color: '#fafafa'
                                }
                            },
                            data: [{ value: that.data[1].value, name: that.data[1].name }]
                        },
                        {
                            name: '停车位',
                            type: 'gauge',
                            center: ['75%', '50%'],
                            radius: '40%',
                            min: 0,
                            max: that.data[2].total,
                            // splitNumber: that.data[2].total/10,
                            axisLine: {
                                lineStyle: {
                                    color: [[0.3, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                                    width: 2,
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontSize: 10,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisTick: {
                                length: 5,
                                lineStyle: {
                                    color: 'auto',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            splitLine: {
                                length: 8,
                                lineStyle: {
                                    width: 2,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 5
                                }
                            },
                            pointer: {
                                width: 2,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5
                            },
                            title: {
                                offsetCenter: [0, '-140%'],
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            detail: {
                                shadowBlur: 5,
                                offsetCenter: [0, '130%'],
                                formatter(value) {
                                    return `剩余车位${that.data[2].total - value}`
                                },
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontSize: 16,
                                    color: '#fafafa'
                                }
                            },
                            data: [{ value: that.data[2].value, name: that.data[2].name }]
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
