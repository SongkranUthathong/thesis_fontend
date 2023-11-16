<template>
  <v-container fluid>
    <v-row class="ma-3">
      <!-- Card Robot Show Speed -->
      <v-col cols="12" md="4">
        <v-card class="rounded-xl" color="bg_robot" :style="shadow2">
          <v-card-text class="text-subtitle-1 text-start font-weight-bold"
            >UNIVERSAL ROBOT UR5</v-card-text
          >
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img src="../img/ur10e.png" max-width="50%"></v-img>
          </div>

          <v-card-subtitle class="text-start font-weight-bold mx-2">
            Speed Value ( {{processLine.value}}% )
          </v-card-subtitle>
          <div class="mx-7">
            <v-progress-linear
              color="pink accent-2"
              buffer-value="0"
              :value="processLine.value"
              height="10"
              stream
            ></v-progress-linear>
            <br />
          </div>
        </v-card>
      </v-col>
        <v-col cols="12" md="8">
        <v-card class="rounded-lg" color="bg_card" :style="shadow">
          <v-select
            class="mx-6"
            v-model="selectTable"
            :items="itemsTable"
            item-text="lable"
            label="View-Data"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-simple-table class="mx-1" :style="tableColorChange">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Joint Name</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in showTable" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td class="text-start">{{ item.val }} {{ item.unit }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
      <v-row class="ma-3">
      <v-col cols="12">

        <div>
          <v-select
          v-model="selectChart"
            :items="itemsChart"
            item-text="lable"
            label="Realtime Data Steamming"
            return-object
            @change="chartInitlize()"
          ></v-select>
          <!-- Chart Show -->
          <v-row class="" dense>
            <v-col cols="12" md="4" xl="4" v-for="(item, i) in chartCanvas" :key="i">
              <v-card class="rounded-lg" color="bg_card" :style="shadow">
                <v-card-title class="text-subtitle-1">{{
                  item.name
                }}</v-card-title>
                <v-list-item one-line>
                  <canvas :id="item.chartID"></canvas>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import Line2Axis from "../chart/lineChart2Axis";
import axios from "axios";

const Axis1 = new Line2Axis();
const Axis2 = new Line2Axis();
const Axis3 = new Line2Axis();
const Axis4 = new Line2Axis();
const Axis5 = new Line2Axis();
const Axis6 = new Line2Axis();

const chartAxis1 = null;
const chartAxis2 = null;
const chartAxis3 = null;
const chartAxis4 = null;
const chartAxis5 = null;
const chartAxis6 = null;

const ctx1 = null;
const ctx2 = null;
const ctx3 = null;
const ctx4 = null;
const ctx5 = null;
const ctx6 = null;

const allAxis = [Axis1, Axis2, Axis3, Axis4, Axis5, Axis6];

const allChartID = [
  "my-chart1",
  "my-chart2",
  "my-chart3",
  "my-chart4",
  "my-chart5",
  "my-chart6",
];

const allCtx = [ctx1, ctx2, ctx3, ctx4, ctx5, ctx6];

const allChartView = [
  chartAxis1,
  chartAxis2,
  chartAxis3,
  chartAxis4,
  chartAxis5,
  chartAxis6,
];

