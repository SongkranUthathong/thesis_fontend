<template>
    <v-container class="mb-10" fluid>
        <!-- All Voltage Card-->
        <v-row class="ma-2">

            <!-- Card Robot Show Speed -->
            <v-col xs="12" md="4">
                <v-card class="rounded-xl" color="bg_robot" :style="shadow2">
                    <v-card-text
                        class="text-subtitle-1 text-start font-weight-bold">{{ this.$cookies.get('apiStation').size }} :
                        {{ this.$cookies.get('apiStation').item }}</v-card-text>
                    <div class="d-flex flex-column justify-space-between align-center">
                        <v-img src="../img/ur10e.png" max-width="23%"></v-img>
                    </div>

                    <v-card-subtitle class="text-start font-weight-bold mx-2">
                        Speed Value ( {{ speed_scale }}% )
                    </v-card-subtitle>
                    <div class="mx-7">
                        <v-progress-linear color="pink accent-2" buffer-value="0" height="10" :value="speed_scale"
                            stream></v-progress-linear>
                        <br />
                    </div>
                </v-card>
            </v-col>
            <!-- Card Robot Show Speed -->


            <v-col sm="12" md="4">
        <v-card class="mx-0 rounded-lg" :style="shadow">
          <v-list two-line color="bg_card">
            <template v-for="(item, index) in forec_info.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-avatar :color=item.color>
                  <v-icon color="white" size="25" v-text="item.ico"></v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title
                  id="card_Main"
                    class="mx-3"
                    v-text="item.lable"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text-center"
                    id="sub_text"
                    v-text="item.val + ' '+item.unit"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col sm="12" md="4">
        <v-card class="mx-0 rounded-lg" :style="shadow">
          <v-list two-line color="bg_card">
            <template v-for="(item, index) in torque_info.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item.title">
                <v-avatar :color=item.color>
                  <v-icon color="white" size="22" v-text="item.ico"></v-icon>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title
                  id="card_Main"
                    class="mx-3"
                    v-text="item.lable"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text-center"
                    id="sub_text"
                    v-text="item.val + ' '+item.unit"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>

            

            
        </v-row>







        <!-- Current & Voltage Chart-->
        <v-row dense class="mt-2 ma-3">
            <v-col cols="12" md="6">
                <v-card v-for="(item, i) in chartView" :key="i" class="mx-2 ma-4 rounded-lg" color="bg_card"
                    :style="shadow">
                    <v-card-title class="text-subtitle-2 text-start mx-5">
                        {{ item.lable }}
                    </v-card-title>
                    <v-list-item one-line>
                        <canvas width="100" height="35" :id="item.byID"></canvas>
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
import FTScale from "../chart/lineChart";
import ForceTorqueChart from "../chart/lineChart3Axis";
import dataTable from "../table/jointdescript";
import axios from "axios";

const myLine1 = null;
const myLine2 = null;
const myLine3 = null;

const Chart1 = new ForceTorqueChart();
const Chart2 = new ForceTorqueChart();
const Chart3 = new FTScale();

