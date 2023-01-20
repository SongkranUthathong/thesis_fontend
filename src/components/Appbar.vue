<template>
<div>
  <v-app-bar app color="background" elevation="0">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <div id="font_bar" class="mt-0">Dashboard</div>
    <v-spacer></v-spacer>
    <v-switch v-model="$vuetify.theme.dark" color="ls_inside"></v-switch>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" floating app color="background">
    
    <v-list  dense class="mt-5">
      <v-list-item-group v-model="SelectedItem" mandatory >
        <v-list-item
          class="mt-3 mx-7"
          v-for="(item, i) in items"
          :key="i"
          active-class="border description"
          color="ls_inside"
          @click="$router.push(item.rout)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
     SelectedItem: 0,
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", title: "Performance" ,rout:"/"},
      {icon: "precision_manufacturing", title: "Steaming" ,rout:"/stream"},
      { icon: "insert_chart_outlined", title: "LogView",rout:"/viewlog"},
      { icon: "mdi-expansion-card", title: "Device I/O",rout:"/device"},
    ],
  }),
        computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#font_bar {
  font-family: 'Mulish', sans-serif;
  font-size: 38px;
  font-weight: 900;
}
</style>