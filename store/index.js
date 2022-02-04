import ApiService from '~/services/apiService'

export const state = () => ({
  alldata: [],
  data: {}
})

export const actions = {
  fetchAllData({ commit }) {
    return ApiService.getalldata().then((response) => {
      commit('SET_alldata', response.data)
    }).catch(error => {})
  },
  fetchData({ commit }, id) {
    return ApiService.getdata(id).then((response) => {
      commit('SET_data', response.data)
    }).catch(error => {})
  },
  addData({ commit }, data) {
    return ApiService.createdata(data).then((response) => {
      commit('ADD_data', data)
    }).catch(error => {})
  },
  deleteData({ commit }, id) {
    return ApiService.removeDataById(id).then((response) => {
      commit('DELETE_data')
    }).catch(error => {})
  },
  putData({ state }, id) {
    return ApiService.putDataById(id, state.data).then((response) => {
      commit('DELETE_data')
    }).catch(error => {})
  }
}
