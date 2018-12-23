<template>
    <div class="charts">
        <div class="left">
            <div class="item" ref="avatar1">13</div>
            <div class="item" ref="avatar2">23</div>
        </div>
        <div class="right" ref="pie">32</div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pictorialBar'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'ChartSexPie',
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
            this.pie = echarts.init(this.$refs.pie)
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
                console.log(that.optionChart1())

                this.avatar2.setOption(that.optionChart2())
                // this.pie.setOption(that.optionChart3())
            },
            optionChart1(){
                const that = this
                let data = that.data.gender.datas[0]
                let ratio=(data.value*100).toFixed(2);

                return {
                    xAxis: that.xAxis,
                    yAxis: that.yAxis,
                    color: ['#f7d44a'],
                    legend: that.legend,
                    grid: {
                        left: 0,
                        right: 0,
                        top: '20%',
                        bottom: '30%'
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
                    color: ['#f92366'],
                    legend: that.legend,
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
                                    symbol: 'path://M757.479452 265.145863c35.433205 0 65.613151-12.470356 90.574904-37.425096 24.961753-24.95474 37.425096-55.148712 37.425096-90.574904 0-35.433205-12.463342-65.613151-37.425096-90.574904-24.961753-24.947726-55.148712-37.425096-90.574904-37.425096-35.433205 0-65.627178 12.470356-90.574904 37.425096s-37.425096 55.141699-37.425096 90.574904c0 35.433205 12.470356 65.627178 37.425096 90.574904C691.859288 252.668493 722.046247 265.145863 757.479452 265.145863z" p-id="2930"></path><path d="M1114.048877 563.999562l-146.277699-219.430575c-27.809315-40.763616-61.327781-61.145425-100.576438-61.145425L647.764164 283.423562c-39.23463 0-72.76011 20.381808-100.569425 61.145425L400.910027 563.999562c-6.094904 9.138849-9.145863 19.238575-9.145863 30.285151 0 15.233753 5.330411 28.195068 15.998247 38.848877 10.667836 10.667836 23.622137 15.998247 38.85589 15.998247 19.427945 0 34.668712-8.192 45.715288-24.568986L622.044932 429.708274l25.719233 0 0 75.425315-141.143671 234.853699c-3.429699 5.709151-5.141041 11.993425-5.141041 18.852822 0 9.910356 3.619068 18.474082 10.857205 25.719233 7.238137 7.231123 15.808877 10.850192 25.712219 10.850192l109.708274 0 0 155.430575c0 17.527233 6.27726 32.57863 18.852822 45.147178s27.619945 18.852822 45.147178 18.852822l91.423562 0c17.534247 0 32.585644-6.284274 45.154192-18.852822 12.568548-12.575562 18.852822-27.619945 18.852822-45.147178l0-155.430575 109.722301 0c9.903342 0 18.474082-3.619068 25.712219-10.850192 7.238137-7.245151 10.857205-15.808877 10.857205-25.719233 0-6.859397-1.711342-13.143671-5.134027-18.852822l-141.150685-234.853699L867.19474 429.708274l25.726247 0 129.711342 194.861589c11.046575 16.376986 26.280329 24.568986 45.722301 24.568986 15.233753 0 28.181041-5.330411 38.841863-15.998247 10.667836-10.660822 15.998247-23.615123 15.998247-38.848877C1123.19474 583.238137 1120.150795 573.145425 1114.048877 563.999562z'
                                }
                            ]
                        }
                    ]
                }
            },
            optionChart3() {
                const that = this
                return {
                    color: ['#0fdbe0', '#15abbe', '#0f8891', '#145866', '#093138'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} ({d}%)"
                    },
                    legend: legend,
                    series: [
                        {
                            name: '年龄',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter: "{b}\n({d}%)",
                                    textStyle: {
                                        color: '#19e3e9'
                                    },
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: '#0f8891',
                                        width: 1,
                                        type: 'solid'
                                    },
                                    length: 15,
                                    show: true
                                }
                            },
                            data: that.data.agebin
                        }
                    ]
                };
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
