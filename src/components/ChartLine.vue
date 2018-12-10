<template>
    <div class="charts" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name: 'lineChart',
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.chart = echarts.init(this.$refs.chart)
            this.chart.showLoading()
        },
        methods: {
            initChart (data) {
                let xAxis = data.map((item) => item.createDate)
                let success = data.map((item) => item.successCount)
                let failure = data.map((item) => item.failureCount)
                let total = data.map((item) => item.successAmount)

                this.chart.hideLoading()

                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: { data: ['交易金额', '成功笔数', '失败笔数'] },
                    xAxis: {
                        data: xAxis,
                        axisLabel: {
                            formatter(data) {
                                return data.substr(5 - data.length)
                            }
                        }
                    },
                    yAxis: [
                        {
                            name: '金额(元)'
                        }, {
                            name: '笔数(笔)',
                            splitLine: { show: false }
                        }
                    ],
                    series: [{
                        name: '交易金额',
                        itemStyle: { color: '#4e83ff' },
                        type: 'line',
                        data: total
                    }, {
                        name: '失败笔数',
                        itemStyle: { color: '#f25e43' },
                        type: 'bar',
                        stack: 'amount',
                        yAxisIndex: 1,
                        data: failure,
                        barMaxWidth: 40
                    }, {
                        name: '成功笔数',
                        itemStyle: { color: '#64d572' },
                        type: 'bar',
                        stack: 'amount',
                        yAxisIndex: 1,
                        data: success,
                        barMaxWidth: 40
                    }]
                })

                this.chart.on('click', params => {
                    this.$emit('doClick', params.name)
                })
            }
        }
    }
</script>

<style scoped>
    .charts {
        width: 80%;
        height: 80%;
        margin: 0 auto;
    }
</style>
