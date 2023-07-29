import React from 'react';
import { Bar } from 'react-chartjs-2';
import BarCharts from "../charts/barCharts/BarCharts";
import Nana from "./innerTest";

const UserData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 90000,
        userLost: 823
    },
    {
        id: 3,
        year: 2018,
        userGain: 100000,
        userLost: 823
    }
];

function Foo(){
    const dataSet = {
        labels: UserData.map(item => item.year),
        datasets: [
            {
                data: UserData.map(item => item.userGain)
            }
        ]
    }
    const options = {

        tooltips: {
            enabled: true,
            mode: 'index', // Display one tooltip for each data point
            callbacks: {
                label: item => {
                    const userData = UserData[item.index];
                    return `
          <div>Год: ${userData.year}</div>
          <div>Прирост пользователей: ${userData.userGain}</div>
          <div>Потеря пользователей: ${userData.userLost}</div>
        `;
                }
            }
        }
    }
    return (
        <div>
            <Nana chartData={dataSet} options={options} />
        </div>
    )
}

export default Foo;
