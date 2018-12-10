<template>
    <div class="progress">
        <div class="progress-bar">
            <div class="outer" :style="{height: strokeHeight + 'px'}">
                <div class="inner" :style="{'backgroundColor': color, 'width': strokeWidth}"></div>
            </div>
            <div class="cur-text" :style="{left: strokeWidth}">{{ parseInt(nowValue) }}</div>
        </div>
        <div class="progress-text">{{total}}</div>
    </div>
</template>

<script>
    export default {
        name: 'myProgress',
        data () {
            return {
                strokeWidth: 0,
                nowValue: 0
            }
        },
        props: {
            total: [Number],
            value: [Number],
            strokeHeight: {
                type: Number,
                default: 6
            },
            color: {
                type: String,
                default: ''
            }
        },
        watch: {
            value () {
                this.init()
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            init () {
                const val = this.nowValue
                const target = this.value
                const speed = Math.abs(val - target) / 40
                val < target ? this.addLoop(val, target, speed) : this.reduceLoop(val, target, speed)
                setTimeout(() => {
                    this.strokeWidth = this.value / this.total * 100 + '%'
                }, 10)
            },
            addLoop (val, target, speed) {
                let loop = setInterval(() => {
                    if (val < target) {
                        val += speed
                    } else {
                        val = target // 校正
                        clearInterval(loop)
                    }
                    this.nowValue = val
                }, 20)
            },
            reduceLoop (val, target, speed) {
                let loop = setInterval(() => {
                    if (val > target) {
                        val -= speed
                    } else {
                        val = target // 校正
                        clearInterval(loop)
                    }
                    this.nowValue = val
                }, 20)
            }
        }
    }
</script>

<style scoped lang="scss">
    .progress {
        position: relative;
        width: 100%;
        padding-right: 50px;
        box-sizing: border-box;
        .progress-bar {
            position: relative;
            width: 100%;
            display: inline-block;
            .outer {
                position: relative;
                height: 6px;
                border-radius: 100px;
                background-color: #ebeef5;
                vertical-align: middle;
                overflow: hidden;
                .inner {
                    transition: all 1s ease-out;
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background-color: #409EFF;
                    text-align: right;
                    border-radius: 100px;
                    line-height: 1;
                    white-space: nowrap;
                }
            }
            .cur-text {
                transition: all 1s ease-out;
                position: absolute;
                top: -24px;
                left: 70%;
                margin-left: -25px;
                width: 50px;
                text-align: center;
            }
        }
        .progress-text {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 40px;
            font-size: 14px;
            color: #606266;
        }
    }
</style>
