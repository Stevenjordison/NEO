<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/home'
</style>

<template>
    <div class="app-page" id="home-page">
        <div class="header">
            <div class="left">{{nowTime}}</div>
            <div class="center">绿景智慧办公系统4.0</div>
            <div class="right">
                <p>系统运行状态 <span>电压: 220V</span><span>电流：32A</span><span>功率系数：0.9</span></p>
            </div>
        </div>

        <el-row class="container">
            <el-col class="left" :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 0 0 30%">
                    <header class="title">
                        <h1 @click="doRouter('dashboard')">大数据</h1>
                    </header>
                    <div class="content">
                        <ChartSexPie :agebin="agebin" :gender="gender" :color="colorMap.pie2"></ChartSexPie>
                    </div>
                </section>
                <!--报事报修-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>2018年第四季度报事报修统计</h1>
                        <i class="icon el-icon-setting" @click="doRouter('powerEdit')"></i>
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
                <!--2018能耗数据-->
                <section class="section-wrap mb" style="flex: 0 0 30%">
                    <header class="title">
                        <h1 @click="doRouter('power')">2018能耗数据</h1>
                        <i class="icon el-icon-setting" @click="doRouter('powerEdit')"></i>
                    </header>
                    <div class="content">
                        <ChartDoubleLine :data="power"></ChartDoubleLine>
                    </div>
                </section>
                <!--环境质量-->
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
                        <img class="img" @click="handleHref" src="../assets/images/car.jpg" alt="">
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import DATE from '../script/date'
    import ChartSexPie from '../components/dashboard/ChartSexPie'
    import ChartGauge from '../components/dashboard/ChartGauge'
    import ChartDoubleLine from '../components/dashboard/ChartDoubleLine'
    import ChartGaugeList from '../components/dashboard/ChartGaugeList'
    import { colorMap } from '../script/helper'

    export default {
        name: 'home',
        data () {
            return {
                interval: null,
                nowTime: DATE.formatZh(),
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
                power: []
            }
        },
        components: {
            ChartSexPie, ChartGauge, ChartDoubleLine, ChartGaugeList
        },
        computed: {
            ...mapState({
                agebin: state => state.agebin,
                gender: state => state.gender,
                powerData: state => state.power[state.powerDate]
            })
        },
        mounted () {
            // 时钟
            this.interval = setInterval(() => {
                this.nowTime = DATE.formatZh()
            }, 1000)

            const powerData = this.powerData
            let water = powerData.A.totalWater.map((item, index) => item + powerData.B.totalWater[index])
            let electric = powerData.A.totalElectric.map((item, index) => item + powerData.B.totalElectric[index])
            this.power = [{ name: '用水量', value: water }, { name: '用电量', value: electric }]
        },
        methods: {
            doRouter (name) {
                this.$router.push({ name: name })
            },
            handleHref() {
                location.href = 'http://10.0.12.239/'
            }
        },
        destroy () {
            clearInterval(this.interval)
        }
    }
</script>

<style>

</style>
