<template>
    <ul>
        <li><ChartPie :data="customerData.gender" title="性别"></ChartPie></li>
        <li><ChartPie :data="customerData.agebin" title="年龄"></ChartPie></li>
        <li><ChartPie :data="customerData.income" title="收入"></ChartPie></li>
        <li><ChartPie :data="customerData.segment" title="用户偏好"></ChartPie></li>
    </ul>
</template>

<script>
    import ChartPie from './ChartPie'
    import {customerData} from '../script/helper'

    export default {
        name: 'CustomerChart',
        data () {
            return {
                chart: null,
                customerData: customerData
            }
        },
        components: {
            ChartPie
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
