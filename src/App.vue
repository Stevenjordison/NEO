<style lang="sass">
    @import './scss/common/common'
</style>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            const store = this.$store
            if (store.state.token) {
                this.$store.dispatch('getSelectConfig')
            }
            if (document.body.clientWidth < 1500) {
                this.$store.commit('SET_COLLAPSE', true)
            }
        }
    }
</script>
