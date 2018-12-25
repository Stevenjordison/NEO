<!-- 首页 Created by joey-mini on 2018/7/26-->
<style lang="sass">
    @import '../scss/dashboard'
</style>

<template>
    <div class="app-page" id="dashboard-page">
        <el-row class="main" :gutter="12">
            <!--left-->
            <el-col :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>客户分析</h1>
                    </header>
                    <div class="content">
                        <ChartSexPie :data="customerData" :color="colorMap.pie2"></ChartSexPie>
                    </div>
                </section>
                <!--学历分布-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>学历分布</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData.edu.datas" :color="colorMap.pie2"></ChartPie>
                    </div>
                </section>
                <!--有无小孩-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>有无小孩</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData.kids.datas" :color="colorMap.pie2"></ChartPie>
                    </div>
                </section>
                <!--人群偏好-->
                <section class="section-wrap" style="flex: 1">
                    <header class="title">
                        <h1>职业分布</h1>
                    </header>
                    <div class="content">
                        <ChartWorlCloud :data="customerData.occupation.datas"></ChartWorlCloud>
                    </div>
                </section>
            </el-col>

            <!--middle-->
            <el-col :span="12" class="middle">
                <el-row :gutter="12" class="middle-title">
                    <el-col :span="8">
                        <section class="section-wrap mb">
                            <header class="title">
                                <h1>楼内客流</h1>
                            </header>
                            <div class="content">
                                <p class="num" style="color: #9d67f9;">4384293</p>
                                <ChartLiquid :color="['#9d67f9', '#9259f5', '#b085fb']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼外客流</h1>
                            </header>
                            <div class="content">
                                <p class="num" style="color: #ff9cc0">4384293</p>
                                <ChartLiquid :color="['#ff9cc0', '#fb74a5', '#ffc3d8']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>新客户</h1>
                            </header>
                            <div class="content">
                                <p class="num" style="color: #35ebd3">4384293</p>
                                <ChartLiquid :color="['#35ebd3', '#1eead0', '#5af5e1']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                </el-row>

                <section class="section-wrap middle-content">
                    <header class="title">
                        <h1>客源分析</h1>
                    </header>
                    <div class="content">
                        <ChartMap></ChartMap>
                    </div>
                </section>

                <el-row :gutter="12" class="middle-footer">
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼内客流分析</h1>
                            </header>
                            <div class="content">
                                <ChartBar :data="doubleLine.period_in" :color="colorMap.rainbow"></ChartBar>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼外客流分析</h1>
                            </header>
                            <div class="content">
                                <ChartBar :data="doubleLine.period" :color="colorMap.rainbow"></ChartBar>
                            </div>
                        </section>
                    </el-col>
                </el-row>
            </el-col>

            <!--right-->
            <el-col :span="6">
                <!--新老客户分析-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>新老客户分析</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData2.newold.data" :color="['#06ff02', '#ff5152']"></ChartPie>
                    </div>
                </section>
                <!--店内停留时间占比-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>店内停留时间占比</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData2.remain_time.data" :color="colorMap.pie1"></ChartPie>
                    </div>
                </section>
                <!--店内停留时间占比-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>应用分析</h1>
                    </header>
                    <div class="content">
                        <ChartBarHorizontal :data="customerData.gender.datas"></ChartBarHorizontal>
                    </div>
                </section>
                <!--人群偏好-->
                <section class="section-wrap" style="flex: 1">
                    <header class="title">
                        <h1>人群偏好</h1>
                    </header>
                    <div class="content">
                        <ChartWorlCloud :data="customerData.segment.datas"></ChartWorlCloud>
                    </div>
                </section>
            </el-col>
        </el-row>
        <!--<footer class="customer">-->
        <!--<section class="section-wrap">-->
        <!--<header class="title">-->
        <!--<h1>用户画像</h1>-->
        <!--</header>-->
        <!--<div class="content">-->
        <!--<CustomerChart></CustomerChart>-->
        <!--</div>-->
        <!--</section>-->
        <!--</footer>-->
    </div>
</template>

<script>
    import CustomerChart from '../components/CustomerChart'
    import ChartPie from '../components/ChartPie'
    import ChartSexPie from '../components/ChartSexPie'
    import ChartDoubleLine from '../components/ChartDoubleLine'
    import ChartBar from '../components/ChartBar'
    import ChartWorlCloud from '../components/ChartWorlCloud'
    import ChartLiquid from '../components/ChartLiquid'
    import ChartBarHorizontal from '../components/ChartBarHorizontal'
    import ChartMap from '../components/ChartMap'
    import { customerData, customerData2, colorMap } from '../script/helper'

    export default {
        name: 'dashboard',
        data () {
            return {
                customerData: customerData,
                customerData2: customerData2,
                colorMap: colorMap,
                leftHeight: null,
                doubleLine: {
                    'period': [85, 76, 63, 42, 41, 50, 112, 238, 418, 630, 1075, 1314, 1409, 1386, 1357, 1393, 1478, 1622, 1585, 1541, 1298, 978, 475, 218],
                    'period_in': [46, 44, 31, 26, 24, 24, 57, 116, 219, 420, 768, 984, 996, 1009, 984, 1020, 1099, 1245, 1215, 1172, 980, 728, 307, 134]
                },
                yearData: [{ name: 1, flow_count: 3194448 }, { name: 2, flow_count: 5840293 }, { name: 3, flow_count: 5808190 }, { name: 4, flow_count: 7352400 }, { name: 5, flow_count: 7079651 }, { name: 6, flow_count: 3909049 }, { name: 7, flow_count: 1152680 }, { name: 8, flow_count: 1373210 }, { name: 9, flow_count: 1001126 }, { name: 10, flow_count: 1384469 }, { name: 11, flow_count: 774199 }, { name: 12, flow_count: 469180 }
                ]

            }
        },
        components: {
            ChartSexPie, CustomerChart, ChartMap, ChartPie, ChartBar, ChartDoubleLine, ChartWorlCloud, ChartBarHorizontal, ChartLiquid
        },
        methods: {
            setChart (id, data) {
                this.$nextTick(() => {
                    this.$refs[id].initChart(data)
                })
            },
            initLeftTable () {
                const that = this
                this.$nextTick(() => {
                    that.leftHeight = that.$refs.leftTable.clientHeight - 32
                })
            },
            random (num, integer) {
                return integer ? Number((parseInt(Math.random() * num))) : Number((Math.random() * num).toFixed(2))
            },
            randomList (num, length, integer) {
                let arr = []
                let i = 0
                while (i < length) {
                    arr.push([`${i + 1}月`, integer ? Number((parseInt(Math.random() * num))) : Number((Math.random() * num).toFixed(2))])
                    i++
                }
                return arr
            }
        }
    }
</script>
