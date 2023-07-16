import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {UserData} from "../../data/Data";

function CommonCharts(props) {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year) ,
        datasets:[{
            label: "Max",
            data: UserData.map((data)=>data.pullups),
            backgroundColor: 'rgba(255,2,32,1)', // Цвет заполнения столбцов графика
            borderColor: 'rgb(0,0,0)', // Цвет границы столбцов графика
            borderWidth: 1,
        },
            {
                label: "Arsen",
        data: UserData.map((data)=>data.pullups),
        backgroundColor: 'rgba(65,255,2,1)', // Цвет заполнения столбцов графика
        borderColor: 'rgb(0,0,0)', // Цвет границы столбцов графика
        borderWidth: 1,
},
        ]
    })
    const options = {
        scales: {
            y: {
                beginAtZero: true // Начало оси Y с 0
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black' // Изменение цвета шрифта на черный
                }
            }
        }
    }
    return (
        <div>
        <BarCharts chartData={userData} options={options} />
        </div>
    );
}

export default CommonCharts;