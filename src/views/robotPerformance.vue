<template>
  <v-container class="mb-10" fluid>
    <!-- All Voltage Card-->
    <v-row class="ma-2">
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-0 rounded-xl" :style="shadow">
          <v-list two-line color="bg_card">
            <template v-for="(item, index) in items.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-avatar color="#7680F0">
                  <v-icon color="white" size="30" v-text="item.ico"></v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title
                  id="card_Main"
                    class="mx-3"
                    v-text="item.title"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text-center mt-2"
                    id="sub_text"
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="(item, i) in rt_energy" :key="i">
        <v-card class="rounded-xl" color="bg_card" :style="shadow">
          <v-list-item two-line>
            <v-row dense justify="start">
              <v-col cols="7">
                <v-list-item-content>
                  <v-list-item-icon class="ml-3">
                    <v-avatar :color="item.color">
                      <v-icon color="white" size="40" v-text="item.ico"></v-icon>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-title
                    class="ml-3"
                    id="card_Main"
                  >
                    {{ item.lable }}
                  </v-list-item-title>
                  <v-list-item-title id="val_text" class="ml-5 mt-2">
                    {{ item.val }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-3 mt-6 mb-3">
                    UNIVERSAL ROBOT
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="5" class="d-flex align-center justify-center">
                <div>
                  <v-progress-circular
                    :value="item.percent"
                    width="10"
                    :color="item.color"
                    size="100"
                    class="text-h6 font-weight-bold"
                    >{{ item.percent }} %</v-progress-circular
                  >
                </div>
              </v-col>
            </v-row>
          </v-list-item>
        </v-card>
      </v-col>
      {{ info }}
    </v-row>

    <!-- Current & Voltage Chart-->
    <v-row dense class="mt-2 ma-3">
      <v-col cols="12" md="4">
        <v-card
          v-for="(item, i) in chartView"
          :key="i"
          class="mx-2 ma-4 rounded-lg"
          color="bg_card"
          :style="shadow"
        >
          <v-card-title class="text-subtitle-2 text-start mx-5">
            {{ item.lable }}
          </v-card-title>
          <v-list-item one-line>
              <canvas :id="item.byID"></canvas>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="mx-2 ma-3 rounded-lg" color="bg_card" :style="shadow">
          <v-card-title class="text-h5 text-start mt-2 mb-2 mx-5">
            {{ chartView2.lable }}
          </v-card-title>
          <v-list-item one-line>
            <v-list-item-content>
              <canvas :id="chartView2.byID"></canvas>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import EnergyChart from "../chart/lineChart";
import dataTable from "../table/jointdescript";
import axios from "axios";

const myLine1 = null;
const myLine2 = null;
const myLine3 = null;

const Chart1 = new EnergyChart();
const Chart2 = new EnergyChart();
const Chart3 = new EnergyChart();

export default {
  name: "HelloWorld",

  data: () => ({
    info: null,
    rt_energy: [
      {
        lable: "Main Voltage",
        ico: "mdi-current-ac",
        color: "#41F0BA",
        val: "1",
        percent : "0",
      },
      {
        lable: "Robot Voltage",
        ico: "mdi-current-dc",
        color: "#7680F0",
        val: "2",
        percent : "0",
      },
      { lable: "Robot Curent", ico: "mdi-flash", color: "#FF7887", val: "3", percent : "0",},
    ],
    items: [
      {
        title: "Time",
        subtitle: "305s",
        ico: "update",
      },
      { divider: true, inset: true },
      {
        title: "Robot Status",
        subtitle: "Power On",
        ico: "bookmark",
      },
      { divider: true, inset: true },
      {
        title: "Safety Status",
        subtitle: "protective stopped",
        ico: "announcement",
      },
    ],
    chartView: [
      { lable: "Voltage", byID: "my-chart1" },
      { lable: "Current", byID: "my-chart2" },
    ],
    chartView2: {
      lable: "Power",
      byID: "my-chart3",
      val: "0",
    },
    dataTable: dataTable,
    myLine1: myLine1,
    myLine2: myLine2,
    myLine3: myLine3,
    Chart1: Chart1,
    Chart2: Chart2,
    Chart3: Chart3,
    polling: null,
    address :{
        add : "192.168.1.100",
        port : "3000"
    } ,
  }),
  created() {
    this.pollData();
  },
  mounted() {
  this.chartInitlize();
  },
  computed: {
    
    shadow() {
      if (this.$vuetify.theme.dark) {
        return "box-shadow: 0px 20px 35px 0px #0f1215";
      } else {
        return "box-shadow: 0px 20px 35px 0px #DEDFED";
      }
    },
  },
  methods: {
    chartInitlize(){
    this.ctx1 = document.getElementById("my-chart1");
    this.Chart1.data.datasets[0].backgroundColor = "rgba(242,137,151,0.1)";
    this.Chart1.data.datasets[0].borderColor = "#F28997";
    this.Chart1.data.datasets[0].label = "Voltage";
    this.myLine1 = new Chart(this.ctx1, this.Chart1);

    this.ctx2 = document.getElementById("my-chart2");
    this.Chart2.data.datasets[0].backgroundColor = "rgba(249,200,160,0.1)";
    this.Chart2.data.datasets[0].borderColor = "#F9C8A0";
    this.Chart2.data.datasets[0].label = "Current";
    this.myLine2 = new Chart(this.ctx2, this.Chart2);

    this.ctx3 = document.getElementById("my-chart3");
    this.Chart3.data.datasets[0].backgroundColor = "rgba(155,148,190,0.1)";
    this.Chart3.data.datasets[0].borderColor = "#9B94BE";
    this.Chart3.data.datasets[0].label = "Power";
    this.myLine3 = new Chart(this.ctx3, this.Chart3);

    this.Chart1.data.labels = [""];
    this.Chart2.data.labels = [""];
    this.Chart3.data.labels = [""];
    },
    realtime() {
      axios.get("http://192.168.1.19:4444/preformance").then((res) => {
        alert(res.data)
        // this.rt_energy[0].val = parseFloat(res.data.actual_main_voltage).toFixed(1);
        // this.rt_energy[1].val = parseFloat(res.data.actual_robot_voltage).toFixed(1);
        // this.rt_energy[2].val = parseFloat(res.data.actual_robot_current).toFixed(1);
        // // this.rt_energy[0].percent = parseFloat(res.data.actual_main_voltage * 100 / 48).toFixed(1);
        // // this.rt_energy[1].percent = parseFloat(res.data.actual_robot_voltage * 100 / 48).toFixed(1);
        // // this.rt_energy[2].percent = parseFloat(res.data.actual_robot_current * 100 / 5).toFixed(1);
        // this.chartView2.val = parseFloat(res.data.actual_robot_power).toFixed(1);
        // this.items[0].subtitle = parseFloat(res.data.time_stamp).toFixed(0);
        // this.items[2].subtitle = res.data.robot_status;
        // this.items[4].subtitle = res.data.safety_status;

        //this.info = res.data

        this.shitfChart();
      });
    },
    shitfChart() {
      //const today = new Date();
      //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.Chart1.data.datasets[0].data.push(this.rt_energy[1].val);
      //this.Chart1.data.labels.push(time);
      this.Chart2.data.datasets[0].data.push(this.rt_energy[2].val);
      //this.Chart2.data.labels.push(time);
      this.Chart3.data.datasets[0].data.push(this.chartView2.val);
      //this.Chart3.data.labels.push(time);
      this.Chart1.data.labels.push("");
      this.Chart2.data.labels.push("");
      this.Chart3.data.labels.push("");

      if (Chart3.data.labels.length > 20) {
        this.Chart1.data.datasets[0].data.shift();
        this.Chart1.data.labels.shift();
        this.Chart2.data.datasets[0].data.shift();
        this.Chart2.data.labels.shift();
        this.Chart3.data.datasets[0].data.shift();
        this.Chart3.data.labels.shift();
      }
      this.myLine1.update();
      this.myLine2.update();
      this.myLine3.update();
    },
    pollData () {
		this.polling = setInterval(this.realtime,1000)
	},
  },
  beforeDestroy () {
	clearInterval(this.polling)
},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#card_Main {
  font-family: 'Mulish', sans-serif;
  font-size: 17px;
  font-weight:900;
}
#sub_text{
    font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: 700;
}
#val_text{
      font-family: 'Mulish', sans-serif;
  font-size: 28px;
  font-weight: 900;
}
</style>
