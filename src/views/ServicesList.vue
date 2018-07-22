<template>
    <div class="section block">
        <div v-if="loading" class="loader"></div>
        <div class="section__wrapper block-wrapper">
            <div class="section__content">
                <div class="section__side">
                    <div class="section__parent">
                        <div class="section__parent">
                            <router-link class="section__parent-link" to='/'>Все категории</router-link>
                        </div>
                    </div>
                    <div class="section__header">
                        {{ services.title }}
                    </div>
                    <div class="section__search"></div>
                </div>
                <div class="section__main">
                    <div class="section__list">
                        <div v-for="service in services.servicesChildren" :key="service.id" class="section__list-item">
                            <InfoCard :info="service" :url="urlCards"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InfoCard from '../components/InfoCard.vue'
    import Axios from 'axios'
    import Constantes from '../constantes'
    const {api} = Constantes;

    export default {
        name: 'ServicesList',
        components: {
            InfoCard
        },
        data() {
            return {
                services: '',
                id: this.$route.params.id,
                urlCards: '/payment',
                loading: true
            }
        },
        mounted() {
            Axios
                .get(`${api.gerServicesList.replace('.json', '')}-${this.id}.json`)
                .then(response => {
                    this.services = response.data;
                    this.loading = false;
                });
        }
    }
</script>