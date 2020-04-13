'use strict';

var csvData;
var backgroundColor = 'rgb(255, 59, 132)';

let colo

// canvas contexts
const canvases = {
    a: document.getElementById('chart1').getContext('2d'),
    b: document.getElementById('chart2').getContext('2d'),
    c: document.getElementById('chart3').getContext('2d'),
    d: document.getElementById('chart4').getContext('2d')
};

const charts = Object.keys(canvases).map(key => {
    return new Chart(canvases[key], {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor,
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45, 50]
        }]
    },

    // Configuration options go here
    options: {}
    })
})