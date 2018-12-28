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
            this.chart.showLoading({
                text: '加载中...',
                color: '#0ff',
                textColor: '#fff',
                maskColor: 'rgba(255, 255, 255, 0)',
            })
            this.initChart()
        },
        watch: {
            data() {
                this.initChart()
            }
        },
        props: {
            title: String,
            data: Array,
            color: Array,
            interval: Number
        },
        methods: {
            initChart () {
                const that = this
                that.chart.hideLoading()
                that.chart.setOption({
                    color: that.color,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {d}%'
                    },
                    series: [
                        {
                            name: that.title,
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '50%'],
                            data: that.data.map((item) => {
                                return {name: item.key || item.name, value: item.value.toFixed(2)}
                            }),
                            label: {
                                formatter: '{b}：{d}%',
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200
                            }
                        }
                    ]
                })
                let app = {};
                app.currentIndex = -1;
                setInterval(function () {
                    let dataLen = that.data.length;
                    // 取消之前高亮的图形
                    that.chart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: app.currentIndex
                    });
                    app.currentIndex = (app.currentIndex + 1) % dataLen;
                    // 高亮当前图形
                    that.chart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: app.currentIndex
                    });
                }, that.interval);
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
