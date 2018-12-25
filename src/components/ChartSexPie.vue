<template>
    <div class="charts">
        <div class="left">
            <div class="item" ref="avatar1">13</div>
            <div class="item" ref="avatar2">23</div>
        </div>
        <div class="right">
            <ChartPie :data="data.agebin.datas" :color="color" title="年龄"></ChartPie>
        </div>
    </div>
</template>

<script>
    import ChartPie from './ChartPie'
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pictorialBar'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartSexPie',
        components: {
            ChartPie
        },
        data () {
            return {
                avatar1: null,
                avatar2: null,
                pie: null,
                xAxis: {
                    data: ['a'],
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {show: false}
                },
                yAxis: {
                    min: 0,
                    max: 150,
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    splitLine: {show: false}
                },
                legend: {
                    width: '100%',
                    height: '100%'
                }
            }
        },
        mounted () {
            this.avatar1 = echarts.init(this.$refs.avatar1)
            this.avatar2 = echarts.init(this.$refs.avatar2)
            this.initChart()
        },
        props: {
            data: Object, Array,
            color: Array
        },
        methods: {
            initChart () {
                const that = this
                this.avatar1.setOption(that.optionChart1())
                this.avatar2.setOption(that.optionChart2())
            },
            optionChart1(){
                const that = this
                let data = that.data.gender.datas[0]
                let ratio=(data.value*100).toFixed(2);

                return {
                    xAxis: that.xAxis,
                    yAxis: that.yAxis,
                    color: ['#606eff'],
                    grid: {
                        left: 0,
                        right: 0,
                        top: '20%',
                        bottom: '30%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {d}%'
                    },

                    series: [
                        {
                            name: data.key,
                            type: 'pictorialBar',
                            symbolClip: true,
                            symbolBoundingData: 150,
                            barWidth: '25%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom',
                                    formatter: ratio+'%',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                }
                            },
                            data: [
                                {
                                    value: 150,
                                    symbol: 'path://M804.571 402.286v237.714q0 22.857-16 38.857t-38.857 16-38.857-16-16-38.857v-201.143h-36.571v521.143q0 26.286-18.857 45.143t-45.143 18.857-45.143-18.857-18.857-45.143v-265.143h-36.571v265.143q0 26.286-18.857 45.143t-45.143 18.857-45.143-18.857-18.857-45.143v-521.143h-36.571v201.143q0 22.857-16 38.857t-38.857 16-38.857-16-16-38.857v-237.714q0-45.714 32-77.714t77.714-32h365.714q45.714 0 77.714 32t32 77.714zM640 146.286q0 53.143-37.429 90.571t-90.571 37.429-90.571-37.429-37.429-90.571 37.429-90.571 90.571-37.429 90.571 37.429 37.429 90.571z'
                                }
                            ]
                        }
                    ]
                }
            },
            optionChart2(sex){
                const that = this
                let data = that.data.gender.datas[1]
                let ratio=(data.value*100).toFixed(2);

                return {
                    xAxis: that.xAxis,
                    yAxis: that.yAxis,
                    color: ['#cc5eff'],
                    grid: {
                        left: 0,
                        right: 0,
                        top: '10%',
                        bottom: '35%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: `${data.key} ：${ratio}%`,
                        position: ['65%', '30%']
                    },
                    series: [
                        {
                            name: data.key,
                            type: 'pictorialBar',
                            symbolClip: true,
                            symbolBoundingData: 150,
                            barWidth: '30%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom',
                                    formatter: ratio+'%',
                                    textStyle: {
                                        fontSize: 14
                                    }
                                }
                            },
                            data: [
                                {
                                    value: 150,
                                    symbol: 'path://M877.714286 603.428571q0 22.857143-16 38.857143t-38.857143 16q-29.142857 0-45.714286-24.571429l-129.714286-194.857143-25.714286 0 0 75.428571 141.142857 234.857143q5.142857 8.571429 5.142857 18.857143 0 14.857143-10.857143 25.714286t-25.714286 10.857143l-109.714286 0 0 155.428571q0 26.285714-18.857143 45.142857t-45.142857 18.857143l-91.428571 0q-26.285714 0-45.142857-18.857143t-18.857143-45.142857l0-155.428571-109.714286 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286q0-10.285714 5.142857-18.857143l141.142857-234.857143 0-75.428571-25.714286 0-129.714286 194.857143q-16.571429 24.571429-45.714286 24.571429-22.857143 0-38.857143-16t-16-38.857143q0-16.571429 9.142857-30.285714l146.285714-219.428571q41.714286-61.142857 100.571429-61.142857l219.428571 0q58.857143 0 100.571429 61.142857l146.285714 219.428571q9.142857 13.714286 9.142857 30.285714zm-237.714286-457.142857q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .charts {
        width: 100%;
        height: 100%;
        >div {
            float: left;
            height: 100%;
        }
        .left{
            width: 20%;
            .item{
                height: 50%;
            }
        }
        .right{
            width: 80%;
        }
    }
</style>
