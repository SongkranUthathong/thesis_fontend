<template>
  <v-container>
    <v-item-group multiple>
      <v-container fluid>
        <div class="mb-5 d-flex">
          <h2 class="mr-auto">Digital Input/Output & Analog Input/Output</h2>
          <v-switch
            class="mx-3"
            label="WRITE"
            color="indigo"
            hide-details
            @change="ChangeMode($event)"
          ></v-switch>
        </div>
        <v-row>
          <v-col
            v-for="items in digitalIO"
            :key="items.HeadLable"
            cols="12"
            md="6"
            lg="3"
            
          >
            <v-card :style="shadow" color="bg_card" class="rounded-lg">
              <div class="pa-5">
                <div class="text-h5 text-center font-weight-black">
                  {{ items.HeadLable }}
                </div>
              </div>

              <v-sheet class="mx-8 pb-7" color="transparent">
                <v-row
                >
                  <v-col
                    v-for="datashow in items.port"
                    :key="datashow"
                    cols="6"
                    class="d-flex justify-center"
                  >
                  <div
                  v-if="datashow.tg === true"
                  class="d-flex flex-row"
                  >
                    <v-card
                      
                      class="mx-5"
                      :color="
                        datashow.act ? datashow.io_color : 'grey darken-1'
                      "
                      height="30"
                      width="30"
                      @click="digitalOutput(datashow.idex, datashow.act)"
                    >
                    </v-card>
                    <div class="d-flex align-center button font-weight-medium">
                      {{ datashow.txt_port }}
                    </div>
                  </div>

                  <div
                  class="d-flex flex-row"
                  v-else-if="datashow.tg === false"
                  >
                  <v-card
                      
                      class="mx-5"
                      :color="
                        datashow.act ? datashow.io_color : 'grey darken-1'
                      "
                      height="30"
                      width="30"
                    >
                    </v-card>
                    <div class="d-flex align-center button font-weight-medium">
                      {{ datashow.txt_port }}
                    </div>
                  </div>
                    
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6">
            <v-card :style="shadow" color="bg_card" class="rounded-lg">
              <div class="pa-5 text-h5 text-center font-weight-black">
                Analog Input
              </div>
              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[0]
                </v-col>
                <v-col cols="7" justify="center">
                  <v-progress-linear color="bg_io" rounded height="18">
                    <h4 class="align-center">{{ AnalogIn[0].value }}{{ AnalogIn[0].unit }}</h4>
                  </v-progress-linear>
                  <div class="d-flex justify-space-between">
                    <h5 class="">{{ AnalogIn[0].txtMin }}</h5>
                    <h5 class="">{{AnalogIn[0].txtMax}}</h5>
                  </div>
                </v-col>
                <v-col class="button font-weight-medium text-start" cols="2">
                  Volt
                </v-col>
              </v-row>
              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[1]
                </v-col>
                <v-col cols="7" justify="center">
                  <v-progress-linear color="bg_io" rounded height="18" :value="AnalogIn[1].value">
                    <h4 class="align-center">{{ AnalogIn[1].value }}{{ AnalogIn[1].unit }}</h4>
                  </v-progress-linear>
                  <div class="d-flex justify-space-between">
                    <h5 class="">{{ AnalogIn[1].txtMin }}</h5>
                    <h5 class="">{{AnalogIn[1].txtMax}}</h5>
                  </div>
                </v-col>
                <v-col class="button font-weight-medium text-start" cols="2">
                  Volt
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            v-for="items in tooldigitlIO"
            :key="items.HeadLable"
            cols="12"
            md="6"
            lg="3"
            
          >
            <v-card :style="shadow" color="bg_card" class="rounded-lg">
              <div class="pa-5">
                <div class="text-h5 text-center font-weight-black">
                  {{ items.HeadLable }}
                </div>
              </div>

              <v-sheet class="mx-8" color="transparent">
                <v-row
                >
                  <v-col
                    class="mt-5 mb-5 pb-10 d-flex justify-center"
                    cols="6"
                    v-for="datashow in items.port"
                    :key="datashow"
                  >
                    <v-card
                      v-if="datashow.tg === true"
                      class="mx-5 align-center"
                      :color="
                        datashow.act ? datashow.io_color : 'grey darken-1'
                      "
                      height="30"
                      width="30"
                      @click="TooldigitalOutput(datashow.idex, datashow.act)"
                    >
                    </v-card>
                    <v-card
                      v-else-if="datashow.tg === false"
                      class="mx-5 align-center"
                      :color="
                        datashow.act ? datashow.io_color : 'grey darken-1'
                      "
                      height="30"
                      width="30"
                    >
                    </v-card>
                    <div class="d-flex align-center button font-weight-medium">
                      {{ datashow.txt_port }}
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6">
            <v-card :style="shadow" color="bg_card" class="rounded-lg">
              <div class="pa-5 text-h5 text-center font-weight-black">
                Analog Output
              </div>
              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[0]
                </v-col>
                <v-col cols="7" justify="center">
                  <v-slider
                    v-model="analog0"
                    max="1000"
                    :min = "AnalogOut[0].anaMin"
                    color="bg_io"
                    :disabled="!EnableSlide"
                    @change="analogOut($event)"
                  ></v-slider>
                </v-col>
                <v-col class="" cols="2">
                  <p class="button font-weight-medium text-start"
                  v-text="(analog0*AnalogOut[0].anaFactor).toFixed(2) +AnalogOut[0].anaUnit"
                  >
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[1]
                </v-col>
                <v-col cols="7" justify="center">
                  <v-slider
                    v-model="analog1"
                    max="1000"
                    :min = "AnalogOut[1].anaMin"
                    color="bg_io"
                    :disabled="!EnableSlide"
                    @change="analogOut($event)"
                  ></v-slider>
                </v-col>
                <v-col class="" cols="2">
                  <p class="button font-weight-medium text-start"
                  v-text="(analog1*AnalogOut[1].anaFactor).toFixed(2) + AnalogOut[1].anaUnit"
                  >
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card :style="shadow" color="bg_card" class="rounded-lg">
              <div class="pa-5 mb-3 text-h5 text-center font-weight-black">
                Tool Analog Input
              </div>
              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[2]
                </v-col>
                <v-col cols="7" justify="center">
                  <v-progress-linear color="bg_io" rounded height="18">
                    <h4 class="align-center">5V</h4>
                  </v-progress-linear>
                  <div class="d-flex justify-space-between">
                    <h5 class="">0V</h5>
                    <h5 class="">10V</h5>
                  </div>
                </v-col>
                <v-col class="button font-weight-medium text-start" cols="2">
                  Volt
                </v-col>
              </v-row>
              <v-row>
                <v-col class="button font-weight-medium text-center" cols="3">
                  CH[0]
                </v-col>
                <v-col cols="7" justify="center" class="mb-5">
                  <v-progress-linear color="bg_io" rounded height="18">
                    <h4 class="align-center">5V</h4>
                  </v-progress-linear>
                  <div class="d-flex justify-space-between">
                    <h5 class="">0V</h5>
                    <h5 class="">10V</h5>
                  </div>
                </v-col>
                <v-col class="button font-weight-medium text-start" cols="2">
                  Volt
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    digitalIO: [
      {
        HeadLable: "Configurable Input",
        bg_color: "yellow lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "CI0",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI1",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI2",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI3",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI4",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI5",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI6",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CI7",
            act: false,
            tg: false,
          },
        ],
      },
      {
        HeadLable: "Configurable Output",
        bg_color: "yellow lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "CO0",
            act: false,
            tg: false,
            idex: [1, 0],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO1",
            act: false,
            tg: false,
            idex: [1, 1],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO2",
            act: false,
            tg: false,
            idex: [1, 2],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO3",
            act: false,
            tg: false,
            idex: [1, 3],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO4",
            act: false,
            tg: false,
            idex: [1, 4],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO5",
            act: false,
            tg: false,
            idex: [1, 5],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO6",
            act: false,
            tg: false,
            idex: [1, 6],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "CO7",
            act: false,
            tg: false,
            idex: [1, 7],
          },
        ],
      },
      {
        HeadLable: "Digital Input",
        bg_color: "blue lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "DI0",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI1",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI2",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI3",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI4",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI5",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI6",
            act: false,
            tg: false,
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DI7",
            act: false,
            tg: false,
          },
        ],
      },
      {
        HeadLable: "Digtal Output",
        bg_color: "blue lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "DO0",
            act: false,
            tg: false,
            idex: [3, 0],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO1",
            act: false,
            tg: false,
            idex: [3, 1],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO2",
            act: false,
            tg: false,
            idex: [3, 2],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO3",
            act: false,
            tg: false,
            idex: [3, 3],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO4",
            act: false,
            tg: false,
            idex: [3, 4],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO5",
            act: false,
            tg: false,
            idex: [3, 5],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO6",
            act: false,
            tg: false,
            idex: [3, 6],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "DO7",
            act: false,
            tg: false,
            idex: [3, 7],
          },
        ],
      },
    ],
    tooldigitlIO: [
      {
        HeadLable: "Tool Digital Input",
        bg_color: "yellow lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "TI0",
            act: false,
            tg: false,
            idex: [0, 0],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "TI1",
            act: false,
            tg: false,
            idex: [0, 1],
          },
        ],
      },
      {
        HeadLable: "Tool Digital Output",
        bg_color: "yellow lighten-4",
        port: [
          {
            io_color: "indigo accent-1",
            txt_port: "TO0",
            act: false,
            tg: false,
            idex: [1, 0],
          },
          {
            io_color: "indigo accent-1",
            txt_port: "TO1",
            act: false,
            tg: false,
            idex: [1, 1],
          },
        ],
      },
    ],
    analog0 : 0,
    analog1 : 0,
    AnalogOut:[
      {
    anaFactor : 0,
    anaMin : 0,
    anaUnit : "V",
      },
      {
        
    anaFactor : 0,
    anaMin : 0,
    anaUnit : "V",
      }
    ],

    AnalogIn:[
      {
        value : 0,
        txtMin : "0V",
        txtMax : "10V",
        Max:10,
        Min:0,
        unit : " V"
      },
      {
        value : 0,
        txtMin : "0V",
        txtMax : "10V",
        Max:10,
        Min:0,
        unit : " V"
      },
    ],
    

    EnableSlide : false,
  }),
  created() {
    this.pollData();
  },
  computed: {
    shadow() {
      if (this.$vuetify.theme.dark) {
        return "box-shadow: 0px 20px 35px 0px #0f1215";
      } else {
        return "box-shadow: 8px 8px 15px 0px #DEDFED";
      }
    },
  },
  methods: {
    ReadDeviceInput() {
      axios.get("http://192.168.1.100:3000/readdevice").then((res) => {

        var _ArrOfCI = res.data.conf_digital_input;
        var _ArrOfCO = res.data.conf_digital_output;
        var _ArrOfDI = res.data.std_digital_input;
        var _ArrOfDO = res.data.std_digital_output;
        var _ArrofTI = res.data.tool_digital_input;
        var _ArrofTO = res.data.tool_digital_output;

        _ArrOfCI.forEach((element, index) => {
          this.digitalIO[0].port[index].act = element;
        });
        _ArrOfCO.forEach((element, index) => {
          this.digitalIO[1].port[index].act = element;
        });
        _ArrOfDI.forEach((element, index) => {
          this.digitalIO[2].port[index].act = element;
        });
        _ArrOfDO.forEach((element, index) => {
          this.digitalIO[3].port[index].act = element;
        });
        _ArrofTI.forEach((element, index) => {
          this.tooldigitlIO[0].port[index].act = element;
        });
        _ArrofTO.forEach((element, index) => {
          this.tooldigitlIO[1].port[index].act = element;
        });
        if(res.data.analog_io_types[2] == true){
          this.analog0 = 100*res.data.standard_analog_output0;
          this.AnalogOut[0].anaFactor = 10/1000;
          this.AnalogOut[0].anaMin = 0;
          this.AnalogOut[0].anaUnit = " V";
        }
        else{
          this.analog0 = 50000*res.data.standard_analog_output0;
          this.AnalogOut[0].anaFactor = 20/1000;
          this.AnalogOut[0].anaMin = 200;
          this.AnalogOut[0].anaUnit = " mA";
        }
        if(res.data.analog_io_types[3] == true){
          
          this.analog1 = 100*res.data.standard_analog_output1;
          this.AnalogOut[1].anaFactor = 0.01;
          this.AnalogOut[1].anaMin = 0;
          this.AnalogOut[1].anaUnit = " V";
        }
        else{
          this.analog1 = 50000*res.data.standard_analog_output1;
          this.AnalogOut[1].anaFactor = 20/1000;
          this.AnalogOut[1].anaMin = 200;
          this.AnalogOut[1].anaUnit = " mA";

        }
        if(res.data.analog_io_types[0] == true){
          this.AnalogIn[0].value = res.data.standard_analog_input0;
          this.AnalogIn[0].Max = 10;this.AnalogIn[0].Min = 0;
          this.AnalogIn[0].txtMax = "10V"; this.AnalogIn[0].txtMin = "0V";
          this.AnalogIn[0].unit = " V";
        }else{
          this.AnalogIn[0].value = res.data.standard_analog_input0;
          this.AnalogIn[0].Max = 0.02;this.AnalogIn[0].Min = 0.004;
          this.AnalogIn[0].txtMax = "20mA"; this.AnalogIn[0].txtMin = "4mA";
          this.AnalogIn[0].unit = " mA";
        }
        if(res.data.analog_io_types[1] == true){
          this.AnalogIn[1].value = res.data.standard_analog_input1;
          this.AnalogIn[1].Max = 10;this.AnalogIn[1].Min = 0;
          this.AnalogIn[1].txtMax = "10V"; this.AnalogIn[1].txtMin = "0V";
          this.AnalogIn[1].unit = " V";
        }else{
          this.AnalogIn[1].value = res.data.standard_analog_input1;
          this.AnalogIn[1].Max = 0.02;this.AnalogIn[1].Min = 0.004;
          this.AnalogIn[1].txtMax = "20mA"; this.AnalogIn[1].txtMin = "4mA";
          this.AnalogIn[1].unit = " mA";
        }
        

      });
    },
    digitalOutput(index, vlaue) {
      if (vlaue) {
        this.digitalIO[index[0]].port[index[1]].act = false;
      } else {
        this.digitalIO[index[0]].port[index[1]].act = true;
      }
    },
    TooldigitalOutput(index, vlaue) {
      if (vlaue) {
        this.tooldigitlIO[index[0]].port[index[1]].act = false;
      } else {
        this.tooldigitlIO[index[0]].port[index[1]].act = true;
      }
    },
    ChangeMode(value) {
      this.EnableSlide = value;
      this.digitalIO[1].port.forEach((element) => {
        element.tg = value;
      });
      this.digitalIO[3].port.forEach((element) => {
        element.tg = value;
      });
      this.tooldigitlIO[1].port.forEach((element) => {
        element.tg = value;
      });
    },
    analogOut(value) {
      console.log(value);
    },
    pollData() {
      this.polling = setInterval(this.ReadDeviceInput, 1000);
    },
  },
};
</script>