export default {
    name: "HelloWorld",

    data: () => ({
        info: null,
        
        forec_info: [
            {
                lable: "Force - FX",
                ico: "mdi-current-ac",
                color: "#EF9A9A",
                val: "1",
                percent: "0",
                unit: "N"
            },
            { divider: true, inset: true },
            {
                lable: "Force - FY",
                ico: "mdi-current-dc",
                color: "#A5D6A7",
                val: "2",
                percent: "0",
                unit: "N"
            },
            { divider: true, inset: true },
            {
                lable: "Force - FZ",
                ico: "mdi-flash",
                color: "#81D4FA",
                val: "3",
                percent: "0",
                unit: "N"
            },
        ],
        torque_info: [
            {
                lable: "Torque - TX",
                ico: "mdi-current-ac",
                color: "#EF9A9A",
                val: "1",
                percent: "0",
                unit: "Nm"
            },
            { divider: true, inset: true },
            {
                lable: "Torque - TY",
                ico: "mdi-current-dc",
                color: "#A5D6A7",
                val: "2",
                percent: "0",
                unit: "Nm"
            },
            { divider: true, inset: true },
            {
                lable: "Torque - TZ",
                ico: "mdi-flash",
                color: "#81D4FA",
                val: "3",
                percent: "0",
                unit: "Nm"
            },
        ],
        chartView: [
            { lable: "TCP FORCE", byID: "my-chart1" },
            { lable: "TCP TORQUE", byID: "my-chart2" },
        ],
        chartView2: {
            lable: "TCP FORCE SCALAR",
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
        speed_scale: 0.0,
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
        chartInitlize() {
            this.ctx1 = document.getElementById("my-chart1");
            // this.Chart1.data.datasets[0].backgroundColor = "rgba(242,137,151,0.1)";
            this.Chart1.data.datasets[0].label = "FX";
            // this.Chart1.data.datasets[0].backgroundColor = "rgba(242,137,151,0.1)";
            this.Chart1.data.datasets[1].label = "FY";
            // this.Chart1.data.datasets[0].backgroundColor = "rgba(242,137,151,0.1)";
            this.Chart1.data.datasets[2].label = "FZ";
            this.myLine1 = new Chart(this.ctx1, this.Chart1);

            this.ctx2 = document.getElementById("my-chart2");
            // this.Chart2.data.datasets[0].backgroundColor = "rgba(249,200,160,0.1)";
            // this.Chart2.data.datasets[0].borderColor = "#F9C8A0";
            this.Chart2.data.datasets[0].label = "TX";
            this.Chart2.data.datasets[1].label = "TY";
            this.Chart2.data.datasets[2].label = "TZ";
            this.myLine2 = new Chart(this.ctx2, this.Chart2);

            this.ctx3 = document.getElementById("my-chart3");
            this.Chart3.data.datasets[0].backgroundColor = "rgba(155,148,190,0.1)";
            this.Chart3.data.datasets[0].borderColor = "#9B94BE";
            this.Chart3.data.datasets[0].label = "Force Scalar";
            this.myLine3 = new Chart(this.ctx3, this.Chart3);

            this.Chart1.data.labels = [""];
            this.Chart2.data.labels = [""];
            this.Chart3.data.labels = [""];

            if (Chart3.data.labels.length > 200) {
                this.Chart1.data.datasets[0].data.shift();
                this.Chart1.data.datasets[1].data.shift();
                this.Chart1.data.datasets[2].data.shift();
                this.Chart1.data.labels.shift();
                this.Chart2.data.datasets[0].data.shift();
                this.Chart2.data.datasets[1].data.shift();
                this.Chart2.data.datasets[2].data.shift();
                this.Chart2.data.labels.shift();
                this.Chart3.data.datasets[0].data.shift();
                this.Chart3.data.labels.shift();
            }

            // for (let j = 0; j < 199; j++) {
            //     this.Chart1.data.datasets[0].data.push(0);
            //     this.Chart1.data.datasets[1].data.push(0);
            //     this.Chart1.data.datasets[2].data.push(0);
            //     //this.Chart1.data.labels.push(time);
            //     this.Chart2.data.datasets[0].data.push(0);
            //     this.Chart2.data.datasets[1].data.push(0);
            //     this.Chart2.data.datasets[2].data.push(0);
            // //this.Chart2.data.labels.push(time);

            // }
            // this.myLine1.update();
            //     this.myLine2.update();
            //     this.myLine3.update();
        },
        realtime() {
            axios.get("http://" + this.$cookies.get('servehost') + ":" + this.$cookies.get('serveport') + "/" + this.$cookies.get('apiStation').value + "/forcetorque").then((res) => {
                var resPreformance = res.data[0];
                
                this.forec_info[0].val = parseFloat(resPreformance.actual_TCP_force[0]).toFixed(1);
                this.forec_info[2].val = parseFloat(resPreformance.actual_TCP_force[1]).toFixed(1);
                this.forec_info[4].val = parseFloat(resPreformance.actual_TCP_force[2]).toFixed(1);

                this.torque_info[0].val = parseFloat(resPreformance.actual_TCP_force[3]).toFixed(1);
                this.torque_info[2].val = parseFloat(resPreformance.actual_TCP_force[4]).toFixed(1);
                this.torque_info[4].val = parseFloat(resPreformance.actual_TCP_force[5]).toFixed(1);


                this.speed_scale = (resPreformance.speed_scaling * 100).toFixed(1);

                // this.rt_energy[0].percent = parseFloat(resPreformance.actual_main_voltage * 100 / 48).toFixed(1);
                // this.rt_energy[1].percent = parseFloat(resPreformance.actual_robot_voltage * 100 / 48).toFixed(1);
                // this.rt_energy[2].percent = parseFloat(resPreformance.actual_robot_current * 100 / 5).toFixed(1);
                this.chartView2.val = parseFloat(resPreformance.tcp_force_scalar).toFixed(1);

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
            this.Chart1.data.datasets[0].data.push(this.forec_info[0].val);
            this.Chart1.data.datasets[1].data.push(this.forec_info[2].val);
            this.Chart1.data.datasets[2].data.push(this.forec_info[4].val);
            //this.Chart1.data.labels.push(time);
            this.Chart2.data.datasets[0].data.push(this.torque_info[0].val);
            this.Chart2.data.datasets[1].data.push(this.torque_info[2].val);
            this.Chart2.data.datasets[2].data.push(this.torque_info[4].val);
            //this.Chart2.data.labels.push(time);
            this.Chart3.data.datasets[0].data.push(this.chartView2.val);
            //this.Chart3.data.labels.push(time);
            this.Chart1.data.labels.push("");
            this.Chart2.data.labels.push("");
            this.Chart3.data.labels.push("");

            if (Chart3.data.labels.length > 200) {
                this.Chart1.data.datasets[0].data.shift();
                this.Chart1.data.datasets[1].data.shift();
                this.Chart1.data.datasets[2].data.shift();
                this.Chart1.data.labels.shift();
                this.Chart2.data.datasets[0].data.shift();
                this.Chart2.data.datasets[1].data.shift();
                this.Chart2.data.datasets[2].data.shift();
                this.Chart2.data.labels.shift();
                this.Chart3.data.datasets[0].data.shift();
                this.Chart3.data.labels.shift();
            }
            this.myLine1.update();
            this.myLine2.update();
            this.myLine3.update();
        },
        pollData () {
		this.polling = setInterval(this.realtime,50)
	},
    },
    beforeDestroy() {
        clearInterval(this.polling)
    },
    
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#card_Main {
    font-family: 'Mulish', sans-serif;
    font-size: 18px;
    font-weight: 700;
}

#sub_text {
    font-family: 'Mulish', sans-serif;
    font-size: 18px;
    font-weight: 500;
}

#val_text {
    font-family: 'Mulish', sans-serif;
    font-size: 18px;
    font-weight: 900;
}
</style>
  