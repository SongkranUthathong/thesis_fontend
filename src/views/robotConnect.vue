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
              The IP/Address robot
            </v-subheader>
            <v-row class="mx-0">
              <v-col cols="3">
                <v-subheader>IP/Address</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="ipInputField" label="Universal Robot IP"></v-text-field>
              </v-col>

            </v-row>
            <div class="d-flex justify-end">
                <v-btn v-if="rtdeState == false" @click="rtdeConnect(ipInputField)" color="#5CBBF6" elevation="2">CONNECT</v-btn>
                <v-btn v-else-if="rtdeState == true" @click="rtdeDisconnect(ipInputField)" color="#FF5555" elevation="2">DISCONNECT</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
       return {
        ipInputField : null,
        rtdeState : null
        }
    },
    mounted() {
      this.startOpen();
  },
  computed:{
  },
  methods: {
    async rtdeConnect(ip) {
     await axios.post('http://localhost:4444/connect', {
        ipAdd: ip,
      })
        .then((res) =>{
          var data = res.data[0];
          this.ipInputField = data.ip;
          this.rtdeState = data.status
          // location.reload();
        })
        .catch((error) =>{
          console.log(error);
        });
        

    },
    async rtdeDisconnect(){
        await axios.get('http://localhost:4444/disconnect')
        .then( (res) =>{
          var data = res.data[0];
          this.ipInputField = data.ip;
          this.rtdeState = data.status
          // location.reload();
        })
        .catch( (error) => {
          console.log(error);
        });
    },
    startOpen : function(){
        axios.get("http://localhost:4444/getConnection").then((res) => {
        var data = res.data[0];
          this.ipInputField = data.ip;
          this.rtdeState = data.status
      });
    },

    },


    
};
</script>
