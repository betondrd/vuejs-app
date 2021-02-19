import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { api } from "@/services";

Vue.use(Vuex);

export default new Vuex.Store({
  //persist storage on refresh instance
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, //session storage
    }),
  ],

  state: {
    token: null,
    user: null,
  },

  getters: {
    isLogged: ({ token, user }) => !!token && !!user, //return the session logged
    token: ({ token }) => token, //return the token
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload; //set token on state storage
    },

    SET_USER(state, payload) {
      state.user = payload; //set user on state storage
    },
  },

  actions: {
    setToken({ commit }, payload) {
      commit("SET_TOKEN", payload);
      api.defaults.headers.common["Authorization"] = payload; //set header authorization
    },

    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },

    setSign({ dispatch }, payload) {
      //set session storage
      dispatch("setToken", payload.token);
      dispatch("setUser", payload.user);
    },

    signOut({ dispatch }) {
      //clear session storage
      dispatch("setToken", null);
      dispatch("setUser", null);
    },
  },

  modules: {},
});
