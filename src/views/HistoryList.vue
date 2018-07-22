<template>
    <div class="section block">
        <div v-if="loading" class="loader"></div>
        <div class="section__wrapper block-wrapper">
            <div class="section__content">
                <div class="section__side">
                    <div class="section__header">
                        История платежей
                    </div>
                    <div class="section__search"></div>
                </div>
                <div class="section__main">
                    <div class="history">
                        <div class="history__content">
                            <div class="history__main">
                                <div class="history__list">
                                    <div v-for="item,key in history" :key="key" class="history__list-item">
                                        <Charge :info="item"/>
                                    </div>
                                </div>
                            </div>
                            <div class="history__side">
                                <div class="history-filter">
                                    <div class="history-filter__wrapper">
                                        <div class="history-filter__section">
                                            <select v-model="categoryId" v-on:change="filter($event)">
                                                <option selected value="0">Все категории</option>
                                                <option value="1">Мобильная связь</option>
                                                <option value="2">Интернет</option>
                                            </select>
                                        </div>
                                        <div class="history-filter__section">
                                            <div class="history-filter__section-side">
                                                Сортировать по:
                                            </div>
                                            <div class="history-filter__section-main">
                                                <select v-model="sortType" v-on:change="sort($event.target.value)">
                                                    <option selected value="dateAsc">дате (старые)</option>
                                                    <option value="dateDesc">дате (новые)</option>
                                                    <option value="sumDesc">сумме (возврастание)</option>
                                                    <option value="sumAsc">сумме (убывание)</option>
                                                </select>
                                            </div>
                                        </div>
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

    import Charge from '../components/Charge.vue'
    import Axios from 'axios'
    import Moment from 'moment'
    import Constantes from '../constantes'

    const {api} = Constantes;


    export default {
        name: 'HistoryList',
        components: {
            Charge,
        },
        data() {
            return {
                history: '',
                loading: true,
                sortType: 'dateDesc',
                categoryId: '0',
            }
        },
        mounted() {
            Axios.get(`${api.getHistory}`).then((responce) => {
                this.$store.dispatch('loadHistory', {data: responce.data});
                this.history = this.$store.state.history;
                this.sort('dateDesc');
                this.loading = false;
            });
        },
        computed: {},
        methods: {
            filter($event) {
                let categoryId = $event.target.value;
                this.history = this.$store.getters.getHistoryByIdCategory(categoryId);
                this.sort(this.sortType)
            },
            sort(value) {
                switch (value) {
                    case 'sumDesc':
                        this.history = this.history.sort((a, b) => ( b.sum - a.sum ));
                        break;
                    case 'sumAsc':
                        this.history = this.history.sort((a, b) => ( a.sum - b.sum));
                        break;
                    case 'dateDesc':
                        this.history = this.history.sort((a, b) => ( Moment(b.date, "DD/MM/YYYY") - Moment(a.date, "DD/MM/YYYY")));
                        break;
                    case 'dateAsc':
                        this.history = this.history.sort((a, b) => ( Moment(a.date, "DD/MM/YYYY") - Moment(b.date, "DD/MM/YYYY")));
                        break;
                }
            }
        }
    }
</script>

<style lang="stylus">
    .history {
        &__content {
            display flex
            margin-right -20px
            margin-left -20px
        }
        &__main {
            flex 1
            margin-right 20px
            margin-left 20px
        }
        &__side {
            flex 0 0 auto
            margin-right 20px
            margin-left 20px
            width 300px
        }
        &__list {
            overflow hidden
            border-radius 5px
            box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.14)
            background white
            box-sizing border-box
            padding 30px 15px 30px 15px
        }
    }

    .history-filter {
        overflow hidden
        border-radius 5px
        box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.14)
        background white
        box-sizing border-box
        padding 15px
        &__section {
            margin-bottom 15px
        }
        select {
            font-size 16px
            padding 9px 10px 8px 10px
            width 100%
        }
    }
</style>