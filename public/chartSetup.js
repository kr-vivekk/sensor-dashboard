// Arrays to store sensor data and timestamps
let humArr = [], tempArr = [], gasArr = [], lightArr = [], soilArr = [], ultraArr = [], timeArr = [];

// Highcharts configuration for Humidity and Temperature Sensor Data
let myChart1 = Highcharts.chart('container1', {
    title: {
        text: 'Humidity and Temperature Sensor Data'
    },
    subtitle: {
        text: 'Real-time Humidity and Temperature Data Visualization'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        categories: timeArr,
        title: {
            text: 'Timestamp'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    series: [{
        name: 'Humidity',
        data: humArr,
        zones: [
            { value: 25, color: 'blue' },
            { value: 35, color: 'green' },
            { color: 'red' }  // Applies to values over 35
        ]
    }, {
        name: 'Temperature',
        data: tempArr,
        zones: [
            { value: 25, color: 'blue' },
            { value: 35, color: 'green' },
            { color: 'red' }  // Applies to values over 35
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 250
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

// Highcharts configuration for Gas Sensor Data
let myChart2 = Highcharts.chart('container2', {
    title: {
        text: 'Gas Sensor Data'
    },
    subtitle: {
        text: 'Real-time Gas Data Visualization'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        categories: timeArr,
        title: {
            text: 'Timestamp'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    series: [{
        name: 'Gas',
        data: gasArr,
        zones: [
            { value: 25, color: 'blue' },
            { value: 35, color: 'green' },
            { color: 'red' }  // Applies to values over 35
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 250
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

// Highcharts configuration for Light Sensor Data
let myChart3 = Highcharts.chart('container3', {
    title: {
        text: 'Light Sensor Data'
    },
    subtitle: {
        text: 'Real-time Light Data Visualization'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        categories: timeArr,
        title: {
            text: 'Timestamp'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    series: [{
        name: 'Light',
        data: lightArr,
        zones: [
            { value: 0, color: 'green' },
            { value: 1, color: 'black' },
            { color: 'red' }  
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 250
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

// Highcharts configuration for Soil Moisture Sensor Data
let myChart4 = Highcharts.chart('container4', {
    title: {
        text: 'Soil Moisture Sensor Data'
    },
    subtitle: {
        text: 'Real-time Soil Moisture Data Visualization'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        categories: timeArr,
        title: {
            text: 'Timestamp'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    series: [{
        name: 'Soil Moisture',
        data: soilArr,
        zones: [
            { value: 25, color: 'red' },
            { value: 35, color: 'green' },
            { value: 1000, colour: 'red'},
            { color: 'blue' }  // Applies to values over 35
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 250
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

// Highcharts configuration for Ultrasonic Sensor Data
let myChart5 = Highcharts.chart('container5', {
    title: {
        text: 'Ultrasonic Sensor Data'
    },
    subtitle: {
        text: 'Real-time Distance Data Visualization'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        categories: timeArr,
        title: {
            text: 'Timestamp'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    series: [{
        name: 'Distance',
        data: ultraArr,
        zones: [
            { value: 30, color: 'green' },
            { value: 100, color: 'blue' },
            { color: 'red' }  // Applies to values over 35
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 250
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});
