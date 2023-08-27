import React from 'react';
import BarCharts from "./barCharts/BarCharts";
import {useDispatch, useSelector} from "react-redux";
import {editActivityBar, modifyIdEntery} from "../../redux/ProfileReducer";

import NoteModify from "../profile/Modals/NoteModify";
import {externalTooltipHandler} from "./FunctionCharts/TooltipFunctions";
import {useUserData} from "./FunctionCharts/useUserDataHook";


const CommonCharts = (props) => {
    const entry_id = useSelector(state => state.Profile.Id_entry)
    const IsEditActivityBarVisible = useSelector(state=>state.Profile.IsEditActivityBarVisible)
    const dispatch = useDispatch()
    const WhiteColor = 'white'
    const userData = useUserData(props.flexGraphic)

    const handleChartClick = (elements) => {

        if (!elements || elements.length === 0) {
            dispatch(editActivityBar(false))
            return;
        }

        const slot = elements[0]['index']
        const column = elements[0]['datasetIndex']
        const user_id = userData['datasets'][0]['id_user'][column]
        dispatch(modifyIdEntery(userData['datasets'][0]['entry_id'][user_id][slot]))
        console.log(userData)

        // console.log('Clicked on:', elements);
        dispatch(editActivityBar(true))
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
            {IsEditActivityBarVisible && <NoteModify entry_id={entry_id}/>}
        </div>
    );
}





export default CommonCharts;