<template>
    <div class="section block">
        <div v-if="loading" class="loader"></div>
        <div class="section__wrapper block-wrapper">
            <div class="section__content">
                <div class="section__side">
                    <div class="section__header">
                        Все категории
                    </div>
                    <div class="section__search"></div>
                </div>
                <div class="section__main">
                    <div class="section__list">
                        <div v-for="category in caregories" :key="category.id" class="section__list-item">
                            <InfoCard :url="urlCards" :info="category"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import InfoCard from '../components/InfoCard.vue';
    import Axios from 'axios';
    import Constantes from '../constantes';
    const {api} = Constantes;

    export default {
        name: 'CategoriesList',
        components: {
            InfoCard
        },
        data() {
            return {
                caregories: '',
                urlCards: 'services',
                loading: true
            }
        },
        mounted() {
            Axios
                .get(api.gerCategoriesList)
                .then(response => {
                    this.caregories = response.data;
                    this.loading = false;
                    console.log()
                });
        },
        computed: {}
    }
</script>