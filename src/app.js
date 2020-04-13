new Vue({
  el: '#app',
  data: {
    backgroundColor: 'rgb(24, 59, 132)',
    borderColor: 'rgb(99, 59, 132)',
    weightData: null,
    bmiChart: null,
    weightChart: null
  },
  methods: {
    newChart(id, options) {
      return new Chart(id, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: options.labels, // array
          datasets: [{
            label: options.label,
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            data: options.data // array
          }]
        },

        // Configuration options go here
        options: {}
      });
    },
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      result = `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
      return result;
    },
    onColorChange() {
      // set new color
      const newColor = this.hexToRgb(document.getElementById('color').value);
      this.backgroundColor = this.borderColor = newColor;

      // redraw chart with new options
      this.chart = this.newChart('chart', {
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor
      })
    },
    getWeightData() {

      // testing data, todo implement csv upload 
      let weightData =`
      3.11 .2019, 102.3
      10.11 .2019, 102.2
      17.11 .2019, 102
      24.11 .2019, 100.9
      1.12 .2019, 100.1
      8.12 .2019, 99.5
      15.12 .2019, 99.1
      22.12 .2019, 98.9
      29.12 .2019, 99.1
      5.01 .2020, 98.4
      12.01 .2020, 99.3
      19.01 .2020, 98.2
      26.01 .2020, 97.9
      2.02 .2020, 97.1
      9.02 .2020, 97.1
      16.02 .2020, 96.2
      23.02 .2020, 95.4
      1.03 .2020, 95.7
      8.03 .2020, 96.9
      15.03 .2020, 94.9
      22.03 .2020, 97
      29.03 .2020, 95.3
      5.04 .2020, 94.6
      12.04 .2020, 94.1`;

      let mappedData = weightData
        .split('\n')
        .map(x => {
          let row = x.replace(/\s/g, '').split(',');

          return {
            date: row[0],
            weight: row[1]
          };
        });

      return mappedData;
    }
  },
  mounted() {

    let data = this.getWeightData();

    // weight chart
    this.weightChart = this.newChart('chart-weight', {
      label: "Weight",
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      labels: data.map(x => x.date),
      data: data.map(x => x.weight)
    });

    // bmi chart
    this.bmiChart = this.newChart('chart-bmi', {
      label: 'BMI',
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      labels: data.map(x => x.date),
      data: data.map(x => x.weight / Math.pow(1.88, 2))
    });
  }
})