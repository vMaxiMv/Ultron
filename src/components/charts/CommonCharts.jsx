import React, {useState} from 'react';
import BarCharts from "./barCharts/BarCharts";
import {useUserData} from "../profile/profile";
import {elements} from "chart.js";
import EditActivityBar from "../profile/ProfileSideBar/EditActivityBar";
import {set} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {EditActivityBarAC} from "../../redux/ProfileReducer";





////////////////////////////

function transformData(data) {
    const result = {};

    const uniqueSortedDates = getSortedDates(data, 0)
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

export function getSortedDates(data, number) {

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

    if(minDate !== maxDate){
        while (currentDate <= maxDate) {
            result.push(currentDate.toISOString().slice(number,10));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    else{
        if(currentDate){
            result.push(currentDate.toISOString().slice(number,10));
        }
    }
    return result;

}


/////Функции для формирования списков описания
function getDateFromString(dateString) {
    let date;
    try {
        date = new Date(dateString);
    } catch {
        date = null;
    }
    return date;
}

function convertDatesToObjects(data) {
    const newData = data.map(item => {
        const date = getDateFromString(item.date_added);
        return { ...item, date_added: date };
    });
    return newData;
}

function findDateDifference(data) {
    const dates = data.map(item => item.date_added);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const differenceInMilliseconds = maxDate - minDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    console.log(`Разница между максимальной и минимальной датой: ${differenceInDays} дней`);
    return differenceInDays;
}

function createEmptyDataObject(data, differenceInDays) {
    const emptyData = {};

    for (const item of data) {
        emptyData[item.id_user] = Array.from({ length: differenceInDays + 1 }, () => "");
    }

    return emptyData;
}

function addDatesToEmptyData(emptyData, data) {
    const minDate = new Date(Math.min(...data.map(item => item.date_added)));
    for (const item of data) {
        const date = new Date(item.date_added);
        const differenceInDays = Math.floor((date - minDate) / (1000 * 60 * 60 * 24));
        emptyData[item.id_user][differenceInDays] = item.description || "";
    }
}
////конец Функции для формирования списков описания


export function getDatasets(data) {
    const newData = convertDatesToObjects(data);
    const differenceInDays = findDateDifference(newData);
    const emptyDataObject = createEmptyDataObject(data, differenceInDays);
    addDatesToEmptyData(emptyDataObject, newData);

    const formattedData = transformData(data)


    const colors = [
        '#e91e1e', '#ffc400', '#000bd4', '#21f344', '#673ab7',
        '#0dbcd2',  '#b508ee', '#08771a'];

    const datasets = Object.keys(formattedData).map((id_user, index) => {
        return {
            label: data.find(item => item.id_user == id_user).name,
            id_user:Array.from(new Set(data.map(item => item.id_user))),
            data: formattedData[id_user],
            backgroundColor: colors[index],
            description:emptyDataObject,
            borderColor: 'black',
            borderWidth: 2
        };
    })
    return datasets;

}

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    const label = tooltip.dataPoints[0].label || '';
    const value = tooltip.dataPoints[0].parsed.y || '';
    const id_user = tooltip.dataPoints[0].dataset.id_user[tooltip.dataPoints[0].datasetIndex];
    const number_slot = tooltip.dataPoints[0].dataIndex;
    const description = tooltip.dataPoints[0].dataset.description[id_user][number_slot];

    const html = `
    <div>
      <span>${label}: ${value}</span>
      <br>
      <span>${description}</span>
    </div>
  `;

    tooltipEl.innerHTML = html;

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const CommonCharts = () => {
    const IsEditActivityBarVisible = useSelector(state=>state.Profile.IsEditActivityBarVisible)
    const dispatch = useDispatch()
    const WhiteColor = 'white'
    const userData = useUserData()

    const handleChartClick = (elements) => {
        if (!elements || elements.length === 0) {
            dispatch(EditActivityBarAC(false))
            return;
        }
        
        console.log('Clicked on:', elements);
        dispatch(EditActivityBarAC(true))
    };

    const options = {
            onClick: (event, elements)=>handleChartClick(elements),
            responsive: true,
            maintainAspectRatio: false,
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
            },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler,
                },
            },
        }
    return (
        <div>
        <BarCharts chartData={userData} options={options} />
            {IsEditActivityBarVisible && <EditActivityBar />}
        </div>
    );
}





export default CommonCharts;