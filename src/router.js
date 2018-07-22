import Vue from 'vue'
import Router from 'vue-router'
import ServicesList from './views/ServicesList.vue'
import CategoriesList from './views/CategoriesList.vue'
import HistoryList from './views/HistoryList.vue'
import Payment from './views/Payment.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'categories',
            component: CategoriesList,
        },
        {
            path: '/services/:id',
            name: 'services',
            component: ServicesList,

        },
        {
            path: '/payment/:id/',
            name: 'payment',
            component: Payment,
        },
        {
            path: '/history/',
            name: 'history',
            component: HistoryList,
        }
    ],
    mode: 'history'
})
