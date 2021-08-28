import React, { Component } from 'react'
import AreaChart from '../Chart/AreaChart'
import ColumnChart from '../Chart/ColumnChart'
import DonutChart from '../Chart/DonutChart'
// import LiveLineChart from '../Chart/LiveLineChart'
import LineChart from '../Chart/LineChart'
import MultiColumnChart from '../Chart/MultiColumnChart'
import RadarChart from '../Chart/RadarChart'
import TimelineChart from '../Chart/TimelineChart'

export default class OverView extends Component {

    render() {
        return (
            <div className='overview'>
                <div className="chart_item chart_item_1">
                    <ColumnChart />
                </div>
                <div className="chart_item chart_item_2">
                    <DonutChart />
                </div>
                {/* <div className="chart_item">
                    <RadarChart />
                </div> */}
                <div className="chart_item">
                    <LineChart />
                </div>
                {/* <div className="chart_item">
                    <AreaChart />
                </div> */}
                {/* <div className="chart_item">
                    <TimelineChart />
                </div> */}
                <div className="chart_item chart_item_7">
                    <MultiColumnChart />
                </div>
                {/* <LiveLineChart /> */}
            </div>
        )
    }
}
