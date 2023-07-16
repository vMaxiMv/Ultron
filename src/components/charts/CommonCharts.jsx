import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {UserData} from "../../data/Data";
import randomColor from 'randomcolor';


////////////////////////////
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



function getDatasets(data) {

  const formattedData = transformData(data)

  // Генерируем случайные цвета
  // const distinctColors = [];
  // const numUsers = Object.keys(formattedData).length;
  // for(let i = 0; i < numUsers; i++) {
  //     console.log(i)
  //   const color = randomColor({
  //     luminosity: 'bright',
  //     hue: 'random',
  //
  //   });
  //
  //   distinctColors.push(color);
  // }
    const colors = [
        '#e91e1e', '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

  const datasets = Object.keys(formattedData).map((id, index) => {
    return {
      label: data.find(item => item.id == id).name,
      data: formattedData[id],
      backgroundColor: colors[index],
      borderColor: 'black',
      borderWidth: 1
    };
  });

  return datasets;

}

/////////////////////////////


function CommonCharts(props) {

    const [userData, setUserData] = useState({
        labels: getSortedDates(UserData) ,
        datasets: getDatasets(UserData)
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
