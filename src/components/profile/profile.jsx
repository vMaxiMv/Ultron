import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './profile.css';
import CommonCharts from '../charts/CommonCharts';
import {useDispatch, useSelector} from "react-redux";
import {
    activityButtonsThunk, ActivityModalVisible2AC2, ActivityModalVisibleAC, changeIdEntryThunk,
    changeStatusView, createActivityThunk, editActivityThunk,
    fillActivityThunk, setFlagCreateNote, setIdActivity
} from "../../redux/ProfileReducer";
import {LogoutThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";
import ToolBar from "./ProfileSideBar/ToolBar";
import MobileMenu from "./ProfileSideBar/ToolBarMobile";
import NoteCreate from "./NoteinteractionFolder/NoteCreate";
import AddActivityModal from "./Modals/AddActivityModal";
import AcivityInteraction from "./ActivityInteraction/AcivityInteraction";
import CheckBoxActivity from "./ActivityInteraction/CheckBoxActivity";

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
        ActivityModalVisible,
        ActivityModalVisible2,
        SelectedActivity,
        FlagCreateNote
    } = useSelector(state => state.Profile);



    useEffect(()=>{

    dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    },[Id_entery, IsEditActivityBarVisible, Id_activity])
    useEffect(()=>{
        dispatch(fillActivityThunk({id:LastId, StatusView:StatusView}))
    },[StatusView])

    useEffect(()=>{
        dispatch(activityButtonsThunk())
    },[ActivityModalVisible])

    useEffect(()=>{
        if(redirectUrl){
            navigate(redirectUrl)
            dispatch(resetRedirectUrlAC())

        }
    },[redirectUrl, navigate])



    return (
        <div className='wrapper'>
            <div className='container'>
                <ToolBar/>
                <div className='CommonMenu'>
                    <MobileMenu/>
                </div>
                <h2>{SelectedActivity.value}</h2>
                <AcivityInteraction/>
            <div className='main_block'>
                <button onClick={()=>dispatch(LogoutThunk())}>Выйти</button>
            </div>
            <div className='mini_container'>
                <div className='list'>
                    <CheckBoxActivity/>
                    <button onClick={()=>dispatch(setFlagCreateNote(true))}>Добавить запись</button>
                    {FlagCreateNote&& <NoteCreate ActivityButtons={ActivityButtons}/>}
                </div>
                <div className='graphics'>
                    {  <CommonCharts data={UserData}/> }
                </div>
                {ActivityModalVisible &&  <AddActivityModal
                    title='Добавление активности'
                    onSubmitHandler={(data) => dispatch(createActivityThunk({ addActivityObj:data }))}
                    CloseModalActivityHanldeClick={ ActivityModalVisibleAC(false)}/>}
                {ActivityModalVisible2 &&  <AddActivityModal
                    title='Редактирование активности'
                    onSubmitHandler={(data) => dispatch(editActivityThunk({ addActivityObj:data, activity_id: SelectedActivity.activity_id}))}
                    CloseModalActivityHanldeClick={ ActivityModalVisible2AC2(false)}
                />}
            </div>
            </div>
        </div>
    );
}

export default Profile;
