import React from 'react';
import tb from "./ToolBar.module.css";
import {ActivityModalVisibleAC, fillActivityThunk, SelectedActivityAC} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";

function ToolBarCommonComponent(props) {
    const dispatch = useDispatch()
    const {
        ActivityButtons,
        StatusView
    } = useSelector(state => state.Profile)
    const buttonActivityHandleClick = (key,value)=>{
        dispatch(fillActivityThunk({ id: key, StatusView: StatusView }))
        dispatch(SelectedActivityAC({ activity_id: key, value: value }))
    }
    const ModalActivityHanldeClick = ()=>{
        dispatch(ActivityModalVisibleAC(true))
    }
    return (
        <div className={tb.list_menu}>
            <div className={tb.title}><h2>Активности</h2></div>
            {Object.entries(ActivityButtons).map(([key, value]) => (
                <button className={tb.activity_buttons} onClick={() => buttonActivityHandleClick(key, value)} key={key}>
                    {`${value}`}
                </button>
            ))}
            <button className={tb.add_activity} onClick={ModalActivityHanldeClick}><img className={tb.Add_activity_img} src="/images/add_activity.png" alt=""/></button>
        </div>
    );
}

export default ToolBarCommonComponent;