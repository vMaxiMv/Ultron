import React, {useState} from 'react';
import CommonCharts from "./CommonCharts";
import {useDispatch, useSelector} from "react-redux";
import graphic from './GraphicWithArrows.module.css'
import {isMobile} from "react-device-detect";
import {getSortedDates} from "./FunctionCharts/DataSetsFunctions";
import {fillActivityThunk} from "../../redux/ProfileReducer";

function GraphicWithArrows(props) {
    const UserData = useSelector(state=>state.Profile.UserData)
    const dispatch = useDispatch()
    const LastId = useSelector(state => state.Profile.LastId)
    const StatusView = useSelector(state => state.Profile.StatusView)
    // console.log(getSortedDates(UserData, 5))
    const [visibleDatesFirst, setVisibleDatesFirst] = useState(0); // По умолчанию показываем первые 13 кнопок
    const [visibleDatesLast, setVisibleDatesLast] = useState(10)
    const handleMoreClick = () => {
        setVisibleDatesFirst(visibleDatesFirst + 10);
        setVisibleDatesLast(visibleDatesLast + 10)
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    };
    const handleLessClick = () => {
        setVisibleDatesFirst(visibleDatesFirst - 10);
        setVisibleDatesLast(visibleDatesLast - 10)
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    };
    const partialDateArray = getSortedDates(UserData, 5).slice(visibleDatesFirst,visibleDatesLast)

    console.log(partialDateArray)
    return (
        <div>
            {
                !isMobile ?
                <div className={graphic.graphics}>
                    {visibleDatesFirst >= 10 &&(
                    <button onClick={handleLessClick}><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>)}
                <CommonCharts data={UserData} flexGraphic={partialDateArray}/>
                    { partialDateArray.slice(visibleDatesFirst, visibleDatesLast).length === 10  && (
                       <button onClick={handleMoreClick}><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>)}
            </div>
            :
                    <div className={graphic.graphics_container}>
                        <div className={graphic.graphics_mobile}>
                            <CommonCharts data={UserData}/>
                        </div>
                        <div className={graphic.buttons}>
                            <button ><img src="/images/blue-left-arrow-inside-the-circle%20(2).svg" alt="left"/></button>
                            <button><img src="/images/blue-right-arrow-inside-the-circle%20(1).svg" alt="right"/></button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default GraphicWithArrows;