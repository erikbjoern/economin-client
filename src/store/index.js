import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBudget: {
      id: null,
      amount: null,
      startDay: null,
      startMonth: null,
      startYear: null,
      length: null,
      unit: null,
    }
  },
  mutations: {
    UPDATE_CURRENT_BUDGET(state, payload) {
      state.currentBudget = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
