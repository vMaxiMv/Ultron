import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './profile.css';
import CommonCharts from '../charts/CommonCharts';
import {useDispatch, useSelector} from "react-redux";
import {
    activityButtonsThunk, ActivityModalVisibleAC,
    changeStatusView,
    fillActivityThunk
} from "../../redux/ProfileReducer";
import {LogoutThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";
import ToolBar from "./ProfileSideBar/ToolBar";
import MobileMenu from "./ProfileSideBar/ToolBarMobile";
import NoteCreate from "./NoteinteractionFolder/NoteCreate";
import AddActivityModal from "./Modals/AddActivityModal";

axios.defaults.withCredentials = true;


function Profile(props) {
    const UserData = useSelector(state=>state.Profile.UserData)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {
        ActivityButtons,
        redirectUrl,
        StatusView,
        LastId,
        Id_entery,
        IsEditActivityBarVisible,
        Id_activity,
        ActivityModalVisible
    } = useSelector(state => state.Profile);

    const [FlagCreateNote, SetFlagCreateNote] = useState(false)

    useEffect(()=>{

    dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    },[Id_entery, IsEditActivityBarVisible, Id_activity])
    useEffect(()=>{
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    },[StatusView])

    useEffect(()=>{
        dispatch(activityButtonsThunk())
    },[])

    useEffect(()=>{
        if(redirectUrl){
            navigate(redirectUrl)
            dispatch(resetRedirectUrlAC())

        }
    },[redirectUrl, navigate])
    const ModalActivityHanldeClick = ()=>{
        dispatch(ActivityModalVisibleAC(true))
    }

    return (
        <div className='wrapper'>
            <div className='container'>
                <ToolBar/>
                <div className='CommonMenu'>
                    <MobileMenu/>
                </div>
                <h2>Активности</h2>
                {/*<div> <button onClick={() => dispatch(ChangeStatusView(!StatusView))}>Флажок</button></div>*/}

            <div className='main_block'>
                <button onClick={()=>dispatch(LogoutThunk())}>Выйти</button>
            </div>
            <div className='mini_container'>
                <div className='list'>
                    <div className='switch'>
                        <input onClick={() => dispatch(changeStatusView(!StatusView))} type="checkbox"/>
                    </div>
                    {Object.entries(ActivityButtons).map(([key, value]) => (
                        <button onClick={() => dispatch(fillActivityThunk({ id: key, StatusView: StatusView }))} key={key}>
                            {`${value}`}
                        </button>
                    ))}
                    <button onClick={()=>{SetFlagCreateNote(!FlagCreateNote)}}>Добавить запись</button>
                    {FlagCreateNote&& <NoteCreate ActivityButtons={ActivityButtons}/>}
                    <button onClick={ModalActivityHanldeClick}>Добавить активность</button>
                </div>
                <div className='graphics'>
                    {  <CommonCharts data={UserData}/> }
                </div>
                {ActivityModalVisible &&  <AddActivityModal/>}
            </div>
            </div>
        </div>
    );
}

export default Profile;
