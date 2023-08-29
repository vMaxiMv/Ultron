import React, {useEffect, useState} from 'react';
import tb from "./ToolBar.module.css";
import {
    ActivityModalVisibleAC,
    fillActivityThunk,
    HideMobileToolBarFlagAC,
    SelectedActivityAC, setIdActivity
} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";

function ToolBarCommonComponent(props) {
    const dispatch = useDispatch()
    const {
        ActivityButtons,
        StatusView,
        HideMobileToolBarFlag
    } = useSelector(state => state.Profile)

    const buttonActivityHandleClick = (key,value)=>{
        dispatch(fillActivityThunk({ id: key, StatusView: StatusView }))
        dispatch(SelectedActivityAC({ activity_id: key, value: value }))
        dispatch(HideMobileToolBarFlagAC(false))
    }
    const ModalActivityHanldeClick = ()=>{
        dispatch(ActivityModalVisibleAC(true))
        dispatch(HideMobileToolBarFlagAC(false))
    }
    useEffect(()=>{
        dispatch(HideMobileToolBarFlagAC(true))
    },[HideMobileToolBarFlag])

    const [visibleButtonsFirst, setVisibleButtonsFirst] = useState(0); // По умолчанию показываем первые 13 кнопок
    const [visibleButtonsLast, setVisibleButtonsLast] = useState(10)
    const handleMoreClick = () => {
        setVisibleButtonsFirst(visibleButtonsFirst + 10);
        setVisibleButtonsLast(visibleButtonsLast + 10)
    };
    const handleLessClick = () => {
        setVisibleButtonsFirst(visibleButtonsFirst - 10);
        setVisibleButtonsLast(visibleButtonsLast - 10)
    };



    return (
        <div className={tb.list_menu}>
            <div className={tb.title}><h2>Активности</h2></div>
            {visibleButtonsFirst >= 10 &&(
            <button className={tb.add_activity} onClick={handleLessClick}>
                <img className={tb.Add_activity_img} src="/images/blue-arrow-up-inside-the-circle.svg" alt="Less"/>
            </button>
            )}
            {Object.entries(ActivityButtons).slice(visibleButtonsFirst, visibleButtonsLast).map(([key, value]) => (
                <button className={tb.activity_buttons} onClick={() => buttonActivityHandleClick(key, value)} key={key}>
                    {`${value}`}
                </button>
            ))}
            {Object.entries(ActivityButtons).slice(visibleButtonsFirst, visibleButtonsLast).length === 10  && (
                <button className={tb.add_activity} onClick={handleMoreClick}>
                    <img className={tb.Add_activity_img} src="/images/blue-arrow-down-inside-the-circle4.svg" alt="More"/>
                </button>
            )}
            <button className={tb.add_activity} onClick={ModalActivityHanldeClick}><img className={tb.Add_activity_img} src="/images/add_activity.png" alt=""/></button>
        </div>
    );
}

export default ToolBarCommonComponent;