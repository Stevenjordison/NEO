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
        name: 'HchartBar',
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

                let categories = data.map(item => item.clubName)
                let priceList = data.map(item => this.$moneyFilter(item.rewardAmount))
                let amountList = data.map(item => item.rewardCount)

                if (this.chart) {
                    this.chart.destroy()
                }

                let chartOptions = {
                    chart: { type: 'bar', height: this.$refs.chart.parentNode.parentNode.clientHeight },
                    credits: { enabled: false },
                    title: { text: null },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        x: 0,
                        y: -30,
                        float: true,
                        symbolRadius: 0
                    },
                    xAxis: {
                        categories: categories,
                        labels: { style: { fontSize: '12px' } }
                    },
                    yAxis: [{
                        min: 300,
                        title: { text: '打赏金额' }
                    }, {
                        title: { text: '打赏次数' },
                        opposite: true
                    }],
                    tooltip: {
                        enabled: true,
                        shared: true,
                        backgroundColor: 'rgba(255,255,255,.89)',
                        shadow: false,
                        useHTML: true,
                        headerFormat: '<p style="width: 100%;font-size: 13px; text-align: center;">{point.key}</p><br/>',
                        positioner: () => {
                            return {
                                x: 12,
                                y: 0
                            }
                        }
                    },
                    series: [{
                        name: '打赏金额',
                        data: priceList,
                        // enableMouseTracking: false,  //鼠标hover事件
                        tooltip: { valueSuffix: '元' },
                        color: '#4e83ff'
                        // dataLabels: {
                        //     color: '#c0d3ff',
                        //     enabled: false,
                        //     format: '{y} 元',
                        //     allowOverlap: true,
                        //     style: {fontSize: '12px', textOutline: 0}
                        // }
                    }, {
                        name: '打赏次数',
                        yAxis: 1,
                        data: amountList,
                        // enableMouseTracking: false,
                        tooltip: { valueSuffix: '笔' },
                        color: '#c0d3ff'
                        // dataLabels: {
                        //     color: '#4e83ff',
                        //     enabled: false,
                        //     format: '{y} 笔',
                        //     allowOverlap: true,
                        //     style: {fontSize: '12px', textOutline: 0}
                        // }
                    }]
                }
                this.chart = new Highcharts.Chart(this.$refs.chart, chartOptions)
                this.chartStatus = 1
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
