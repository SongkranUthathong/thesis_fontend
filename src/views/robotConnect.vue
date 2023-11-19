<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="text-h5 font-weight-regular blue-grey white--text">
            STATION STEAMING
          </v-card-title>
          <v-card-text>
            <v-subheader class="pa-0">
              The Robot Station Select to Realtime Monitor
            </v-subheader>
            <v-row class="mx-0">
              <v-col cols="2">
                <v-subheader>Server</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
            label="Address"
            v-model="serveip"
          ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-subheader>Port</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
            label="Port"
            v-model="serveport"
          ></v-text-field>
              </v-col>

            </v-row>
            <v-row class="mx-0">
              <v-col cols="3">
                <v-subheader>Station</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
            v-model="slected"
            :items="data_select1"
            item-text="item"
            label="item"
            persistent-hint
            return-object
            single-line
          ></v-select>
              </v-col>

            </v-row>
            <v-row justify="end">
              <v-col cols ="2" class="mx-10">
                <v-btn
      depressed
      color="primary"
      @click="selectedStation(slected,serveip,serveport)"
    >
      Accept
    </v-btn>
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
import Vue from 'vue'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies, { expires: '7d'})

export default {
  data: ()=> ({
    slected: { item: "Screwing",value :"station1" },
      data_select1: [
        { item: "Screwing",size :"UR5-CBSeries",value :"station1",index : 0 },
        { item: "Assembly",size :"UR3-eSeries",value :"station2",index : 1 },
        { item: "Inspection",size :"UR3-eSeries",value :"station3",index : 2 },
        { item: "Palletizer",size :"UR10-CBSeries",value :"station4",index : 3 },
        { item: "MiR",size :"UR5-eSeries",value :"station5",index : 4 },],
      serveip:"127.0.0.1",
      serveport:"3000",
  }),
  mounted() {
    this.startOpen();
  },
  computed: {

  },
  methods: {
    selectedStation(station,address,port){
      this.$cookies.set('apiStation',station);
      this.$cookies.set('servehost',address);
      this.$cookies.set('serveport',port);
      alert(station.item +" | " + station.value + " | " + address + " | " + port);
    },
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
    startOpen() {
      this.slected = this.$cookies.get('apiStation')
      this.serveip = this.$cookies.get('servehost') 
      this.serveport = this.$cookies.get('serveport') 
    },

  },



};
</script>
