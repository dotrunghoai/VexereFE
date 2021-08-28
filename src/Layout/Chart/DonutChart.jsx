import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { orderService } from '../../Service'

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
            ],
            title: {
                text: 'Top 5 hãng xe được book nhiều nhất',
                align: 'center',
                style: {
                    fontFamily: 'Time New Romans',
                    fontSize: '18px'
                },
            },
            labels: [],
            noData: {
                text: 'Loading...',
                offsetY: -30,
                style: {
                    fontSize: 45,
                }
            }
        },
        series: [],
    }
    componentDidMount() {
        orderService.getTop5Brand()
            .then(res => {
                this.setState({
                    options: { ...this.state.options, labels: res.data.labelArr },
                    series: res.data.seriesArr,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.series} type="pie" width="380" />  {/* type='donut' 'pie' */}
            </div>
        )
    }
}
