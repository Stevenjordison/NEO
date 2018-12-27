<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/dashboard'
</style>

<template>
    <div class="app-page" id="dashboard-page">
        <el-row class="container" :gutter="12">
            <!--left-->
            <el-col :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>客户分析</h1>
                    </header>
                    <div class="content">
                        <ChartSexPie :agebin="agebin" :gender="gender" :color="colorMap.pie2"></ChartSexPie>
                    </div>
                </section>
                <!--学历分布-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>学历分布</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="edu" :color="colorMap.pie2" :interval=1200></ChartPie>
                    </div>
                </section>
                <!--有无小孩-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>有无小孩</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="kids" :color="colorMap.pie2" :interval=1200></ChartPie>
                    </div>
                </section>
                <!--人群偏好-->
                <section class="section-wrap" style="flex: 1">
                    <header class="title">
                        <h1>职业分布</h1>
                    </header>
                    <div class="content">
                        <ChartWordCloud :data="occupation"></ChartWordCloud>
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
                                <p class="num" style="color: #9d67f9;">{{customer.indoor}}</p>
                                <ChartLiquid :data="customerRose.indoor" :color="['#9d67f9', '#9259f5', '#b085fb']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼外客流</h1>
                            </header>
                            <div class="content">
                                <p class="num" style="color: #ff9cc0">{{customer.outdoor }}</p>
                                <ChartLiquid :data="customerRose.outdoor" :color="['#ff9cc0', '#fb74a5', '#ffc3d8']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>新客户</h1>
                            </header>
                            <div class="content">
                                <p class="num" style="color: #35ebd3">{{customer.new}}</p>
                                <ChartLiquid :data="customerRose.new" :color="['#35ebd3', '#1eead0', '#5af5e1']"></ChartLiquid>
                            </div>
                        </section>
                    </el-col>
                </el-row>

                <section class="section-wrap middle-content">
                    <header class="title">
                        <h1>客源分析</h1>
                    </header>
                    <div class="content">
                        <ChartMap :data="mapData"></ChartMap>
                    </div>
                </section>

                <el-row :gutter="12" class="middle-footer">
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼内客流分析</h1>
                            </header>
                            <div class="content">
                                <ChartBar :data="periodIn" :color="colorMap.rainbow"></ChartBar>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼外客流分析</h1>
                            </header>
                            <div class="content">
                                <ChartBar :data="period" :color="colorMap.rainbow"></ChartBar>
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
                        <ChartPie :data="newOld" :color="['#06ff02', '#ff5152']" :interval=1200></ChartPie>
                    </div>
                </section>
                <!--店内停留时间占比-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>店内停留时间占比</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="remainTime" :color="colorMap.pie1" :interval=1200></ChartPie>
                    </div>
                </section>
                <!--店内停留时间占比-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>应用分析</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="cellFactory" :color="colorMap.rainbow" :interval=1200></ChartPie>
                    </div>
                </section>
                <!--人群偏好-->
                <section class="section-wrap" style="flex: 1">
                    <header class="title">
                        <h1>人群偏好</h1>
                    </header>
                    <div class="content">
                        <ChartWordCloud :data="segment"></ChartWordCloud>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CustomerChart from '../components/CustomerChart'
    import ChartPie from '../components/ChartPie'
    import ChartSexPie from '../components/ChartSexPie'
    import ChartDoubleLine from '../components/ChartDoubleLine'
    import ChartBar from '../components/ChartBar'
    import ChartWordCloud from '../components/ChartWordCloud'
    import ChartLiquid from '../components/ChartLiquid'
    import ChartBarHorizontal from '../components/ChartBarHorizontal'
    import ChartMap from '../components/ChartMap'
    import { colorMap } from '../script/helper'

    export default {
        name: 'dashboard',
        data () {
            return {
                colorMap: colorMap
            }
        },
        computed: {
            ...mapState({
                customer: state => state.customer,
                customerRose: state => state.customerRose,

                // flowData
                periodIn: state => state.periodIn,
                period: state => state.period,
                newOld: state => state.newOld,
                remainTime: state => state.remainTime,

                // portraitData: null,
                edu: state => state.edu,
                kids: state => state.kids,
                occupation: state => state.occupation,
                agebin: state => state.agebin,
                gender: state => state.gender,
                segment: state => state.segment,
                cellFactory: state => state.cellFactory,

                mapData: state => state.mapData
            })
        },
        components: {
            ChartSexPie, CustomerChart, ChartMap, ChartPie, ChartBar, ChartDoubleLine, ChartWordCloud, ChartBarHorizontal, ChartLiquid
        }
    }
</script>
