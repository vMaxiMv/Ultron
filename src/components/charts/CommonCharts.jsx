import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {UserData} from "../../data/Data";


////////////////////////////
function transformData(data) {
    //console.log(data)
  const result = {};

  const uniqueSortedDates = getSortedDates(data)

  data.forEach(item => {
    const index = uniqueSortedDates.indexOf(item.date)
      if(index!==-1) {
          if (!result[item.id]) {
              // Создаем массив по умолчанию нужной длины
              result[item.id] = new Array(uniqueSortedDates.length).fill(0);
          }
          // Заполняем массив данными
          result[item.id][index] = item.pullups;
      }
  });
    console.log(result)
  return result;

}

function getSortedDates(data) {

  // Извлекаем все значения date
  const dates = data.map(item => item.date);

  // Удаляем дубликаты и сортируем
  const uniqueSortedDates = [...new Set(dates)].sort((a, b) => a - b);

console.log(uniqueSortedDates)
  return uniqueSortedDates;

}



function getDatasets(data) {

  const formattedData = transformData(data)


    const colors = [
        '#e91e1e', '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

  const datasets = Object.keys(formattedData).map((id, index) => {
    return {
      label: data.find(item => item.id == id).name,
      data: formattedData[id],
      backgroundColor: colors[index],
      borderColor: 'black',
      borderWidth: 2
    };
  })
  return datasets;

}

/////////////////////////////


function CommonCharts(props) {
    const WhiteColor = 'white'

    const [userData, setUserData] = useState({
        labels: getSortedDates(UserData) ,
        datasets: getDatasets(UserData)
    })
    const options = {
        scales: {
            x: {
                grid:{
                    color: WhiteColor
                },
                ticks:{
                    color: WhiteColor,
                    font:{
                        size:16
                    }
                }
            },
            y: {
                beginAtZero: true, // Начало оси Y с 0
                grid:{
                    color: WhiteColor
                },
                ticks:{
                    color: WhiteColor,
                    font:{
                        size:16
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    render: 'value',
                    color: WhiteColor // Изменение цвета шрифта на черный
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
