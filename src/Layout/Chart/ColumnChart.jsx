import React, { Component } from 'react'
import Chart from "react-apexcharts";

export default class ColumnChart extends Component {
    state = {
        options: {
            chart: {
                id: "basic-bar",
                zoom: {
                    enable: true,
                    type: 'x',
                    autoScaleYaxis: false
                }
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                tickPlacement: 'on'
            },
            title: {
                text: 'Doanh thu theo từng tháng',
                align: 'center',
                style: {
                    fontFamily: 'Time New Romans',
                    fontSize: '18px'
                }
            },
            responsive: [
                {
                    breakpoint: 1500,
                    options: {
                        chart: {
                            width: 400
                        },
                        title: {
                            align: 'left'
                        }
                    }
                }
            ]
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };
    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar" //type='line'/'area',
                width="500"
            />
        )
    }
}
