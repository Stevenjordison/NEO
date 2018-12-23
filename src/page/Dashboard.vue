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
                        <ChartSexPie :data="customerData" :color="colorMap.rainbow"></ChartSexPie>
                    </div>
                </section>
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>客户分析</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData.gender" :color="colorMap.rainbow"></ChartPie>
                    </div>
                </section>
                <!--客户分析-->
                <section class="section-wrap" style="flex: 1">
                    <header class="title">
                        <h1>客户分析</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="customerData.gender" :color="colorMap.rainbow"></ChartPie>
                    </div>
                </section>
            </el-col>

            <!--middle-->
            <el-col :span="12">
                <el-row :gutter="12">
                    <el-col :span="8">
                        <section class="section-wrap mb">
                            <header class="title">
                                <h1>楼内客流</h1>
                            </header>
                            <div class="content">
                                <p class="num">4384293</p>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>楼外客流</h1>
                            </header>
                            <div class="content">
                                <p class="num">4384293</p>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>新客户</h1>
                            </header>
                            <div class="content">
                                <p class="num">4384293</p>
                            </div>
                        </section>
                    </el-col>
                </el-row>

                <section class="section-wrap">
                    <header class="title">
                        <h1>路况情况</h1>
                    </header>
                    <div class="content">
                    </div>
                </section>
            </el-col>

            <!--right-->
            <el-col :span="6">
                <section class="section-wrap">
                    <header class="title">
                        <h1>用户打赏 Top10</h1>
                    </header>
                    <div class="content" ref="reward">
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
    import {customerData, colorMap} from '../script/helper'

    export default {
        name: 'dashboard',
        data () {
            return {
                customerData: customerData,
                colorMap: colorMap,
                leftHeight: null
            }
        },
        components: {
            ChartSexPie, CustomerChart, ChartPie
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
