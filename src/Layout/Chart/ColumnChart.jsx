import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { orderService } from '../../Service';

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
                categories: [],
                tickPlacement: 'on'
            },
            title: {
                text: 'Top 5 bến xe được book nhiều nhất',
                align: 'left',
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
                        // title: {
                        //     align: 'left'
                        // }
                    }
                },
                {
                    breakpoint: 576,
                    options: {
                        chart: {
                            width: 350,
                            toolbar: {
                                show: false
                            }
                        },
                        title: {
                            align: 'center'
                        }
                    }
                }
            ],
            yaxis: {
                title: {
                    text: 'Số lần book',
                    style: {
                        fontFamily: 'Time New Romans',
                        fontSize: 15
                    }
                },
                labels: {
                    formatter: (value) => { return value },
                }
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
        series: [
            // {
            //     name: "Profit",
            //     data: []
            // }
        ]
    };
    componentDidMount() {
        orderService.getTop5Station()
            .then(res => {
                this.setState({
                    series: [...this.state.series, { name: 'Số lần đặt', data: res.data.dataArr }],
                    options: { ...this.state.options, xaxis: { ...this.state.xaxis, categories: res.data.categoryArr } }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
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
