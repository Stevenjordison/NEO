<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/powerEdit'
</style>

<template>
    <div class="app-page" id="powerEdit-page">
        <el-card class="box-card">
            <div slot="header" class="title">
                <span class="name">报修统计</span>
                <el-button style="float: right;" type="primary" @click="saveFixForm">保存</el-button>
            </div>
            <div class="content">
                <el-form class="fix-form" ref="form" :model="fixForm" label-width="80px">
                    <el-form-item label="客诉">
                        <el-input v-model="fixForm.complaints"></el-input>
                    </el-form-item>
                    <el-form-item label="维修">
                        <el-input v-model="fixForm.service"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="title">
                <span class="name">能耗</span>
                <el-radio-group v-model="currentYears" @change="changeYear">
                    <el-radio-button v-for="(item, index) in years" :label="item" :key="index"></el-radio-button>
                </el-radio-group>
                <el-popover placement="bottom" width="200" trigger="click" v-model="popover">
                    <el-input placeholder="输入年份" v-model="addYear"/>
                    <div style="text-align: right; margin-top: 10px">
                        <el-button size="mini" type="text" @click="popover = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleAdd">确定</el-button>
                    </div>
                    <el-button slot="reference">添加</el-button>
                </el-popover>
                <el-button style="float: right;" type="primary" @click="savePower">保存</el-button>
            </div>
            <div class="content">
                <div class="power-wrap">
                    <h1>A栋</h1>
                    <dl><dt></dt><dd v-for="item in 12">{{item}} 月</dd></dl>
                    <dl class="item"><dt>总电量</dt><dd v-for="(item, index) in powerList.A.totalElectric"><el-input type="text" v-model="powerList.A.totalElectric[index]"/></dd></dl>
                    <dl class="item"><dt>总水量</dt><dd v-for="(item, index) in powerList.A.totalWater"><el-input type="text" v-model="powerList.A.totalWater[index]"/></dd></dl>
                    <dl class="item"><dt>客户用电</dt><dd v-for="(item, index) in powerList.A.customerElectric"><el-input type="text" v-model="powerList.A.customerElectric[index]"/></dd></dl>
                    <dl class="item"><dt>客户用水</dt><dd v-for="(item, index) in powerList.A.customerWater"><el-input type="text" v-model="powerList.A.customerWater[index]"/></dd></dl>
                    <dl class="item"><dt>客户用电(照明)</dt><dd v-for="(item, index) in powerList.A.customerElectric1"><el-input type="text" v-model="powerList.A.customerElectric1[index]"/></dd></dl>
                    <dl class="item"><dt>客户用电(VRV)</dt><dd v-for="(item, index) in powerList.A.customerElectric2"><el-input type="text" v-model="powerList.A.customerElectric2[index]"/></dd></dl>
                    <dl class="item"><dt>集团用电</dt><dd v-for="(item, index) in powerList.A.groupElectric"><el-input type="text" v-model="powerList.A.groupElectric[index]"/></dd></dl>
                    <dl class="item"><dt>集团用电(照明)</dt><dd v-for="(item, index) in powerList.A.groupElectric1"><el-input type="text" v-model="powerList.A.groupElectric1[index]"/></dd></dl>
                    <dl class="item"><dt>集团用电(电梯)</dt><dd v-for="(item, index) in powerList.A.groupElectric2"><el-input type="text" v-model="powerList.A.groupElectric2[index]"/></dd></dl>
                    <dl class="item"><dt>集团用电(空调)</dt><dd v-for="(item, index) in powerList.A.groupElectric3"><el-input type="text" v-model="powerList.A.groupElectric3[index]"/></dd></dl>
                    <dl class="item"><dt>通信用电</dt><dd v-for="(item, index) in powerList.A.communicationElectric"><el-input type="text" v-model="powerList.A.communicationElectric[index]"/></dd></dl>
                    <dl class="item"><dt>停车场用电</dt><dd v-for="(item, index) in powerList.A.parkElectric"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>LED彩屏用电</dt><dd v-for="(item, index) in powerList.A.LEDElectric"><el-input type="text" v-model="powerList.A.LEDElectric[index]"/></dd></dl>
                    <dl class="item"><dt>公共能耗电量</dt><dd v-for="(item, index) in powerList.A.publicElectric"><el-input type="text" v-model="powerList.A.publicElectric[index]"/></dd></dl>
                    <dl class="item"><dt>公共能耗水量</dt><dd v-for="(item, index) in powerList.A.publicWater"><el-input type="text" v-model="powerList.A.publicWater[index]"/></dd></dl>
                </div>
                <div class="power-wrap">
                    <h1>B栋</h1>
                    <dl><dt></dt><dd v-for="item in 12">{{item}} 月</dd></dl>
                    <dl class="item"><dt>总水量</dt><dd v-for="(item, index) in powerList.B.totalElectric"><el-input type="text" v-model="powerList.A.totalElectric[index]"/></dd></dl>
                    <dl class="item"><dt>总电量</dt><dd v-for="(item, index) in powerList.B.totalWater"><el-input type="text" v-model="powerList.A.totalWater[index]"/></dd></dl>
                    <dl class="item"><dt>用户用电</dt><dd v-for="(item, index) in powerList.B.customerElectric"><el-input type="text" v-model="powerList.A.customerElectric[index]"/></dd></dl>
                    <dl class="item"><dt>用户用水</dt><dd v-for="(item, index) in powerList.B.customerWater"><el-input type="text" v-model="powerList.A.customerWater[index]"/></dd></dl>
                    <dl class="item"><dt>客户用电(照明)</dt><dd v-for="(item, index) in powerList.B.customerElectric1"><el-input type="text" v-model="powerList.A.customerElectric1[index]"/></dd></dl>
                    <dl class="item"><dt>客户用电(VRV)</dt><dd v-for="(item, index) in powerList.B.customerElectric2"><el-input type="text" v-model="powerList.A.customerElectric2[index]"/></dd></dl>
                    <dl class="item"><dt>通信用电</dt><dd v-for="(item, index) in powerList.B.communicationElectric"><el-input type="text" v-model="powerList.A.communicationElectric[index]"/></dd></dl>
                    <dl class="item"><dt>停车场</dt><dd v-for="(item, index) in powerList.B.parkElectric"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>会所用电</dt><dd v-for="(item, index) in powerList.B.clubElectric"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>会所用水</dt><dd v-for="(item, index) in powerList.B.clubWater"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>食堂用电</dt><dd v-for="(item, index) in powerList.B.canteenElectric"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>食堂用水</dt><dd v-for="(item, index) in powerList.B.canteenWater"><el-input type="text" v-model="powerList.A.parkElectric[index]"/></dd></dl>
                    <dl class="item"><dt>公共能耗电量</dt><dd v-for="(item, index) in powerList.B.publicElectric"><el-input type="text" v-model="powerList.A.publicElectric[index]"/></dd></dl>
                    <dl class="item"><dt>公共能耗水量</dt><dd v-for="(item, index) in powerList.B.publicWater"><el-input type="text" v-model="powerList.A.publicWater[index]"/></dd></dl>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'powerEdit',
        data () {
            return {
                years: [2018,2019],
                currentYears: 2018,
                popover: false,
                addYear: null,

                fixForm: {
                    complaints: 0,
                    service: 0,
                },
                powerList: {
                    A: {
                        totalWater: [],
                        customerWater: [],
                        totalElectric: [],
                        customerElectric: [],
                        customerElectric1: [],
                        customerElectric2: [],
                        groupElectric: [],
                        groupElectric1: [],
                        groupElectric2: [],
                        groupElectric3: [],
                        communicationElectric: [],
                        parkElectric: [],
                        LEDElectric: [],
                        publicElectric: [],
                        publicWater: []
                    },
                    B: {
                        totalWater: [],
                        customerWater: [],
                        totalElectric: [],
                        customerElectric: [],
                        customerElectric1: [],
                        customerElectric2: [],
                        communicationElectric: [],
                        parkElectric: [],
                        clubElectric: [],
                        canteenElectric: [],
                        publicElectric: [],
                        clubWater: [],
                        canteenWater: [],
                        publicWater: []
                    }
                }
            }
        },
        created() {
            this.queryFixForm()
            this.queryPower(2018)
        },
        methods: {
            handleAdd() {
                this.years.push(Number(this.addYear))
                this.currentYears = Number(this.addYear)
                this.addYear = null
            },
            changeYear(e) {
                this.queryPower(e)
            },
            saveFixForm () {
                const that = this
                that.$axios({
                    url: 'data/fix/save',
                    method: 'post',
                    data:{
                        complaints: that.fixForm.complaints,
                        service: that.fixForm.service,
                    }
                }).then(res => {
                    that.$message.success('保存成功')
                })
            },
            savePower () {
                const that = this
                that.$axios({
                    url: 'data/energy/save',
                    method: 'post',
                    data: {
                        tag: that.currentYears,
                        json: that.powerList
                    }
                }).then(res => {
                    that.$message.success('保存成功')
                })
            },
            // 获取维修数据
            queryFixForm () {
                const that = this
                that.$axios({
                    url: 'data/fix/get'
                }).then(res => {
                    that.fixForm = res.data
                })
            },
            // 获取能耗数据
            queryPower (years) {
                const that = this
                that.$axios({
                    url: 'data/energy/get',
                    params: {
                        tag: 2019
                    }
                }).then(res => {
                    that.powerList = res
                })
            }
        }
    }
</script>

<style>

</style>
