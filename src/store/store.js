import Vue from 'vue'
import Vuex from 'vuex';

const types = {
    SAVE_IS_ONLINE: 'SAVE_IS_ONLINE'
}

Vue.use(Vuex);

const isOnline = localStorage.getItem('isOnline');

export const store = new Vuex.Store({
    state: {
        count: 0,
        isOnline: isOnline
    },
    actions: {
        saveIsOnline({ commit }, payload) {
            commit(types.SAVE_IS_ONLINE, payload)
        }
    },
    mutations: {
        [types.SAVE_IS_ONLINE](state, payload) {
            state.isOnline = payload
        }
    }
})