<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title class="text-h5 font-weight-regular blue-grey white--text">
            RTDE CONNECT
          </v-card-title>
          <v-card-text>
            <v-subheader class="pa-0">
              The Robot Station Select to Realtime Monitor
            </v-subheader>
            <v-row class="mx-0">
              <v-col cols="3">
                <v-subheader>Station</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select v-model="slected" :item="data_select1" dense outlined item-text="item" label="View-Data"
                  persistent-hint return-object single-line></v-select>
              </v-col>

            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: ()=> ({
    slected: { item: "Screwing" },
      data_select1: [
        { item: "Screwing" },
        { item: "Assembly" },
        { item: "Inspection" },
        { item: "Palletizer" },
        { item: "MiR" },]

  }),
  mounted() {
    this.startOpen();
  },
  computed: {
  },
  methods: {
    async rtdeConnect(ip) {
      await axios.post('http://localhost:4444/connect', {
        ipAdd: ip,
      })
        .then((res) => {
          var data = res.data[0];
          this.ipInputField = data.ip;
          this.rtdeState = data.status
          // location.reload();
        })
        .catch((error) => {
          console.log(error);
        });


    },
    async rtdeDisconnect() {
      await axios.get('http://localhost:4444/disconnect')
        .then((res) => {
          var data = res.data[0];
          this.ipInputField = data.ip;
          this.rtdeState = data.status
          // location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    startOpen: function () {
      axios.get("http://localhost:4444/getConnection").then((res) => {
        var data = res.data[0];
        this.ipInputField = data.ip;
        this.rtdeState = data.status
      });
    },

  },



};
</script>
