<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-select
          :items="info"
          label="Select Date"
          prepend-icon="mdi-calendar"
          request
          @change="getValueSlect($event)"
        >
          <option value="{{" item-value }}></option>
        </v-select>
      </v-col>
    </v-row>

    <v-btn tile color="primary" @click="onChange()">
      <v-icon left> mdi-magnify </v-icon>
      SEARCH
    </v-btn>

    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-checkbox
          v-for="item in checkLog"
          class="mx-2"
          :key="item.text"
          :label="item.text"
          :color="item.color"
          @change="getValueCheck([item.index, $event])"
        >
        </v-checkbox>
      </v-col>
    </v-row>
    <div class="d-flex align-center mb-5">
      <v-img
        max-height="40"
        max-width="40"
        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Universal_robots_logo.svg"
      ></v-img>
      <h1 class="light-blue--text text--darken-3 mx-3">UR Log Viewer</h1>
    </div>
    <v-data-table
      :headers="headers"
      :items="historyLog"
      :items-per-page="5"
      class="elevation-1"
    >
    <template v-slot:[`item.ER_Category`]="{ item }">
        <v-icon
        large
        :color="getColor(item.ER_Category)"
        >{{getIcons(item.ER_Category)}}</v-icon>  
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    info: [],
    historyLog: [],
    LogIndex: 0,
    CheckboxIndex: [false, false, false, false],
    checkLog: [
      {
        text: "Info",
        color: "primary",
        index: 0,
      },
      {
        text: "Warning",
        color: "yellow darken-2",
        index: 1,
      },
      {
        text: "Error",
        color: "red",
        index: 2,
      },
      {
        text: "Developer Message",
        color: "orange accent-3",
        index: 3,
      },
    ],
    headers: [
      {
        text: "Date Time",
        value: "DateTime",
      },
      { text: "Error Source", value: "ER_Source" },
      { text: "Error Code", value: "ER_Code" },
      { text: "Error Category", value: "ER_Category" },
      { text: "Description", value: "descript" },
    ],
    TestTable :  [
    {
        "DateTime": " 2022-07-07 08:53:04.746 ",
        "ER_Source": "Polyscope",
        "ER_Code": " C0A0:0 ",
        "ER_Category": "1",
        "descript": " URSoftware 5.12.1.1101497 (Jun 20 2022) s/n: 20225202444 : UR10   "
    }
    ]
       ,
  }),
  created() {
    axios.get("http://192.168.1.100:3000/logtime").then((response) => {
      console.log(response.data);
      this.info = response.data;
    });
  },
  methods: {
    getValueSlect(value) {
      this.LogIndex = this.info[value].text;
      console.log(this.LogIndex);
    },
    getValueCheck(value) {
      switch (value[0]) {
        case 0:
          this.CheckboxIndex[0] = value[1];
          break;
        case 1:
          this.CheckboxIndex[1] = value[1];
          break;
        case 2:
          this.CheckboxIndex[2] = value[1];
          break;
        case 3:
          this.CheckboxIndex[3] = value[1];
          break;
      }
      console.log(this.CheckboxIndex);
    },
    onChange() {
      axios
        .put("http://192.168.1.100:3000/monitorreq", {
          index: this.LogIndex,
          content: this.CheckboxIndex,
        })
        .then((response) => {
          console.log(response.data);
          this.historyLog = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getIcons(value){

      if(value == 1 || value == 129){
        return "mdi-information";
      }else if(value == 2 || value == 130){
        return "mdi-alert";
      }
      else if(value == 3 || value == 131){
        return "mdi-close-octagon";
      }
      else if(value == 128){
        return "mdi-clipboard-alertn";
      }   
    },
    getColor(value){
      if(value == 1){
        return "primary";
      }else if(value == 2){
        return "yellow";
      }
      else if(value == 3){
        return "red";
      }
      else if(value == 128 || value == 129 || value == 130 || value == 131){
        return "orange";
      }   
    }
  },
};
</script>
