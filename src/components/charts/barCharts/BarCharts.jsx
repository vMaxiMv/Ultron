import React from 'react';
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
function BarCharts(props) {
    return (
        <div style={{width:' 700px'}}>
            <Bar data={props.chartData} options={props.options}/>
        </div>
    );
}

export default BarCharts;