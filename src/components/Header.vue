<template>
    <div class="header block">
        <div class="block-wrapper">
            <div class="header__wrapper">
                <div class="header__main">
                    <div class="header__nav">
                        <div class="header__nav-list">
                            <div class="header__nav-item">
                                <router-link to='/' class="header__nav-link">Главная</router-link>
                            </div>
                            <div class="header__nav-item">
                                <router-link to='/history' class="header__nav-link">История платежей</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header__side">
                    <UserBadge></UserBadge>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import UserBadge from '../components/UserBadge.vue'

    export default {
        name: 'Header',
        components: {
            UserBadge,
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>
<style lang="stylus">
    .header {
        background white
        padding-top 25px
        padding-bottom 25px
        margin-bottom 50px
        &__wrapper {
            display flex
            align-items center
            margin-right -5px
            margin-left -5px
        }
        &__side {
            flex 0 0 auto
            margin-right 5px
            margin-left 5px
        }
        &__main {
            flex 1
            margin-right 5px
            margin-left 5px
        }
        &__nav {
            color black
            &-list {
                display flex
                margin-right -15px
                margin-left -15px
            }
            &-item {
                margin-right 15px
                margin-left 15px
            }
            &-link {
                color currentColor
                text-decoration none
                border-bottom none
                &:hover {
                    color #3d96ce
                }
            }
        }
    }
</style>