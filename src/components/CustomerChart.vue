<template>
    <ul>
        <li><ChartPie :data="customerData.gender" title="性别"></ChartPie></li>
        <li><ChartPie :data="customerData.agebin" :color="colorMap.blue" title="年龄"></ChartPie></li>
        <li><ChartPie :data="customerData.income" title="收入"></ChartPie></li>
        <li><ChartWorlCloud :data="customerData.segment" :color="colorMap.rainbow" title="用户偏好"></ChartWorlCloud></li>
    </ul>
</template>

<script>
    import ChartPie from './ChartPie'
    import ChartWorlCloud from './ChartWordCloud'
    import {customerData, colorMap} from '../script/helper'

    export default {
        name: 'CustomerChart',
        data () {
            return {
                chart: null,
                customerData: customerData,
                colorMap: colorMap
            }
        },
        components: {
            ChartPie,ChartWorlCloud
        },
        mounted() {
            console.log(this.customerData)
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        width: 100%;
        height: 100%;
        li{
            flex: 1;
            height: 190px;
        }
    }
</style>
