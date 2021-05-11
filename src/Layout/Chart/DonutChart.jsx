import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class DonutChart extends Component {
    state = {
        options: {
            responsive: [
                {
                    breakpoint: 1350,
                    options: {
                        chart: {
                            width: 340
                        }
                    }
                }
            ]
        },
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    }
    render() {
        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />  {/* type='pie' */}
            </div>
        )
    }
}
