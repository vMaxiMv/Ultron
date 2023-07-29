import {Bar} from "react-chartjs-2";
import React from "react";

export default function Nana(props) {
    return <Bar data={props.chartData} options={props.options} />
}