<template>
    <div class="charge">
        <div class="charge__wrapper">
            <div class="charge__main">
                <div class="charge__title">{{ info.categoryTitle }} - {{ info.serviceTitle }}</div>
                <div class="charge__info">
                    <div class="charge__info-list">
                        <div class="charge__info-item">
                            {{ info.date }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="charge__side">
                <div class="charge__price">
                    {{ info.sum }} ₽
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Charge',
        props: [
            'info'
        ],
        data: function () {
            return {}
        }
    }
</script>
<style lang="stylus">
    .charge {
        padding-bottom 15px
        margin-bottom 15px
        border-bottom 1px solid #e6e6e6
        &__wrapper {
            display flex
            align-items center
            margin-right -5px
            margin-left -5px
        }
        &__price {
            font-size 20px
            font-weight 700
            line-height 1.2
        }
        &__main {
            margin-right 5px
            margin-left 5px
            flex 1
        }
        &__title {
            font-size 18px
            font-weight 700
            line-height 1.2
            margin-bottom 5px
        }
        &__subtitle {
            margin-bottom 20px
        }
        &__info {
            &-list {
                display flex
                margin-right -5px
                margin-left -5px
                align-items center
            }
            &-item {
                margin-right 5px
                margin-left 5px
            }
        }
        &__side {
            margin-right 5px
            margin-left 5px
            flex 0 0 auto
        }
    }
</style>