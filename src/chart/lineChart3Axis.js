class LineChart3Axis{
    constructor()
    {
        this.type = "line",
        this.data = {
          labels: [],
          datasets: [
            {
              label: 'Axis1',
              data: [0],
              backgroundColor: "rgba(0,0,0,0)",
              pointRadius: 0,
              borderColor: "#EF9A9A",
              borderWidth: 2,
              tension: .1
            },
            {
                label: "Axis2",
                data: [0],
                backgroundColor: "rgba(0,0,0,0)",
                pointRadius: 0,
                borderColor: "#A5D6A7",
                borderWidth: 2,
                tension: .1
              },
              {
                label: "Axis3",
                data: [0],
                backgroundColor: "rgba(0,0,0,0)",
                pointRadius: 0,
                borderColor: "#81D4FA",
                borderWidth: 2,
                tension: .1
              },
          ]
        },
        this.options= {
            responsive: true,
            //lineTension: 1,
            scales: {
              xAxes:[
                {
                  ticks:{
                    display: 'true',
                    maxTicksLimit : 200
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    padding: 1
                  }
                  ,
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
                }
              ]
            },
            //legend : {display : false}
          }
    }
  }
  
  module.exports = LineChart3Axis;