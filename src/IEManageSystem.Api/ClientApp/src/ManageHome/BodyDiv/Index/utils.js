'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

var Samples = global.Samples || (global.Samples = {});
var Color = global.Color;

Samples.utils = {
  // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  srand: function(seed) {
    this._seed = seed;
  },

  rand: function(min, max) {
    var seed = this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  },

  numbers: function(config) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 1;
    var from = cfg.from || [];
    var count = cfg.count || 8;
    var decimals = cfg.decimals || 8;
    var continuity = cfg.continuity || 1;
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand() <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  },

  labels: function(config) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var count = cfg.count || 8;
    var step = (max - min) / count;
    var decimals = cfg.decimals || 8;
    var dfactor = Math.pow(10, decimals) || 0;
    var prefix = cfg.prefix || '';
    var values = [];
    var i;

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor);
    }

    return values;
  },

  months: function(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = Months[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  },

  color: function(index) {
    return COLORS[index % COLORS.length];
  },

  transparentize: function(color, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return Color(color).alpha(alpha).rgbString();
  }
};

// DEPRECATED
window.randomScalingFactor = function() {
  return Math.round(Samples.utils.rand(-100, 100));
};

// INITIALIZATION

Samples.utils.srand(Date.now());

// Google Analytics
/* eslint-disable */
if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-28909194-3', 'auto');
  ga('send', 'pageview');
}

var presets = window.chartColors;
var utils = Samples.utils;

var inputs = {
  min: -100,
  max: 100,
  count: 8,
  decimals: 2,
  continuity: 1
};

function generateData(config) {
  return utils.numbers(Chart.helpers.merge(inputs, config || {}));
}

function generateLabels(config) {
  return utils.months(Chart.helpers.merge({
    count: inputs.count,
    section: 3
  }, config || {}));
}

// reset the random seed to generate the same data for all charts
utils.srand(8);

var color = Chart.helpers.color;
var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var color = Chart.helpers.color;
var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

export function createChart()
{
  $(function(){
    new Chart('chart-2', {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          backgroundColor: utils.transparentize(presets.blue),
          borderColor: presets.blue,
          data: generateData(),
          label: 'Dataset',
          fill: 'start',
        }]
      },
      
      options: {
        maintainAspectRatio: false,
        spanGaps: false,
        scaleShowLabels : false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              display: false
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false
            }
          }]
        },
        title: {
          display: false
        },
        legend: {
          display: false
        },
      }
    });


    new Chart('chart-3', {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          backgroundColor: utils.transparentize(presets.red),
          borderColor: presets.red,
          data: generateData(),
          label: 'Dataset',
          fill: 'start',
        }]
      },
      
      options: {
        maintainAspectRatio: false,
        spanGaps: false,
        scaleShowLabels : false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              display: false
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false
            }
          }]
        },
        title: {
          display: false
        },
        legend: {
          display: false
        },
      }
    });


    new Chart('chart-4', {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          backgroundColor: utils.transparentize(presets.green),
          borderColor: presets.green,
          data: generateData(),
          label: 'Dataset',
          fill: 'start',
        }]
      },
      
      options: {
        maintainAspectRatio: false,
        spanGaps: false,
        scaleShowLabels : false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              display: false
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false
            }
          }]
        },
        title: {
          display: false
        },
        legend: {
          display: false
        },
      }
    });


    new Chart('chart-5', {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          backgroundColor: utils.transparentize(presets.yellow),
          borderColor: presets.yellow,
          data: generateData(),
          label: 'Dataset',
          fill: 'start',
        }]
      },
      
      options: {
        maintainAspectRatio: false,
        spanGaps: false,
        scaleShowLabels : false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              display: false
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false
            }
          }]
        },
        title: {
          display: false
        },
        legend: {
          display: false
        },
      }
    });

    var ctxDoughnut = document.getElementById('chart-doughnut').getContext('2d');
    window.myDoughnut = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            borderWidth : 6,
            hoverBorderColor : 'white',
            backgroundColor: [
              color(window.chartColors.red).alpha(0.7).rgbString(),
              color(window.chartColors.yellow).alpha(0.7).rgbString(),
              color(window.chartColors.blue).alpha(0.7).rgbString(),
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Europe',
            'Asia',
            'Other',
          ]
        },
        options: {
          responsive: true,
          cutoutPercentage: 70,
          legend: {
            position: 'bottom',
            display: false,
          },
          title: {
            display: false,
            text: 'Chart.js Doughnut Chart'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
    });

    var ctxDoughnut = document.getElementById('chart-doughnut').getContext('2d');
    window.myDoughnut = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            borderWidth : 6,
            hoverBorderColor : 'white',
            backgroundColor: [
              color(window.chartColors.red).alpha(0.7).rgbString(),
              color(window.chartColors.yellow).alpha(0.7).rgbString(),
              color(window.chartColors.blue).alpha(0.7).rgbString(),
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Europe',
            'Asia',
            'Other',
          ]
        },
        options: {
          responsive: true,
          cutoutPercentage: 70,
          legend: {
            position: 'bottom',
            display: false,
          },
          title: {
            display: false,
            text: 'Chart.js Doughnut Chart'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
    });


    $('#prev').on('click', function() {
      $('#calendar').fullCalendar('prev'); // call method
    });

    $('#next').on('click', function() {
      $('#calendar').fullCalendar('next'); // call method
    });

    $('#today').on('click', function() {
      $('#calendar').fullCalendar('today'); // call method
    });


    $('#list-view').on('click', function() {
      $('#calendar').fullCalendar( 'changeView', 'list'); // call method
    });

    $('#week-view').on('click', function() {
      $('#calendar').fullCalendar( 'changeView', 'basicWeek'); // call method
    });

    $('#day-view').on('click', function() {
      $('#calendar').fullCalendar( 'changeView', 'agenda'); // call method
    });

    $('#month-view').on('click', function() {
      $('#calendar').fullCalendar( 'changeView', 'month'); // call method
    });
  })
  
}