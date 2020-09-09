import Vue from 'vue'
import Vuex from 'vuex';

const types = {
    SAVE_IS_ONLINE: 'SAVE_IS_ONLINE',
    SAVE_SEARCH_PHASE: 'SAVE_SEARCH_PHASE'
}

Vue.use(Vuex);

const isOnline = localStorage.getItem('isOnline');

const store = new Vuex.Store({
    state: {
        count: 0,
        isOnline: isOnline,
        searchPhase: ""
    },
    actions: {
        saveIsOnline({ commit }, payload) {
            commit(types.SAVE_IS_ONLINE, payload)
        },

        saveSearchPhase({ commit }, payload) {
            commit(types.SAVE_SEARCH_PHASE, payload)
        },
    },
    mutations: {
        [types.SAVE_IS_ONLINE](state, payload) {
            state.isOnline = payload
        },

        [types.SAVE_SEARCH_PHASE](state, payload) {
            state.searchPhase = payload
        }
    },
    getters: {
        searchPhase: state => state.searchPhase
    }
});

export default store;