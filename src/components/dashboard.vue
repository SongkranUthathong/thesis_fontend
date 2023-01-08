<template>
  <v-container class="mt-1 mb-10" fluid>
    <!-- All Voltage Card-->
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mx-0 rounded-xl" :style="shadow">
          <v-list two-line>
            <template v-for="(item, index) in items.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-avatar color="#7680F0">
                  <v-icon size="30" v-text="item.ico"></v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-h6 mx-3"
                    v-text="item.title"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text-subtitle-1 text-center mt-2"
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="(item, i) in rt_energy" :key="i">
        <v-card class="mx-0 rounded-xl" color="bg_card" :style="shadow">
          <v-list-item two-line>
            <v-row dense justify="start">
              <v-col cols="7">
                <v-list-item-content>
                  <v-list-item-icon class="ml-3">
                    <v-avatar :color="item.color">
                      <v-icon size="40" v-text="item.ico"></v-icon>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-title
                    class="ml-3 text-subtitle-1 font-weight-bold"
                  >
                    {{ item.lable }}
                  </v-list-item-title>
                  <v-list-item-title class="ml-3 text-h5 mt-2 font-weight-bold">
                    {{ item.val }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-3 mt-8 mb-4">
                    UNIVERSAL ROBOT
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="5" class="d-flex align-center justify-center">
                <div>
                  <v-progress-circular
                    :value="item.val"
                    width="10"
                    :color="item.color"
                    size="100"
                    class="text-h6 font-weight-bold"
                    >{{ item.val }} %</v-progress-circular
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
    <v-row dense>
      <v-col cols="12" md="4">
        <v-card
          v-for="(item, i) in chartView"
          :key="i"
          class="mx-2 ma-3 rounded-xl"
          color="bg_card"
          :style="shadow"
        >
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2 text-start mx-5">
                {{ item.lable }}
              </v-list-item-title>
              <canvas
                :id="item.byID"
              ></canvas>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card
          class="mx-2 ma-3 rounded-xl"
          color="bg_card"
          :style="shadow"
        >
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 text-start mt-2 mb-2 mx-5">
                {{chartView2.lable}}
              </v-list-item-title>
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
        lable: "Main Volage",
        ico: "mdi-current-ac",
        color: "#41F0BA",
        val: "1",
      },
      {
        lable: "Robot Volage",
        ico: "mdi-current-dc",
        color: "#7680F0",
        val: "2",
      },
      { lable: "Robot Curent", ico: "mdi-flash", color: "#FF7887", val: "3" },
    ],
    items: [
      {
        title: "Time",
        subtitle: "305s",
        ico: "mdi-timer",
      },
      { divider: true, inset: true },
      {
        title: "Robot Status",
        subtitle: "Power On",
        ico: "mdi-progress-check",
      },
      { divider: true, inset: true },
      {
        title: "Safety Status",
        subtitle: "protective stopped",
        ico: "mdi-gesture-tap",
      },
    ],

    chartView: [
      { lable: "Voltage", byID: "my-chart1"},
      { lable: "Current", byID: "my-chart2"},
    ],
    chartView2:{
      lable: "Power", byID: "my-chart3" , val : "0"
    }
    ,
    dataTable: dataTable,
    myLine1:myLine1,
    myLine2:myLine2,
    myLine3:myLine3,
    Chart1:Chart1,
    Chart2:Chart2,
    Chart3:Chart3
  }),
  created() {
    //setInterval(this.realtime, 1000);
    //setInterval(this.GetData, 1000);
  },
  mounted() {

    const ctx1 = document.getElementById("my-chart1");
    this.Chart1.data.datasets[0].backgroundColor = "rgba(242,137,151,0.1)";
    this.Chart1.data.datasets[0].borderColor = "#F28997";
    this.Chart1.data.datasets[0].label = "Voltage";
    this.myLine1 = new Chart(ctx1,this.Chart1);

    const ctx2 = document.getElementById("my-chart2");
    this.Chart2.data.datasets[0].backgroundColor = "rgba(249,200,160,0.1)";
    this.Chart2.data.datasets[0].borderColor = "#F9C8A0";
    this.Chart2.data.datasets[0].label = "Current";
    this.myLine2 = new Chart(ctx2, this.Chart2);

    const ctx3 = document.getElementById("my-chart3");
    this.Chart3.data.datasets[0].backgroundColor = "rgba(155,148,190,0.1)";
    this.Chart3.data.datasets[0].borderColor = "#9B94BE";
    this.Chart3.data.datasets[0].label = "Power";
    this.myLine3 = new Chart(ctx3, this.Chart3);
  },
  computed: {
    shadow() {
      if (this.$vuetify.theme.dark) {
        return "box-shadow: 0px 10px 10px 0px #0f1215";
      } else {
        return "box-shadow: 0px 10px 10px 0px #EFF0F7";
      }
    },
  },
  methods: {
    realtime() {
      //const url = "localhost:3000/realtime";
      //alert(">>>.<<<");
      axios.get("http://192.168.1.69:3000/realtime").then((res) => {
        this.rt_energy[0].val = parseFloat(res.data.act_m_vol).toFixed(1);
        this.rt_energy[1].val = parseFloat(res.data.act_r_vol).toFixed(1);
        this.rt_energy[2].val = parseFloat(res.data.act_r_cur).toFixed(1);
        this.chartView2.val = parseFloat(res.data.act_r_pow).toFixed(1);
        this.items[0].subtitle = res.data.time_stamp;
        this.items[1].subtitle = res.data.robot_status;
        this.items[2].subtitle = res.data.safety_status;

        //this.info = res.data
      });
    },
    GetData(){
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.Chart1.data.datasets[0].data.push(this.rt_energy[1].val);
      this.Chart1.data.labels.push(time);
      this.Chart2.data.datasets[0].data.push(this.rt_energy[2].val);
      this.Chart2.data.labels.push(time);
      this.Chart3.data.datasets[0].data.push(this.chartView2.val);
      this.Chart3.data.labels.push(time);

      if(Chart1.data.labels.length > 20){
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
    }
  },
};
</script>
