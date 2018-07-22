<template>
    <div class="info-card">
        <div class="info-card__wrapper">
            <div class="info-card__side">
                <div class="info-card__img"></div>
            </div>
            <div class="info-card__main">
                <div class="info-card__title">
                    <router-link class="info-card__link" :to="url + '/' + info.id">{{ info.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InfoCard',
        props: ['info', 'url'],
        data() {
            return {};
        },
        created() {}
    }
</script>

<style lang="stylus">
    .info-card {
        position relative
        color #3d96ce
        font-size 18px
        line-height 1.2
        font-weight 500
        &__side {
            flex 0 0 auto
            flex-grow 1
        }
        &__title {
            text-align center
        }
        &__main {
            margin-top auto
            flex 0 0 auto
        }
        &__wrapper {
            display flex
            flex-direction column
            box-sizing border-box
            padding 15px
            overflow hidden
            border-radius 5px
            box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.14)
            background white
            min-height 224px
            transition .3s ease
            &:hover {
                box-shadow 0 12px 18px 0 rgba(0, 0, 0, 0.1)
                transform translateY(-5px)
            }
        }
        &__link {
            text-decoration none
            border-bottom none
            color currentColor
            &:before {
                content ''
                position absolute
                top 0
                left 0
                right 0
                bottom 0
            }
        }
    }
</style>