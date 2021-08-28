import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { orderService } from '../../Service';

export default class LineChart extends Component {
    state = {
        series: [
            // {
            //     name: "High - 2013",
            //     data: [28, 29, 33, 36, 32, 32, 33]
            // },
            // {
            //     name: "Low - 2013",
            //     data: [12, 11, 14, 18, 17, 13, 13]
            // }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#008FFB', '#FF0000'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Tổng số vé 5 tháng gần nhất',
                style: {
                    fontFamily: 'Time New Romans',
                    fontSize: '18px'
                },
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Tháng'
                }
            },
            yaxis: {
                title: {
                    text: 'Tổng số vé',
                    style: {
                        fontFamily: 'Time New Romans',
                        fontSize: '18px'
                    }
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            noData: {
                text: 'Loading...',
                offsetX: 30,
                offsetY: -30,
                style: {
                    fontSize: 45,
                }
            }
        },
    };
    componentDidMount() {
        orderService.getCountOrder()
            .then(res => {
                this.setState({
                    series: [...this.state.series,
                    {
                        name: 'Đạt được',
                        type: 'line',
                        data: res.data.countOrderArr
                    },
                    {
                        name: 'Mục Tiêu',
                        type: 'line',
                        data: [5, 7, 6, 2, 4]
                    }
                    ],
                    options: { ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: res.data.monthArr } }
                })
            })
    }
    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        )
    }
}
