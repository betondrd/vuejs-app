<template>
  <div class="flex-container">
    <form class="flex-item">
      <div class="row">
        <button type="button" @click="submit()">Sign Out</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Auth",

  data() {
    return {};
  },

  methods: {
    ...mapActions(["signOut"]),

    async submit() {
      this.signOut().then(() => {
        this.$router.push({ name: "Auth" });
      });
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
</style>
