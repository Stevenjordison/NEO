<template>
    <div>
        <div class="charts" v-show="chartStatus === 1" ref="chart"></div>
        <div class="charts-empty" v-show="chartStatus === 2">{{emptyText}}</div>
        <div class="charts-loading" v-show="chartStatus === 0"><i class="el-icon-loading"></i></div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highstock'
    import HighchartsMore from 'highcharts/highcharts-more'
    import HighchartsDrilldown from 'highcharts/modules/drilldown'
    import Highcharts3D from 'highcharts/highcharts-3d'
    import Highmaps from 'highcharts/modules/map'

    HighchartsMore(Highcharts)
    HighchartsDrilldown(Highcharts)
    Highcharts3D(Highcharts)
    Highmaps(Highcharts)

    export default {
        name: 'HchartAreaspline',
        data () {
            return {
                chart: null,
                chartStatus: 0 // 0:loading ,1: show, 2: empty
            }
        },
        props: {
            emptyText: {
                type: String,
                default: '暂无数据'
            }
        },
        methods: {
            initChart (data) {
                if (data.length === 0) {
                    this.chartStatus = 2
                    return
                }

                let categories = data.map(item => item.statMonth)
                let priceList = data.map(item => this.$moneyFilter(item.monthAmount))
                let amountList = data.map(item => item.monthCount)
                let drilldown = []
                let y1 = []
                let y2 = []

                for (let i = 0; i < 12; i++) {
                    drilldown.push({
                        name: '交易金额',
                        id: categories[i] + 'amount',
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, 'rgba(78,131,255,.8)'],
                                [1, 'rgba(78,131,255,0)']
                            ]
                        },
                        data: this.randomList(1000000, 30)
                    })

                    drilldown.push({
                        name: '支付笔数',
                        yAxis: 1,
                        id: categories[i] + 'count',
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, 'rgba(255,197,8,.8)'],
                                [1, 'rgba(255,197,8,0)']
                            ]
                        },
                        data: this.randomList(10000, 30)
                    })

                    y1.push({
                        drilldown: categories[i] + 'amount',
                        name: categories[i],
                        y: priceList[i]
                    })

                    y2.push({
                        drilldown: categories[i] + 'count',
                        name: categories[i],
                        y: amountList[i]
                    })
                }

                if (this.chart) {
                    this.chart.destroy()
                }
                let chartOptions = {
                    chart: { type: 'areaspline', spacingTop: 35 },
                    lang: {
                        drillUpText: '<< 返回'
                    },
                    credits: { enabled: false },
                    title: { text: null },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        x: 0,
                        y: -40,
                        floating: true,
                        symbolRadius: 0
                    },
                    xAxis: {
                        type: 'category'
                        // categories: categories
                    },
                    yAxis: [{
                        title: { text: '交易金额' }
                    }, {
                        title: { text: '支付笔数' },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true, // 两条线共用一个tooltip
                        borderWidth: 0,
                        backgroundColor: 'rgba(255,255,255,.89)',
                        shadow: false,
                        useHTML: true,
                        headerFormat: '<p style="width: 100%;font-size: 13px; line-height: 1; text-align: center;">{point.key}</p><br/>'
                    },
                    plotOptions: {
                        areaspline: { lineWidth: 1 }, // 线的宽度
                        series: {
                            marker: { // 线上的标记
                                enabled: false, // 默认不显示，hover的时候才显示
                                symbol: 'circle',
                                fillColor: '#fff',
                                lineWidth: 2,
                                states: { hover: { lineWidth: 2, radius: 4 } }
                            }
                        }
                    },
                    drilldown: {
                        series: drilldown
                    },
                    series: [{
                        name: '支付金额',
                        data: y1,
                        marker: { lineColor: '#4e83ff' },
                        color: '#4e83ff',
                        lineColor: '#4e83ff',
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, 'rgba(78,131,255,.8)'],
                                [1, 'rgba(78,131,255,0)']
                            ]
                        },
                        tooltip: { valueSuffix: '元' },
                        states: { hover: { halo: { size: 5 } } } // line-hover
                    }, {
                        name: '订单数',
                        data: y2,
                        yAxis: 1,
                        color: '#ffc508',
                        lineColor: '#ffc508',
                        marker: { lineColor: '#ffc508' },
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, 'rgba(255,197,8,.8)'],
                                [1, 'rgba(255,197,8,0)']
                            ]
                        },
                        tooltip: { valueSuffix: '笔' },
                        states: { hover: { halo: { size: 5 } } } // line-hover
                    }]
                }
                this.chart = new Highcharts.Chart(this.$refs.chart, chartOptions)
                this.chartStatus = 1
            },
            randomList (num, length, integer) {
                let arr = []
                let i = 0
                while (i < length) {
                    arr.push([`${i + 1}号`, integer ? Number((parseInt(Math.random() * num))) : Number((Math.random() * num).toFixed(2))])
                    i++
                }
                return arr
            }
        }
    }
</script>

<style scoped>
    .charts-empty, .charts-loading {
        text-align: center;
        margin-top: 20px;
    }
</style>
