import React, {useState} from 'react';
import CommonCharts from "./CommonCharts";
import {useDispatch, useSelector} from "react-redux";
import graphic from './GraphicWithArrows.module.css'
import {isMobile} from "react-device-detect";
//import {getSortedDates} from "./FunctionCharts/DataSetsFunctions";
import {fillActivityThunk} from "../../redux/ProfileReducer";
import {setLastDates, setNextDates} from "../../redux/Chart_Interaction_Reducer";
import { useSwipeable } from 'react-swipeable'
import Loading from "../Loading/Loading";
function GraphicWithArrows(props) {
    const {UserData, SelectedActivity} = useSelector(state=>state.Profile)
    const dispatch = useDispatch()
    //const LastId = useSelector(state => state.Profile.LastId)
    const {StatusView,LoadingStatus} = useSelector(state=>state.Flags_Reducer)
    // console.log(getSortedDates(UserData, 5))
    const { visibleDatesFirst, visibleDatesLast } = useSelector(state => state.Chart_Reducer);

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
        if (NewSlicedData['date'].length > 10 || UserData['date'].length > visibleDatesLast) {
            dispatch(setNextDates());
            dispatch(fillActivityThunk({ id: SelectedActivity.activity_id, StatusView: StatusView }));
        }
    };
    const handleLessClick = () => {
        if (visibleDatesFirst >= 10) {
            dispatch(setLastDates());
            dispatch(fillActivityThunk({ id: SelectedActivity.activity_id, StatusView: StatusView }));
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleMoreClick, // Переключаемся на следующий слайд при свайпе влево
        onSwipedRight: handleLessClick, // Переключаемся на предыдущий слайд при свайпе вправо
    });
    return (
        <div>
            {
                !isMobile ?
                    (LoadingStatus ?  <div className={graphic.loader}></div> : <div className={graphic.graphics}>
                    {visibleDatesFirst >= 10 &&(
                    <button onClick={handleLessClick}><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>)}
                    <CommonCharts data={NewSlicedData}/>
                    {(
                        NewSlicedData['date'].length <= 10  && UserData['date'].length <= visibleDatesLast ? '' :
                       <button onClick={handleMoreClick}><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>)}
            </div>)
            :
                    <div className={graphic.graphics_container}>
                        {LoadingStatus ? <div className={graphic.loader}></div> :  <div className={graphic.graphics_mobile}  {...swipeHandlers}>
                            <CommonCharts data={NewSlicedData}/>
                        </div>}
                        {/*<div className={graphic.buttons}>*/}
                        {/*    {visibleDatesFirst >= 10 &&(*/}
                        {/*    <button onClick={handleLessClick}><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>)}*/}
                        {/*    {(*/}
                        {/*        NewSlicedData['date'].length <= 10  && UserData['date'].length <= visibleDatesLast ? '' :*/}
                        {/*    <button onClick={handleMoreClick}><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>)}*/}
                        {/*</div>*/}
                    </div>
            }
        </div>
    );
}

export default GraphicWithArrows;