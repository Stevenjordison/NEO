<!-- 首页 Created by joey-mini on 2018/12/20-->
<style lang="sass">
    @import '../scss/home'
</style>

<template>
    <div class="app-page" id="home-page">
        <el-row class="container" :gutter="12">
            <el-col class="left" :span="6">
                <!--客户分析-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>大数据</h1>
                    </header>
                    <div class="content">3213
                    </div>
                </section>
                <!--学历分布-->
                <section class="section-wrap mb" style="flex: 1">
                    <header class="title">
                        <h1>学历分布</h1>
                    </header>
                    <div class="content">3213
                    </div>
                </section>
            </el-col>
            <el-col class="center" :span="12"></el-col>
            <el-col class="right" :span="6"></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'home'
    }
</script>

<style>

</style>
