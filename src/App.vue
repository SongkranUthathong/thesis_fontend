<template >
  <v-app class="myFont" :style="{ background: $vuetify.theme.themes[theme].background }">
    <Appbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "./components/Appbar.vue";

export default {
  name: "App",

  components: {
    Appbar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  data: () => ({
    txt1: "light",
  }),
};
</script>

<style>

html,
body {
  font-family: "Montserrat", sans-serif;
}

</style>
