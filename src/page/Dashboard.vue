<!-- 首页 Created by joey-mini on 2018/7/26-->
<style lang="sass">
    @import '../scss/dashboard'
</style>

<template>
    <div class="app-page" id="dashboard-page">
        <el-row class="main" :gutter="12">
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
        <footer class="customer">
            <section class="section-wrap">
                <header class="title">
                    <h1>用户画像</h1>
                </header>
                <div class="content">
                    <CustomerChart></CustomerChart>
                </div>
            </section>
        </footer>
    </div>
</template>

<script>
    import CustomerChart from '../components/CustomerChart'

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
            CustomerChart
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
