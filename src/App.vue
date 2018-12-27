<style lang="sass">
    @import './scss/common/common'
</style>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            setTimeout(() => {
                this.$store.dispatch('queryBigData')
            }, 1000)
        }
    }
</script>
