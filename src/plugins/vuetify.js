import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';



Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            background:'#F4F5FD',
            ls_inside : "#737FE3",
            bg_card : "#FAFBFF",
            bg_robot: "#7EC8E3",
          },
          dark: {
            background:'#181A1E',
            ls_inside : "#737FE3",
            bg_card : "#212528",
            bg_robot: "#7EC8E3",
          },
        },
      },
});
