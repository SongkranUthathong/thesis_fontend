<template>
  <v-container class="mb-10" fluid>
    <!-- All Voltage Card-->
    <v-row class="ma-2">
      
      <!-- Card Robot Show Speed -->
      <v-col xs="12" md="3">
        <v-card  class="rounded-xl" color="bg_robot" :style="shadow2">
          <v-card-text class="text-subtitle-1 text-start font-weight-bold"
            >{{this.$cookies.get('apiStation').size}} : {{this.$cookies.get('apiStation').item}}</v-card-text
          >
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img src="../img/ur10e.png" max-width="23%"></v-img>
          </div>

          <v-card-subtitle class="text-start font-weight-bold mx-2">
            Speed Value ( {{speed_scale}}% )
          </v-card-subtitle>
          <div class="mx-7">
            <v-progress-linear
              color="pink accent-2"
              buffer-value="0"
              height="10"
              :value ="speed_scale"
              stream
            ></v-progress-linear>
            <br />
          </div>
        </v-card>
      </v-col>
       <!-- Card Robot Show Speed -->

      
      <v-col sm="12" md="4">
        <v-card class="mx-0 rounded-lg" :style="shadow">
          <v-list two-line color="bg_card">
            <template v-for="(item, index) in items.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-avatar color="#7680F0">
                  <v-icon color="white" size="22" v-text="item.ico"></v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title
                  id="card_Main"
                    class="mx-3"
                    v-text="item.title"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text-center"
                    id="sub_text"
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>





      <v-col sm="12" md="4" >
        <v-row dense justify="start">
          <v-col cols="12" v-for="(item, i) in rt_energy" :key="i">
            <v-card max-width="400" class="pa-2 rounded-lg"  color="bg_card" :style="shadow">
              <div class="d-inline pa-2">
            <v-avatar :color="item.color">
                      <v-icon color="white" size="25" v-text="item.ico"></v-icon>
                    </v-avatar>
          </div>
          <div id="card_Main" class="d-inline pa-1">
            {{ item.lable }} 
          </div>
          <div  id="val_text" class="d-inline ml-6 ">
              {{  item.val }} {{ item.unit }}
          </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      {{ info }}
    </v-row>

