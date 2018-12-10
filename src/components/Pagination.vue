<style lang="scss">
    @import '../scss/common/mixin';
    .pagination {
        text-align: center;
        transition: all 0.3s ease-out;
        > div {
            // display: inline-block;
            text-align: right;
            > a {
                cursor: pointer;
                display: inline-block;
                font-size: 16px;
                min-width: 20px;
                height: 30px;
                line-height: 30px;
                margin-left: 5px;
                text-align: center;
                color: $themeColor;
                i {
                    font-size: 14px;
                    color: inherit;
                }
                &:hover {
                    color: #fff;
                }
                &.curr {
                    color: $border_color_hover;
                    cursor: not-allowed;
                }
                &.disable {
                    display: none;
                    opacity: 0;
                    cursor: default;
                    &:hover {
                        background-color: #fff;
                    }
                }
            }
            > input {
                margin: 0 12px;
                width: 50px;
                height: 28px;
                font-size: 14px;
                color: $border_color_hover;
                text-align: center;
            }
            > button {
                @extend %btn_default;
                /*display: inline-block;*/
                /*width: 40px;*/
                /*height: 30px;*/
                /*line-height: 28px;*/
                /*font-size: 16px;*/
                /*border: 1px solid #646f86;*/
                /*color: #646f86;*/
                /*border-radius: 4px;*/
                /*text-align: center;*/
                /*cursor: pointer;*/
                /*&:hover {*/
                    /*border: 1px solid #7c96b7;*/
                    /*background-color: #7c96b7;*/
                    /*color: #fff;*/
                /*}*/
            }
        }
    }
</style>
<template>
    <div class="pagination" v-show="total>1" :class="{ full: !leftMenuStatus }">
        <div>
            <a class="prev" :class="{ disable: !hasPrev }" @click="doPrev"><i class='icon-arrow-left'></i></a>
            <a v-for="item in posArr" :class="{ curr: item==curr }" @click="doClickItem(item)">{{ item }}</a>
            <a class="next" :class="{ disable: !hasNext }" @click="doNext"><i class='icon-arrow-right'></i></a>
            <!--<input type="text" maxlength="5" :placeholder="'共'+total+'页'" v-model="gotoPage" @input="doInputGotoPage" @keyup.enter="doGo"/>-->
            <!--<button @click="doGo">GO</button>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'pagination',
        data () {
            return {
                gotoPage: '' // 跳转的页码
            }
        },
        computed: {
            leftMenuStatus () {
                return this.$store.state.leftMenuStatus
            },
            hasPrev () {
                return this.curr !== 1
            },
            hasNext () {
                const that = this
                return that.curr !== that.total
            },
            posArr () {
                const that = this
                let list = []
                let i = 0
                let total = that.total
                if (total <= 7) {
                    for (i = 1; i <= total; i++) {
                        list.push(i)
                    }
                } else {
                    list[0] = 1
                    list[6] = total
                    let left = that.curr - 1
                    let right = that.curr + 1
                    if (left < 3) {
                        for (i = 1; i <= 4; i++) {
                            list[i] = i + 1
                        }
                        list[5] = '...'
                    } else if (total - right < 3) {
                        for (i = 5; i >= 2; i--) {
                            list[i] = list[i + 1] - 1
                        }
                        list[1] = '...'
                    } else {
                        list[1] = '...'
                        list[2] = left
                        list[3] = that.curr
                        list[4] = right
                        list[5] = '...'
                    }
                }
                return list
            }
        },
        props: {
            total: { // 总页数
                type: Number,
                required: true
            },
            curr: {
                type: Number,
                required: true
            }
        },
        methods: {
            doInputGotoPage () {
                const that = this
                let val = that.gotoPage
                if (/\D/.test(val)) {
                    val = val.replace(/\D/g, '')
                }
                that.gotoPage = val
                if (val && parseInt(val) > that.total) {
                    that.gotoPage = val.substring(0, val.length - 1)
                }
            },
            doGo () {
                const that = this
                let page = that.gotoPage - 0
                if (page > 0 && page <= that.total) {
                    that.$emit('switch', page)
                }
            },
            doPrev () {
                const that = this
                if (that.hasPrev) {
                    that.$emit('switch', that.curr - 1)
                }
            },
            doNext () {
                const that = this
                if (that.hasNext) {
                    that.$emit('switch', that.curr + 1)
                }
            },
            doClickItem (page) {
                if (page !== '...') {
                    this.$emit('switch', page)
                }
            }
        }
    }
</script>