export default {
  data: () => ({
    allAxis: allAxis,
    allCtx: allCtx,
    allChartID: allChartID,
    allChartView: allChartView,
    processLine:{
      value:"0"
    },
    selectChart:{
        lable: "Actual joint currents & Target joint currents",
        _apiBody: { actual_current: 1 ,target_current:1},
        _index: ["actual_current", "target_current"],
        _unit: "A",
    },
    itemsChart: [
      {
        lable: "Actual joint currents & Target joint currents",
        _apiBody: { actual_current: 1 ,target_current:1},
        _index: ["actual_current", "target_current"],
        _unit: "A",
      },
      {
        lable: "Actual joint positions & Target joint positions",
        _apiBody: { actual_q: 1 ,target_q:1},
        _index: ["actual_q", "target_q"],
        _unit: "rad",
      },
      {
        lable: "Actual joint velocities & Target joint velocities",
        _apiBody: { actual_qd: 1 ,target_qd:1},
        _index: ["actual_qd", "target_qd"],
        _unit: "rad/s",
      },
    ],
    chartCanvas: [
      {
        name: "Base Joint",
        chartID: "my-chart1",
      },
      {
        name: "Shoulder Joint",
        chartID: "my-chart2",
      },
      {
        name: "Elbow Joint",
        chartID: "my-chart3",
      },
      {
        name: "Wrist1 Joint",
        chartID: "my-chart4",
      },
      {
        name: "Wrist2 Joint",
        chartID: "my-chart5",
      },
      {
        name: "Wrist3 Joint",
        chartID: "my-chart6",
      },
    ],
    showTable: [
      {
        name: "Base Joint",
        val: 0,
        unit: "",
      },
      {
        name: "Shoulder Joint",
        val: 0,
        unit: "",
      },
      {
        name: "Elbow Joint",
        val: 0,
        unit: "",
      },
      {
        name: "Wrist1 Joint",
        val: 0,
        unit: "",
      },
      {
        name: "Wrist2 Joint",
        val: 0,
        unit: "",
      },
      {
        name: "Wrist3 Joint",
        val: 0,
        unit: "",
      },
    ],
    selectTable: {
      lable: "Actual joint positions",
      _apiBody: { actual_q: 1 },
      _index: "actual_q",
      _unit: "rad",
    },
    itemsTable: [
      {
        lable: "Actual joint positions",
        _apiBody: { actual_q: 1 },
        _index: "actual_q",
        _unit: "rad",
      },
      {
        lable: "Actual joint velocities",
        _apiBody: { actual_qd: 1 },
        _index: "actual_qd",
        _unit: "rad/s",
      },
      {
        lable: "Actual joint voltages",
        _apiBody: { actual_joint_voltage: 1 },
        _index: "actual_joint_voltage",
        _unit: "V",
      },
      {
        lable: "Actual joint currents",
        _apiBody: { actual_current: 1 },
        _index: "actual_current",
        _unit: "A",
      },
      {
        lable: "Joint Temperature",
        _apiBody: { joint_temperatures: 1 },
        _index: "joint_temperatures",
        _unit: "C",
      },
    ],
    address :{
        add : "192.168.1.100",
        port : "3000"
    } ,
  }),
  computed: {
    shadow() {
      if (this.$vuetify.theme.dark) {
        return "box-shadow: 0px 20px 35px 0px #0f1215";
      } else {
        return "box-shadow: 0px 20px 35px 0px #DEDFED";
      }
    },
    shadow2() {
      if (this.$vuetify.theme.dark) {
        return "box-shadow: 0px 20px 35px 0px #0f1215";
      } else {
        return "box-shadow: 8px 8px 15px 0px #DEDFED";
      }
    },
    tableColorChange() {
      if (this.$vuetify.theme.dark) {
        return "background-color: #212528";
      } else {
        return "background-color: #FAFBFF";
      }
    },
  },
  created() {
    this.pollData();
  },
  mounted() {
    //alert(this.allAxis.length)
    this.chartInitlize();
  },
  methods: {
    chartInitlize() {
      for (let i = 0; i < this.allAxis.length; i++) {
        this.allCtx[i] = document.getElementById(this.allChartID[i]);
        this.allAxis[i].data.datasets[0].backgroundColor =
          "rgba(0,255,0,0.0)";
        this.allAxis[i].data.datasets[0].borderColor = "#4BC2F3";
        this.allAxis[i].data.datasets[1].backgroundColor =
          "rgba(231,65,126,0.3)";
        this.allAxis[i].data.datasets[1].borderColor = "#E7417E";
        this.allChartView[i] = new Chart(this.allCtx[i], this.allAxis[i]);
        this.allAxis[i].data.datasets[0].data = [0];
        this.allAxis[i].data.datasets[1].data = [0];
        //const today = new Date();
        //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.allAxis[i].data.labels = [""];
      }
    },
    streamdata() {
      //console.log(this.tbslect)
      let _tbApi = this.selectTable._apiBody;
      let _chartApi = this.selectChart._apiBody;
      
      let _body = Object.assign(_tbApi,_chartApi,{speed_scaling:1})
      axios
        .get("http://localhost:4444/steam", _body)
        .then((res) => {
          const _len = res.data[0][this.selectTable._index].length;
          for (let i = 0; i < _len; i++) {
            this.showTable[i].val = parseFloat(
              res.data[0][this.selectTable._index][i]
            ).toFixed(2);
            this.showTable[i].unit = this.selectTable._unit;


            this.processLine.value = res.data[0].speed_scaling * 100;
            //const today = new Date();
            //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this.allAxis[i].data.datasets[0].label = this.selectChart._index[0];
            this.allAxis[i].data.datasets[1].label = this.selectChart._index[1];


            this.allAxis[i].data.datasets[0].data.push(
              res.data[0][this.selectChart._index[0]][i]
            );
            this.allAxis[i].data.datasets[1].data.push(
              res.data[0][this.selectChart._index[1]][i]
            );
            this.allAxis[i].data.labels.push("");

          }
          if(allAxis[5].data.labels.length > 200){
              for (let j = 0; j < _len; j++) {
              this.allAxis[j].data.datasets[0].data.shift();
              this.allAxis[j].data.datasets[1].data.shift();
              this.allAxis[j].data.labels.shift();
              }
            }
            this.allChartView[0].update();
            this.allChartView[1].update();
            this.allChartView[2].update();
            this.allChartView[3].update();
            this.allChartView[4].update();
            this.allChartView[5].update();
          //alert(res.data[0][this.selectChart._index][0]);
          _body = {};
          _tbApi={};
          _chartApi={};
        })
        .catch((error) => {
          console.log("Error put data from backend");
          console.error(error);
        });
    },
        pollData () {
		this.polling = setInterval(this.streamdata,50)
	},
    showData() {
      alert(this.selectChart._index[0]);
    },
  },
    beforeDestroy () {
	clearInterval(this.polling)
},
};
</script>

<style>
</style>