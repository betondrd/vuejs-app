<template>
  <div name="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { api } from "@/services";
import { loadSession } from "@/services/authentication";

export default {
  name: "App",

  beforeMount() {
    this.startSession();
  },

  methods: {
    ...mapActions(["setSign", "signOut"]),

    async startSession() {
      try {
        const token = this.$store.getters.token;

        if (token) {
          //request configure
          await this.requestConfigure(token);

          //check session
          await loadSession().then((res) => {
            this.setSign({ token: res.token, user: res.user });
          });
        }
      } catch (err) {
        console.log("error", err);
      }
    },

    requestConfigure(token) {
      //header authorization
      api.defaults.headers.common["Authorization"] = token;

      //check if authenticated
      api.interceptors.response.use(
        (res) => responseSuccess(res),
        (err) => responseFailed(err)
      );

      const responseSuccess = (res) => Promise.resolve(res);

      const responseFailed = (err) => {
        if ([401, 403].includes(err.response.status)) {
          this.signOut();
        }

        return Promise.reject(err);
      };
    },
  },
};
</script>

<style>
</style>