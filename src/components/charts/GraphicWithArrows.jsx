import React, {useState} from 'react';
import CommonCharts from "./CommonCharts";
import {useDispatch, useSelector} from "react-redux";
import graphic from './GraphicWithArrows.module.css'
import {isMobile} from "react-device-detect";
//import {getSortedDates} from "./FunctionCharts/DataSetsFunctions";
import {fillActivityThunk} from "../../redux/ProfileReducer";
import {setLastDates, setNextDates} from "../../redux/Chart_Modals_Interaction_Reducer";

function GraphicWithArrows(props) {
    const UserData = useSelector(state=>state.Profile.UserData)
    const dispatch = useDispatch()
    const LastId = useSelector(state => state.Profile.LastId)
    const StatusView = useSelector(state => state.Profile.StatusView)
    // console.log(getSortedDates(UserData, 5))
    const { visibleDatesFirst, visibleDatesLast } = useSelector(state => state.Chart_Modals);

    function sliceData(data, startPoint, endPoint) {
        const slicedData = {
            date: data.date.slice(startPoint, endPoint),
            amount: {},
            entry_id: {},
            description: {},
            user_id: data.user_id,
            name: data.name
        };

        for (const userId in data.amount) {
            slicedData.amount[userId] = data.amount[userId].slice(startPoint, endPoint);
            slicedData.entry_id[userId] = data.entry_id[userId].slice(startPoint, endPoint);
            slicedData.description[userId] = data.description[userId].slice(startPoint, endPoint);
        }

        return slicedData;
    }
    const NewSlicedData = sliceData(UserData,visibleDatesFirst, visibleDatesLast)

    const handleMoreClick = () => {
        dispatch(setNextDates())
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    };
    const handleLessClick = () => {
        dispatch(setLastDates())
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    };
   // const partialDateArray = getSortedDates(UserData, 5).slice(visibleDatesFirst,visibleDatesLast)
   //  console.log('visibleDatesLast',visibleDatesLast)
   //  console.log('UserData[date].length', UserData['date'].length)
   //  console.log('NewSlicedData[date].length', NewSlicedData['date'].length)
   //  console.log('\n')

    return (
        <div>
            {
                !isMobile ?
                <div className={graphic.graphics}>
                    {visibleDatesFirst >= 10 &&(
                    <button onClick={handleLessClick}><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>)}
                     <CommonCharts data={NewSlicedData} />
                    {(
                        NewSlicedData['date'].length <= 10  && UserData['date'].length <= visibleDatesLast ? '' :
                       <button onClick={handleMoreClick}><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>)}
            </div>
            :
                    <div className={graphic.graphics_container}>
                        <div className={graphic.graphics_mobile}>
                            <CommonCharts data={NewSlicedData}/>
                        </div>
                        <div className={graphic.buttons}>
                            {visibleDatesFirst >= 10 &&(
                            <button onClick={handleLessClick}><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>)}
                            {(
                                NewSlicedData['date'].length <= 10  && UserData['date'].length <= visibleDatesLast ? '' :
                            <button onClick={handleMoreClick}><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>)}
                        </div>
                    </div>
            }
        </div>
    );
}

export default GraphicWithArrows;