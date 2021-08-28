import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { orderService } from '../../Service';

export default class MultiColumnChart extends Component {
    state = {
        series: [
            // {
            //     name: 'Income',
            //     type: 'column',
            //     data: [1, 2, 2, 1, 2, 8, 8, 6]
            // }, {
            //     name: 'Cashflow',
            //     type: 'column',
            //     data: [1, 3, 3, 4, 4, 4, 6, 5]
            // }, {
            //     name: 'Revenue',
            //     type: 'line',
            //     data: [20, 29, 37, 36, 44, 45, 50, 58]
            // }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: 'Doanh thu - Lợi nhuận - Target 6 tháng gần nhất',
                align: 'center',
                offsetX: 50,
                style: {
                    fontFamily: 'Time New Romans',
                    fontSize: '18px'
                },
            },
            responsive: [
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
                            text: 'Doanh thu - Lợi nhuận - Target',
                            align: 'left'
                        }
                    }
                }
            ],
            xaxis: {
                categories: [],
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        },
                        formatter: (value) => { return this.thousands_separators(value) },
                    },
                    title: {
                        text: "Việt Nam Đồng",
                        style: {
                            color: '#008FFB',
                            fontFamily: 'Time New Romans',
                            fontSize: '18px'
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
            ],
            tooltip: {
                y: {
                    formatter: (val) => { return this.thousands_separators(val) + " VNĐ" }
                }
            },
            legend: {
                horizontalAlign: 'center',
                offsetX: 50
            },
            noData: {
                text: 'Loading...',
                offsetX: 30,
                offsetY: -30,
                style: {
                    fontSize: 45,
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => { return this.thousands_separators(val) }
            }
        },
    };
    componentDidMount() {
        orderService.getProfit6Month()
            .then(res => {
                console.log(res.data)
                this.setState({
                    series: [
                        {
                            name: 'Doanh Thu',
                            type: 'column',
                            data: res.data.dataRevenueArr
                        },
                        {
                            name: 'Lợi nhuận',
                            type: 'column',
                            data: res.data.dataProfitArr
                        },
                        {
                            name: 'Target',
                            type: 'line',
                            data: [100000, 900000, 670000, 150000, 800000, 1200000]
                        },
                    ],
                    options: { ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: res.data.categoryArr } }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return num_parts.join(".");
    }
    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        )
    }
}
