<template>
    <form js-form action="#" v-on:submit.prevent="pay()" method="post" class="payment-card">
        <div class="payment-card__wrapper">
            <div class="payment-card__main">
                <div class="payment-card__header">
                    <div class="payment-card__header-wrapper">
                        <div class="payment-card__header-main">
                            <div class="payment-card__title">
                                {{payment.title}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payment-card__fields">
                    <div v-if="payment.typePayment === 1" class="payment-card__fields-item">
                        <label class="field">
                            <div class="field__title">Номер телефона</div>
                            <masked-input
                                    type="text"
                                    name="phone"
                                    class="field__input"
                                    v-model="treaty"
                                    :mask="['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                    :guide="true"
                                    placeholder="+7("
                                    placeholderChar="_">
                            </masked-input>
                        </label>
                    </div>
                    <div v-if="payment.typePayment === 2" class="payment-card__fields-item">
                        <label class="field">
                            <div class="field__title">Номер договора</div>
                            <masked-input
                                    type="text"
                                    name="phone"
                                    class="field__input"
                                    v-model="treaty"
                                    :mask="[/\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/]"
                                    :guide="true"
                                    placeholder=""
                                    placeholderChar="_">
                            </masked-input>
                        </label>
                    </div>

                    <div class="payment-card__fields-item">
                        <label class="field">
                            <div class="field__title">Сумма платежа</div>
                            <masked-input
                                    type="text"
                                    name="sum"
                                    :mask="numberMask"
                                    class="field__input"
                                    v-model="paymentSum">
                            </masked-input>
                        </label>
                    </div>
                    <div v-if="paySuccess" class="payment-card__msg">
                        <div class="payment-card__info payment-card__info_success">
                            <div class="payment-card__info-main">
                                Платеж прошел успешно
                            </div>
                        </div>
                    </div>
                    <div v-if="payErrors.length" class="payment-card__msg">
                        <div class="payment-card__info payment-card__info_error">
                            <div class="payment-card__info-side">
                                Ошибка:
                            </div>
                            <div class="payment-card__info-main">
                                <div v-for="error in payErrors" class="payment-card__info-item">
                                    {{error}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-card__side">
                <div class="payment-card__actions">
                    <div class="payment-card__actions-item">
                        <button type="submit" class="button"><span class="button__content"><span class="button__title">Оплатить</span></span></button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>

    import MaskedInput from 'vue-text-mask'
    import CreateNumberMask from 'text-mask-addons/dist/createNumberMask'
    import Constantes from '../constantes';

    const {errors} = Constantes;

    export default {
        name: 'PaymentCard',
        props: ['payment'],
        components: {
            MaskedInput
        },
        data() {
            return {
                treaty: '',
                paymentSum: '',
                paySuccess: false,
                payErrors: [],
                numberMask: CreateNumberMask({
                    prefix: '',
                    thousandsSeparatorSymbol: ' ',
                    suffix: ' ₽',
                    allowDecimal: true,
                    integerLimit: 5
                }),

            };
        },
        created() {
        },
        computed: {},
        methods: {
            pay: function () {

                this.paySuccess = false;
                this.payErrors = [];

                const balance = parseFloat(this.$store.state.user.balance);
                const paymentSum = this.paymentSum.length > 0 ? parseFloat(this.paymentSum.replace(/\s/g, "")) : 0;
                const treaty = this.treaty.replace(/\D/g, "");

                switch (this.payment.typePayment) {
                    case 1:
                        if (treaty.length !== 11) {
                            this.payErrors.push(errors.incorrectNumber);
                        }
                        break;

                    case 2:

                        if (treaty.length !== 12) {
                            this.payErrors.push(errors.incorrectNumber);
                        }
                        break;
                }

                if (paymentSum < this.payment.min) {
                    this.payErrors.push(errors.minPayment);
                }

                if (paymentSum > this.payment.max) {
                    this.payErrors.push(errors.maxPayment);
                }

                if (this.payErrors.length === 0) {
                    if (balance >= paymentSum) {
                        this.$store.dispatch('changeBalance', {paymentSum: paymentSum});
                        this.paySuccess = true;

                    }
                    else {
                        this.payErrors.push(errors.lackBalance);
                    }
                }
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .payment-card {
        &__main {
            margin-bottom 40px
        }
        &__info {
            padding 20px 10px 20px 10px
            overflow hidden
            border-radius 5px
            &-side {
                font-size 14px
                margin-bottom 5px
            }
            &-main {
            }
            &_error {
                background #ffebee
            }
            &_success {
                background #e8f5e9
            }
        }
        &__title {
            font-size 22px
            font-weight 700
        }
        &__header {
            margin-bottom 40px
            &-wrapper {
                display flex
                flex-wrap wrap
                margin-right -5px
                margin-left -5px
            }
            &-side {
                margin-right 5px
                margin-left 5px
                flex 0 0 auto
            }
            &-main {
                margin-right 5px
                margin-left 5px
                flex 1
            }
        }
        &__fields {
            margin-bottom 25px
            &-item {
                margin-bottom 15px
                &:last-child {
                    margin-bottom 0
                }
            }
        }
        &__wrapper {
            box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.14)
            background white
            box-sizing border-box
            overflow hidden
            border-radius 5px
            padding 30px 20px 40px 20px
        }
    }
</style>