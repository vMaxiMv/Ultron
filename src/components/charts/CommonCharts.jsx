import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {UserData} from "../../data/Data";
//////////////////////////////
function transformData(data) {

  const result = {};

  // Находим максимальный год
  const maxYear = Math.max(...data.map(item => item.date));

  data.forEach(item => {
    if (!result[item.id]) {
      // Создаем массив по умолчанию нужной длины
      result[item.id] = new Array(maxYear - 9).fill(0);
    }

    // Заполняем массив данными
    const index = item.date - 10;
    result[item.id][index] = item.pullups;
  });

  return result;

}


function getSortedDates(data) {

  // Извлекаем все значения date
  const dates = data.map(item => item.date);

  // Удаляем дубликаты и сортируем
  const uniqueSortedDates = [...new Set(dates)].sort((a, b) => a - b);

  return uniqueSortedDates;

}

/////////////////////////////
function CommonCharts(props) {
    const formattedData = transformData(UserData);

    const [userData, setUserData] = useState({
        labels: getSortedDates(UserData) ,
        datasets:[{
            label: "Max",
            data: formattedData[1],
            backgroundColor: 'rgba(255,2,32,1)', // Цвет заполнения столбцов графика
            borderColor: 'rgb(0,0,0)', // Цвет границы столбцов графика
            borderWidth: 1,
        },
            {
                label: "Arsen",
        data: formattedData[2],
        backgroundColor: 'rgba(65,255,2,1)', // Цвет заполнения столбцов графика
        borderColor: 'rgb(0,0,0)', // Цвет границы столбцов графика
        borderWidth: 1,
},
            {
                label: "Lexa",
        data: formattedData[3],
        backgroundColor: 'rgb(2,15,255)', // Цвет заполнения столбцов графика
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
                    render: 'value',
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
