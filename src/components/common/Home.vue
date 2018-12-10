<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content">
            <transition name="move" mode="out-in">
                <keep-alive :include="tagsList">
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    import eventHub from '../../script/eventHub'

    export default {
        data () {
            return {
                tagsList: []
            }
        },
        components: { vHead },
        created () {
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            eventHub.$on('tags', msg => {
                let arr = []
                for (let i = 0; i < msg.length - 1; i++) {
                    if (msg[msg.length - 1].name === msg[i].name) {
                        msg.splice(i, 1)
                        i--
                    }
                }
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name)
                }
                this.tagsList = arr
            })
        }
    }
</script>
