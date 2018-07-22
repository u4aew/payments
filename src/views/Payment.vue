<template>
    <div class="section block">
        <div v-if="loading" class="loader"></div>
        <div class="section__wrapper block-wrapper">
            <div class="section__content">
                <div class="section__side">
                    <div class="section__parent">
                        <router-link class="section__parent-link" :to="'/services/' + info.categoryId">Назад</router-link>
                    </div>
                </div>
                <div class="section__main">
                    <div class="payment">
                        <div class="payment__wrapper">
                            <div class="payment__main">
                                <PaymentCard :payment="info"/>
                            </div>
                            <div class="payment__side">
                                <div class="payment__additional">
                                    <div class="payment__additional-side">
                                        <b>Обратите внимание</b>
                                    </div>
                                    <div class="payment__additional-main">
                                        Минимальная сумма платежа {{ info.min }}&nbsp;₽, а&nbsp;максимальная {{ info.max }}&nbsp;₽
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import PaymentCard from '../components/PaymentCard.vue'
    import Constantes from '../constantes'
    const {api} = Constantes;


    export default {
        name: 'Payment',
        components: {
            PaymentCard
        },
        data() {
            return {
                id: this.$route.params.id,
                info: '',
                loading: true
            }
        },
        mounted() {
            Axios
                .get(`${api.getPayment.replace('.json', '')}-${this.id}.json`)
                .then(response => {
                    this.info = response.data;
                    this.loading = false;
                })
        },
        computed: {}
    }
</script>

<style lang="stylus">
    .payment {
        &__wrapper {
            display flex
            margin-left -15px
            margin-right -15px
        }
        &__additional {
            box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.14)
            background white
            box-sizing border-box
            padding 20px
            overflow hidden
            border-radius 5px
            line-height 1.2
            font-size 16px
            &-side {
                margin-bottom 10px
            }
            &-main {
            }
        }
        &__main {
            flex 1
            margin-left 15px
            margin-right 15px
        }
        &__side {
            flex 0 0 auto
            margin-left 15px
            margin-right 15px
            width 380px
        }
    }
</style>