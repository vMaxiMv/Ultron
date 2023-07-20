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

// export function getSortedDates(data) {
//   // Извлекаем все значения date
//     const dates = data.map(item => item.date_added);
//     const dataObject = dates.map((dateString) => new Date(dateString))
//     dataObject.sort((a,b) => a-b)
//     const uniqueSortedDates = dataObject.filter((date, index, array)=> index=== array.findIndex((d)=>d.getTime()=== date.getTime()))
//     const sortedDatesArray = uniqueSortedDates.map(date => date.toISOString().slice(0,10))
//
//
//   return sortedDatesArray;
// }
export function getSortedDates(data) {
    // Извлекаем все значения date
    const dates = data.map(item => item.date_added);
    const dataObject = dates.map((dateString) => new Date(dateString))
    dataObject.sort((a, b) => a - b);

    const sortedDatesArray = [];
    const currentDate = new Date(dataObject[0]);

    // Перебираем отсортированные даты и добавляем пропущенные даты в массив
    dataObject.forEach((date) => {
        while (currentDate < date) {
            sortedDatesArray.push(currentDate.toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        sortedDatesArray.push(date.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    });

    return sortedDatesArray;
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