<!-- 
      <v-col  sm="3" md="3  " v-for="(item, i) in rt_energy" :key="i">
        <v-card class="rounded-lg" color="bg_card" :style="shadow">
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
                  <v-list-item-subtitle class="ml-3 mt-2 mb-1">
                    UNIVERSAL ROBOT
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-list-item>
        </v-card>
      </v-col> -->







    
    <!-- Current & Voltage Chart-->
    <v-row dense class="mt-2 ma-3">
      <v-col cols="12" md="6">
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
              <canvas width="100" height="35           " :id="item.byID"></canvas>
          </v-list-item>
        </v-card>
      </v-col>


      <v-col cols="12" md="6">
        <v-card class="mx-2 ma-3 rounded-lg" color="bg_card" :style="shadow">
          <v-card-title class="text-h5 text-start mt-2 mb-2 mx-5">
            {{ chartView2.lable }}
          </v-card-title>
          <v-list-item one-line>
            <v-list-item-content>
              <canvas width="400" height="300" :id="chartView2.byID"></canvas>
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
        lable: "Robot Voltage",
        ico: "mdi-current-ac",
        color: "#41F0BA",
        val: "1",
        percent : "0",
        unit : "V"
      },
      {
        lable: "Robot Curente",
        ico: "mdi-current-dc",
        color: "#7680F0",
        val: "2",
        percent : "0",
        unit : "A"
      },
      { lable: "Robot Power", ico: "mdi-flash", color: "#FF7887", val: "3", percent : "0", unit : "W"},
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
    speed_scale : 0.0,
    infomation : [
      {name : "Screwing",robot : "UR5CB",maxPow : "300",maxCurrent : "12.5" },
      {name : "Assembly",robot : "UR3e",maxPow : "390",maxCurrent : "1.772" },
      {name : "Inspection",robot : "UR3e",maxPow : "390",maxCurrent : "1.772" },
      {name : "Palletizer",robot : "UR10CB",maxPow : "300",maxCurrent : "1.772" },
      {name : "MiR",robot : "UR5e",maxPow : "390",maxCurrent : "1.772" },
    ],
  }),
  created() {
    this.pollData();

      // this.slected = this.$cookies.get('apiStation')
      // this.serveip = this.$cookies.get('servehost') 
      // this.serveport = this.$cookies.get('serveport') 
    // this.realtime();
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
      axios.get("http://"+this.$cookies.get('servehost')+":"+this.$cookies.get('serveport')+"/"+this.$cookies.get('apiStation').value+"/preformance").then((res) => {
        var resPreformance = res.data[0];
        console.log(res.data[0])
        this.rt_energy[0].val = parseFloat(resPreformance.actual_robot_voltage).toFixed(1);
        this.rt_energy[1].val = Math.abs(parseFloat(resPreformance.actual_robot_current).toFixed(1));
        var powerRobot = parseFloat(this.rt_energy[0].val * this.rt_energy[1].val).toFixed(1);
        this.rt_energy[2].val = powerRobot;
        this.speed_scale = (resPreformance.speed_scaling * 100).toFixed(1);
        this.statusRobotConv(resPreformance.robot_status_bits)
        this.statusSaftyConv(resPreformance.safety_status_bits)
        console.log(resPreformance.safety_status_bits)
        // this.rt_energy[0].percent = parseFloat(resPreformance.actual_main_voltage * 100 / 48).toFixed(1);
        // this.rt_energy[1].percent = parseFloat(resPreformance.actual_robot_voltage * 100 / 48).toFixed(1);
        // this.rt_energy[2].percent = parseFloat(resPreformance.actual_robot_current * 100 / 5).toFixed(1);
        this.chartView2.val = powerRobot;
        
        // this.items[0].subtitle = parseFloat(resPreformance.runtime_state).toFixed(0);
        // this.items[2].subtitle = resPreformance.robot_status;
        // this.items[4].subtitle = resPreformance.safety_status;

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
		this.polling = setInterval(this.realtime,500)
	},
  statusRobotConv(val){
    switch (val) {
      case 0:
        this.items[1].subtitle = "Power On";
        break;
      case 1:
        this.items[1].subtitle = "Program Running";
        break;
      case 2:
        this.items[1].subtitle = "Teach Button Pressed";
        break;
      case 3:
        this.items[1].subtitle = "Power Button Pressed";
        break;
    }
  },
  statusSaftyConv(val){
    switch (val) {
      case 0:
        this.items[2].subtitle = "normal mode";
        break;
      case 1:
        this.items[2].subtitle = "reduced mode";
        break;
      case 2:
        this.items[2].subtitle = "protective stopped";
        break;
      case 3:
        this.items[2].subtitle = "recovery mode";
        break;
      case 4:
        this.items[2].subtitle = "safeguard stopped";
        break;
      case 5:
        this.items[2].subtitle = "system emergency stopped";
        break;
      case 6:
        this.items[2].subtitle = "robot emergency stopped";
        break;
      case 7:
        this.items[2].subtitle = "emergency stopped";
        break;
      case 8:
        this.items[2].subtitle = "violation";

        this.items[2].subtitle = "fault";
        break;
      case 10:
        this.items[2].subtitle = "stopped due to safety";
        break;
    }
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
  font-size: 18px;
  font-weight:900;
}
#sub_text{
    font-family: 'Mulish', sans-serif;
  font-size: 14px;
  font-weight: 400;
}
#val_text{
      font-family: 'Mulish', sans-serif;
  font-size: 18px;
  font-weight: 900;
}
</style>
