import React, {useEffect, useState} from 'react';
import tb from "./ToolBar.module.css";
import {
    fillActivityThunk,
    SelectedActivityAC,
} from "../../../redux/ProfileReducer";
import {
    ActivityModalVisibleAC,
    HideMobileToolBarFlagAC, SetLoadingStatusAC,
} from '../../../redux/FlagsBooleanReducer'
import {useDispatch, useSelector} from "react-redux";

function ToolBarCommonComponent(props) {
    const dispatch = useDispatch()
    const {ActivityButtons} = useSelector(state => state.Profile)
    const { StatusView, HideMobileToolBarFlag} = useSelector(state=>state.Flags_Reducer)

    const buttonActivityHandleClick = async (key,value)=>{
        dispatch(HideMobileToolBarFlagAC(false))
        dispatch(SetLoadingStatusAC(true))
        await dispatch(fillActivityThunk({ id: key, StatusView: StatusView }))
        dispatch(SetLoadingStatusAC(false))
        dispatch(SelectedActivityAC({ activity_id: key, value: value }))

    }
    const ModalActivityHanldeClick = ()=>{
        dispatch(ActivityModalVisibleAC(true))
        dispatch(HideMobileToolBarFlagAC(false))
    }
    useEffect(()=>{
        dispatch(HideMobileToolBarFlagAC(true))
    },[HideMobileToolBarFlag])

    const [visibleButtonsFirst, setVisibleButtonsFirst] = useState(0); // По умолчанию показываем первые 13 кнопок
    const [visibleButtonsLast, setVisibleButtonsLast] = useState(5)
    const handleMoreClick = () => {
        setVisibleButtonsFirst(visibleButtonsFirst + 5);
        setVisibleButtonsLast(visibleButtonsLast + 5)
    };
    const handleLessClick = () => {
        setVisibleButtonsFirst(visibleButtonsFirst - 5);
        setVisibleButtonsLast(visibleButtonsLast - 5)
    };



    return (
        <div className={tb.list_menu}>
            <div className={tb.title}><h2>Активности</h2></div>
            {visibleButtonsFirst >= 5 &&(
            <button className={tb.add_activity} onClick={handleLessClick}>
                <img className={tb.Add_activity_img} src="/images/blue-arrow-up-inside-the-circle.svg" alt="Less"/>
            </button>
            )}
            {Object.entries(ActivityButtons).slice(visibleButtonsFirst, visibleButtonsLast).map(([key, value]) => (
                <button className={tb.activity_buttons} onClick={() => buttonActivityHandleClick(key, value)} key={key}>
                    {`${value}`}
                </button>
            ))}
            {Object.entries(ActivityButtons).slice(visibleButtonsFirst, visibleButtonsLast).length <= 5  && Object.entries(ActivityButtons).length <= visibleButtonsLast ? '' : (
                <button className={tb.add_activity} onClick={handleMoreClick}>
                    <img className={tb.Add_activity_img} src="/images/blue-arrow-down-inside-the-circle4.svg" alt="More"/>
                </button>
            )}
            <button className={tb.add_activity} onClick={ModalActivityHanldeClick}><img className={tb.Add_activity_img} src="/images/add_activity.png" alt=""/></button>
        </div>
    );
}

export default ToolBarCommonComponent;