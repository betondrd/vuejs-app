<template>
  <div class="flex-container">
    <form class="flex-item">
      <h2 class="title">Authentication</h2>

      <div class="row">
        <input v-model="form.email" placeholder="Username" type="text" />
      </div>

      <div class="row">
        <input v-model="form.password" placeholder="Password" type="password" />
      </div>

      <div class="row">
        <button type="button" @click="submit()">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "@/services/authentication";

export default {
  name: "Auth",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions(["setSign"]),

    async submit() {
      try {
        await signIn(this.form).then(async (res) => {
          this.setSign({ token: res.token, user: res.user }).then(() =>
            this.$router.push({ name: "Home" })
          );
        });
      } catch (err) {
        alert(err.data.message);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.flex-container
  list-style: none
  display: flex
  align-items: center
  justify-content: center

.flex-item
  padding: 5px
  width: 200px
  margin: 10px
  line-height: 16px
  text-align: center

.row
  width: 100%
  margin-bottom: 16px

.title
  font-family: Arial, Helvetica, sans-serif
</style>

