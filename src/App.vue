<template>
    <div id="app" class="body__wrapper">
        <div class="body__header">
            <Header></Header>
        </div>
        <div class="body__content">
            <router-view/>
        </div>
        <div class="body__footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script>

    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    export default {
        name: 'app',
        components: {
            Header,
            Footer
        }
    }
</script>

<style lang="stylus">
    @import './assets/css/common.styl';
</style>
