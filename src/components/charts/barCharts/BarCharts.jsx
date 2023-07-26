import React from 'react';
import {Bar} from 'react-chartjs-2'
import b from '../barCharts/BarCharts.module.css'
import {Chart as ChartJS} from 'chart.js/auto'
function BarCharts(props) {
    return (
        <div className={b.bar_diagramm}>
            <Bar className={b.bar_diagramm_bar} data={props.chartData} options={props.options}/>
        </div>
    );
}

export default BarCharts;