<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/power'
</style>

<template>
    <div class="app-page" id="power-page">
        <el-row class="container" :gutter="12">
            <!--left-->
            <el-col :span="6">
                <!--用电分析-->
                <section class="section-wrap mb" style="flex: 0 0 322px">
                    <header class="title">
                        <h1>用电分析</h1>
                    </header>
                    <div class="content">
                        <ChartLineMixBar :data="totalElectricData" :color="'#ffc508'" :unit="'度'"></ChartLineMixBar>
                    </div>
                </section>
                <!--集团用电-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>集团用电</h1>
                    </header>
                    <div class="content">
                        <ChartBarEle :data="groupElectric" :color="colorMap.pie2"></ChartBarEle>
                    </div>
                </section>
                <!--其他用电-->
                <section class="section-wrap" style="flex: 0 0 233px">
                    <header class="title">
                        <h1>其他用电</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="otherElectric" :color="colorMap.pie2" :interval=1200 :unit="'度'"></ChartPie>
                    </div>
                </section>
            </el-col>

            <!--middle-->
            <el-col :span="12" class="middle">
                <div class="middle-header">{{powerDate}}年 能耗看板</div>
                <el-row :gutter="12" class="middle-title">
                    <el-col :span="12">
                        <section class="section-wrap mb">
                            <header class="title">
                                <h1>用电总量</h1>
                            </header>
                            <div class="content">
                                <dl>
                                    <dt><span class="yellow">{{AElectric + BElectric}}</span> 度</dt>
                                    <dd>
                                        <p>A栋:</p>
                                        <span class="yellow">{{AElectric}} 度</span>
                                    </dd>
                                    <dd>
                                        <p>BC栋:</p>
                                        <span class="yellow">{{BElectric}} 度</span>
                                    </dd>
                                </dl>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>用水总量</h1>
                            </header>
                            <div class="content">
                                <dl>
                                    <dt><span class="blue">{{AWater + BWater}}</span> 吨</dt>
                                    <dd>
                                        <p>A栋:</p>
                                        <span class="blue">{{AWater}} 吨</span>
                                    </dd>
                                    <dd>
                                        <p>BC栋:</p>
                                        <span class="blue">{{BWater}} 吨</span>
                                    </dd>
                                </dl>
                            </div>
                        </section>
                    </el-col>
                </el-row>

                <section class="section-wrap middle-content">
                    <header class="title">
                        <h1>{{powerDate}}年能耗数据</h1>
                    </header>
                    <div class="content">
                        <ChartDoubleLine :data="totalPower"></ChartDoubleLine>
                    </div>
                </section>

                <el-row :gutter="12" class="middle-footer">
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>NEO-A栋</h1>
                            </header>
                            <div class="content">
                                <ChartPie :data="pieA" :color="colorMap.pie2" :interval=1200 :unit="'度'"></ChartPie>
                            </div>
                        </section>
                    </el-col>
                    <el-col :span="12">
                        <section class="section-wrap">
                            <header class="title">
                                <h1>NEO-BC栋</h1>
                            </header>
                            <div class="content">
                                <ChartPie :data="pieB" :color="colorMap.pie2" :interval=1200 :unit="'度'"></ChartPie>
                            </div>
                        </section>
                    </el-col>
                </el-row>
            </el-col>

            <!--right-->
            <el-col :span="6">
                <!--上月总客流-->
                <section class="section-wrap mb" style="flex: 0 0 322px">
                    <header class="title">
                        <h1>用水分析</h1>
                    </header>
                    <div class="content">
                        <ChartLineMixBar :data="totalWaterData" :color="'#4e83ff'" :unit="'吨'"></ChartLineMixBar>
                    </div>
                </section>
                <!--客户用水-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>客户用水</h1>
                    </header>
                    <div class="content">
                        <ChartBarWater :data="customerWater" :color="colorMap.pie2"></ChartBarWater>
                    </div>
                </section>
                <!--其他用水-->
                <section class="section-wrap" style="flex: 0 0 233px">
                    <header class="title">
                        <h1>其他用水</h1>
                    </header>
                    <div class="content">
                        <ChartPie :data="otherWater" :color="colorMap.pie2" :interval=1200 :unit="'吨'"></ChartPie>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ChartPie from '../components/power/ChartPie'
    import ChartDoubleLine from '../components/dashboard/ChartDoubleLine'
    import ChartLineMixBar from '../components/power/ChartLineMixBar'
    import ChartBarEle from '../components/power/ChartBarEle'
    import ChartBarWater from '../components/power/ChartBarWater'
    import { colorMap, sum } from '../script/helper'

    export default {
        name: 'power',
        data () {
            return {
                colorMap: colorMap,
                totalPower: [],
                totalWaterData: [],
                totalElectricData: [],
                pieA: [],
                pieB: [],
                groupElectric: [],
                customerWater: [],
                otherElectric: [],
                otherWater: [],
            }
        },
        computed: {
            ...mapState({
                powerDate: state => state.powerDate,
                powerData: state => state.power[state.powerDate]
            }),
            // 电量
            AElectric () {
                return sum(this.powerData.A.totalElectric)
            },
            BElectric () {
                return sum(this.powerData.B.totalElectric)
            },
            // 水量
            AWater () {
                return sum(this.powerData.A.totalWater)
            },
            BWater () {
                return sum(this.powerData.B.totalWater)
            }
        },
        components: {
            ChartPie, ChartBarEle,ChartBarWater, ChartDoubleLine, ChartLineMixBar
        },
        mounted () {
            const powerData = this.powerData
            let water = powerData.A.totalWater.map((item, index) => item + powerData.B.totalWater[index])
            let electric = powerData.A.totalElectric.map((item, index) => item + powerData.B.totalElectric[index])
            this.totalPower = [
                { name: '用水量', value: water },
                { name: '用电量', value: electric }
            ]

            this.totalWaterData = [
                { name: '用水总量', value: water },
                { name: 'A栋', value: powerData.A.totalWater },
                { name: 'B栋', value: powerData.B.totalWater }
            ]
            this.totalElectricData = [
                { name: '用电总量', value: electric },
                { name: 'A栋', value: powerData.A.totalElectric },
                { name: 'B栋', value: powerData.B.totalElectric }
            ]

            this.pieA = [
                { name: '客户-照明', value: sum(powerData.A.customerElectric1) },
                { name: '客户-VRV', value: sum(powerData.A.customerElectric2) },
                { name: '集团-照明', value: sum(powerData.A.groupElectric1) },
                { name: '集团-电梯', value: sum(powerData.A.groupElectric2) },
                { name: '集团-空调', value: sum(powerData.A.groupElectric3) },
                { name: '通讯', value: sum(powerData.A.communicationElectric) },
                { name: '停车场', value: sum(powerData.A.parkElectric) },
                { name: 'LED彩屏', value: sum(powerData.A.LEDElectric) },
                { name: '公共能耗', value: sum(powerData.A.publicElectric) }
            ]

            this.pieB = [
                { name: '客户-照明', value: sum(powerData.B.customerElectric1) },
                { name: '客户-VRV', value: sum(powerData.B.customerElectric2) },
                { name: '通讯', value: sum(powerData.B.communicationElectric) },
                { name: '停车场', value: sum(powerData.B.parkElectric) },
                { name: '会所', value: sum(powerData.B.clubElectric) },
                { name: '食堂', value: sum(powerData.B.canteenElectric) },
                { name: '公共能耗', value: sum(powerData.B.publicElectric) }
            ]

            this.groupElectric = [
                { name: '集团-照明', value: powerData.A.groupElectric1 },
                { name: '集团-电梯', value: powerData.A.groupElectric2 },
                { name: '集团-空调', value: powerData.A.groupElectric3 },
            ]

            let customerWater = powerData.A.customerWater.map((item, index) => item + powerData.B.customerWater[index])
            this.customerWater = [
                {name: '客户用水', value: customerWater}
            ]

            let communicationE = powerData.A.communicationElectric.map((item, index) => item + powerData.B.communicationElectric[index])
            let parkE = powerData.A.parkElectric.map((item, index) => item + powerData.B.parkElectric[index])
            let publicE = powerData.A.publicElectric.map((item, index) => item + powerData.B.publicElectric[index])
            this.otherElectric = [
                {name: '通讯', value: sum(communicationE)},
                {name: '停车场', value: sum(parkE)},
                {name: 'LED彩屏', value: sum(powerData.A.LEDElectric)},
                {name: '会所', value: sum(powerData.B.clubElectric)},
                {name: '食堂', value: sum(powerData.B.canteenElectric)},
                {name: '公共能耗', value: sum(publicE)},
            ]

            let publicW = powerData.A.publicWater.map((item, index) => item + powerData.B.publicWater[index])
            this.otherWater = [
                {name: '会所', value: sum(powerData.B.clubWater)},
                {name: '食堂', value: sum(powerData.B.canteenWater)},
                {name: '公共能耗', value: sum(publicW)},
            ]
        }
    }
</script>
