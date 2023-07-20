import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {UserData, useUserData} from "../../data/Data";


////////////////////////////
function transformData(data) {
  const result = {};

  const uniqueSortedDates = getSortedDates(data)
    const ArrayLength = DateArrayLength(data)

  data.forEach(item => {
    const index = uniqueSortedDates.indexOf(item.date_added)
      if(index!==-1) {
          if (!result[item.id_user]) {
              // Создаем массив по умолчанию нужной длины
              result[item.id_user] = new Array(ArrayLength+1).fill(0);
          }
          // Заполняем массив данными
          result[item.id_user][index] = item.amount;
      }
  });

  return result;

}
export function DateArrayLength (data) {
    const dates = data.map(item => item.date_added);
    const dataObject = dates.map((dateString) => new Date(dateString))

    const maxDate = new Date(Math.max.apply(null, dataObject));
    const minDate = new Date(Math.min.apply(null, dataObject));

    const differenceInMilliseconds = maxDate - minDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays
}




export function getSortedDates(data) {

  const dates = data.map(item => new Date(item.date_added));

  let minDate = dates[0];
  let maxDate = dates[0];

  for (let i = 1; i < dates.length; i++) {
    if (dates[i] < minDate) {
      minDate = dates[i];
    }
    if (dates[i] > maxDate) {
      maxDate = dates[i];
    }
  }

  const result = [];
  let currentDate = minDate;

  while (currentDate <= maxDate) {
    result.push(currentDate.toISOString().slice(0,10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;

}



export function getDatasets(data) {

  const formattedData = transformData(data)


    const colors = [
        '#e91e1e', '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

  const datasets = Object.keys(formattedData).map((id_user, index) => {
    return {
      label: data.find(item => item.id_user == id_user).name,
      data: formattedData[id_user],
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
    const userData = useUserData()

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
