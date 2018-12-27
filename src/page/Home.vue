<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/home'
</style>

<template>
    <div class="app-page" id="home-page">
        <div class="header">
            绿景智慧办公系统4.0
        </div>

        <el-row class="container">
            <el-col class="left" :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 0 0 30%">
                    <header class="title">
                        <h1>大数据</h1>
                    </header>
                    <div class="content" @click="doRouter('dashboard')">
                        <ChartSexPie :agebin="agebin" :gender="gender" :color="colorMap.pie2"></ChartSexPie>
                    </div>
                </section>
                <!--报事报修-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>2018年第四季度报事报修统计</h1>
                    </header>
                    <div class="content text-content">
                        <p><i class="icon icon-service"></i>客诉：61次</p>
                        <p><i class="icon icon-fix"></i>维修：512次</p>
                    </div>
                </section>
                <!--车流分析-->
                <section class="section-wrap mb" style="flex: 0 0 40%">
                    <header class="title">
                        <h1>车流数据</h1>
                    </header>
                    <div class="content">
                        <ChartGauge :data="carData"></ChartGauge>
                    </div>
                </section>
            </el-col>
            <el-col class="center" :span="12"></el-col>
            <el-col class="right" :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 0 0 30%">
                    <header class="title">
                        <h1>能耗数据</h1>
                    </header>
                    <div class="content">
                        <ChartDoubleLine :data="power"></ChartDoubleLine>
                    </div>
                </section>
                <!--报事报修-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>环境质量</h1>
                    </header>
                    <div class="content">
                        <ChartGaugeList></ChartGaugeList>
                    </div>
                </section>
                <!--车流分析-->
                <section class="section-wrap mb" style="flex: 0 0 40%">
                    <header class="title">
                        <h1>实时道路监控</h1>
                    </header>
                    <div class="content img-box" style="padding: 12px;">
                        <img class="img" src="../assets/images/car.jpg" alt="">
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ChartSexPie from '../components/ChartSexPie'
    import ChartGauge from '../components/ChartGauge'
    import ChartDoubleLine from '../components/ChartDoubleLine'
    import ChartGaugeList from '../components/ChartGaugeList'
    import { colorMap } from '../script/helper'

    export default {
        name: 'home',
        data () {
            return {
                colorMap: colorMap,
                carData: [
                    {
                        name: '地面',
                        value: 50,
                        total: 220
                    },
                    {
                        name: '负一层',
                        value: 40,
                        total: 60
                    },
                    {
                        name: '负二层',
                        value: 38,
                        total: 60
                    }
                ],
                power: [
                    { name: '用水量', key: [85, 76, 63, 42, 41, 50, 112, 238, 418, 630, 1075, 1314, 1409, 1386, 1357, 1393, 1478, 1622, 1585, 1541, 1298, 978, 475, 218] },
                    { name: '用电量', key: [46, 44, 31, 26, 24, 24, 57, 116, 219, 420, 768, 984, 996, 1009, 984, 1020, 1099, 1245, 1215, 1172, 980, 728, 307, 134] }
                ],
            }
        },
        components: {
            ChartSexPie, ChartGauge, ChartDoubleLine,ChartGaugeList
        },
        computed: {
            ...mapState({
                agebin: state => state.agebin,
                gender: state => state.gender,
            })
        },
        methods: {
            doRouter(name) {
                this.$router.push({
                    name: name
                })
            }
        }
    }
</script>

<style>

</style>
