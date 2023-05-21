export const state = () => ({
  token: null,
  isAuthenticated: false,
  users: null,
})

export const getters = {
  isAuthenticated: state => state.isAuthenticated,
  token: state => state.token
}

export const actions = {
  login({ commit }, token) {
    commit('SET_TOKEN', token)
    commit('SET_AUTHENTICATED', true)
  },
  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_AUTHENTICATED', false)
  },
}
export const mutations = {
  SET_TOKEN(state, value) {
    state.token = value
    localStorage.setItem('token', value);
  },
  SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value
      localStorage.setItem('isAuthenticated', value);
  },
  SET_USERS(state, value) {
    state.users = value
  },
};