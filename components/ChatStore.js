// Since outside components cannot access the state directly, we need to commit a mutation every time we update the state.
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state : {
    message: {},
  },
  mutations : {
      setMessage(state, {message}) {
        state.message = message;
    },
  },
  getters : {
    getMyUuid: (state) => state.me.uuid,
  },  
});

/* 
Access state : this.store.state.me
Access mutation : this.store.commit('setMe')
Access getters : this.store.getters.getMyUuid
 */