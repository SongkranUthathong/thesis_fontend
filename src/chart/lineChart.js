class LineChart{
  constructor()
  {
      this.type = "line",
      this.data = {
        labels: [],
        datasets: [
          {
            label: "###",
            data: [],
            backgroundColor: "rgba(0,0,0,0)",
            pointRadius: 0,
            borderColor: "#000000",
            borderWidth: 2,
            tension: .1
          },
  
        ]
      },
      this.options= {
          responsive: true,
          lineTension: 1,
          scales: {
            xAxes:[
              {
                ticks:{
                  display: 'true',
                  maxTicksLimit : 200
                }                  ,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 30
                }                  ,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
              }
            ]
          },
          legend : {display : false}
        }
  }
}

module.exports = LineChart;