import React, { Component } from 'react'
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'

let data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
var lastDate = 0;

function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for (var i = 0; i < data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data[i].y = 0
    }

    data.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })
}

export default class LiveLineChart extends Component {
    state = {
        series: [{
            data: data.slice()
        }],
        options: {
            chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Dynamic Updating Chart',
                align: 'left'
            },
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                range: XAXISRANGE,
            },
            yaxis: {
                max: 100
            },
            legend: {
                show: false
            },
        },
    };

    componentDidMount() {
        window.setInterval(() => {
            getNewSeries(lastDate, {
                min: 10,
                max: 90
            })

            ApexCharts.exec('realtime', 'updateSeries', [{
                data: data
            }])
        }, 1000)
    }

    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} /> {/*type='line/area'*/}
            </div>
        )
    }
}
