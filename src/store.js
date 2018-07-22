import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        history: [],
    },

    mutations: {
        setUser: (state, data) => {
            state.user = data;
        },
        setHistory: (state, data) => {
            state.history = data;
        },
        descBalance: (state, data) => {
            state.user.balance = (state.user.balance - data).toFixed(2);
        },
    },
    actions: {
        loadUser: ({commit}, {data}) => {
            commit('setUser', data);
        },
        loadHistory: ({commit}, {data}) => {
            commit('setHistory', data)
        },
        changeBalance: ({commit}, {paymentSum}) => {
            commit('descBalance', paymentSum)
        }
    },
    getters: {
        getHistoryByIdCategory: state => id => {
            return state.history.filter((element) => {
                if (parseInt(id) === 0) {
                    return element;
                }
                if (element.categoryId === parseInt(id)) {
                    return element;
                }
            });
        }
    },
    mounted() {
        alert('sda')
    }
});
