<!-- 首页 Created by joey-mini on 2018/7/26-->
<style lang="sass">
    @import '../scss/dashboard'
</style>

<template>
    <div class="app-page" id="dashboard-page">
        <el-row :gutter="12">
            <!--left-->
            <el-col :span="6">
                <!--本月签约情况-->
                <section class="section-wrap small mb">
                    <header class="title">
                        <h1>本月签约情况</h1>
                        <span>(家)</span>
                    </header>
                    <div class="content">
                    </div>
                </section>

                <!--地区签约情况-->
                <section class="section-wrap mb auto-flex" v-if="!region" :class="region ? 'mb auto-flex': ''">
                    <header class="title">
                        <h1>地区签约情况</h1>
                        <span>(家)</span>
                    </header>
                    <ul class="content">
                        <li class="label-progress" v-for="item in signingList">
                            <label>{{ item.name }}</label>
                        </li>
                    </ul>
                </section>

                <!--当月签约业绩-->
                <section class="section-wrap" ref="leftTable" :style="region ? 'flex: 1' : 'flex: 0 0 407px'">
                    <header class="title">
                        <h1 v-if="!region">当月签约业绩 Top10</h1>
                        <h1 v-else>销售签约情况</h1>
                    </header>
                    <el-table :data="personSigningList"
                              :height="leftHeight"
                              header-cell-class-name="thead"
                              ref="multipleTable">
                        <el-table-column prop="employeeName" align="center" label="姓名"></el-table-column>
                        <el-table-column v-if="!region" prop="regionName" align="center" label="区域"></el-table-column>
                        <el-table-column prop="signingCount" align="center" label="新增会所"></el-table-column>
                        <el-table-column v-if="region" prop="maintenanceCount" align="center" label="运营会所"></el-table-column>
                    </el-table>
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

                <section class="section-wrap mb auto-flex">
                    <header class="title">
                        <h1>支付情况</h1>
                    </header>
                    <div class="content">
                        <areaspLine ref="areaspLine"></areaspLine>
                    </div>
                </section>

                <section class="section-wrap" style="flex: 0 0 271px;">
                    <header class="title">
                        <h1>地区支付情况</h1>
                    </header>
                    <el-table :data="paymentList"
                              header-cell-class-name="thead"
                              ref="multipleTable">
                        <el-table-column prop="region" align="center" label="地区"></el-table-column>
                        <el-table-column prop="clubCount" align="center" label="会所数"></el-table-column>
                        <el-table-column prop="todayCount" align="center" label="今日支付笔数"></el-table-column>
                        <el-table-column prop="todayAmount" align="center" label="今日支付金额"></el-table-column>
                        <el-table-column prop="monthCount" align="center" label="本月支付笔数"></el-table-column>
                        <el-table-column prop="monthAmount" align="center" label="本月支付金额"></el-table-column>
                        <el-table-column prop="paymentQuota" align="center" label="本月支付目标"></el-table-column>
                        <el-table-column align="center" label="本月支付完成度" :formatter="(row) => ((row.monthAmount / row.paymentQuota) * 100).toFixed(2) + '%'"></el-table-column>
                    </el-table>
                </section>

            </el-col>

            <!--right-->
            <el-col :span="6">
                <section class="section-wrap mb auto-flex">
                    <header class="title">
                        <h1>用户打赏 Top10</h1>
                    </header>
                    <div class="content" ref="reward">
                        <bar ref="bar"></bar>
                    </div>
                </section>
                <section class="section-wrap comment" style="flex: 0 0 407px">
                    <header class="title">
                        <h1>用户点评 Top10</h1>
                    </header>
                    <el-table :data="commentList"
                              header-cell-class-name="thead"
                              ref="multipleTable">
                        <el-table-column class-name="club-name" prop="clubName" align="center" label="会所" min-width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="commentCount" align="center" label="点评数" min-width="65"></el-table-column>
                        <el-table-column prop="percent" align="center" label="差评率" min-width="65"></el-table-column>
                    </el-table>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import areaspLine from '../components/HchartAreaspline'
    import bar from '../components/HchartBar'

    export default {
        name: 'dashboard',
        data () {
            return {
                region: null,
                totalSigningCount: 0,
                totalSigningQuota: 0,
                signingList: [],
                payment: {
                    yesterdayAmount: 0,
                    yesterdayTotal: 0,
                    todayAmount: 0,
                    todayTotal: 0,
                    monthAmount: 0,
                    monthTotal: 0,
                    paymentQuota: 0
                },
                personSigningList: [],
                paymentList: [],
                rewardList: [],
                payChartList: [],
                commentList: [],

                leftHeight: null
            }
        },
        components: {
            areaspLine, bar
        },
        watch: {
            $route (to) {
                if (to.name === 'dashboard') {
                    this.region = to.query.region
                    this.$message.warning('路由已切换:' + to.query.region)
                }
            },
            region (val) {
                console.log(val)
                val && this.initLeftTable()
            }
        },
        created () {
            this.region = this.$store.state.currRouter.query.region
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
