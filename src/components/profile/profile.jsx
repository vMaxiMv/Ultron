import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './profile.css';
import CommonCharts, {getDatasets, getSortedDates} from '../charts/CommonCharts';
import Loading from "../loading/loading";
import {useDispatch, useSelector} from "react-redux";
import {
    activityButtonsThunk,
    changeStatusView,
    fillActivityThunk
} from "../../redux/ProfileReducer";
import {LogoutThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";
import ToolBar from "./ProfileSideBar/ToolBar";
import MobileMenu from "./ProfileSideBar/ToolBarMobile";
import NoteCreate from "./NoteinteractionFolder/NoteCreate";

axios.defaults.withCredentials = true;
 export function useUserData(){
    const UserData = useSelector(state=>state.Profile.UserData)
    const userData = useMemo(()=>({
        labels: getSortedDates(UserData, 5),
        datasets: getDatasets(UserData),
    }), [UserData])
    return userData;
}

function Profile(props) {
    const UserData = useSelector(state=>state.Profile.UserData)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const ActivityButtons = useSelector(state=>state.Profile.ActivityButtons)
    const LoadingStatus = useSelector(state=>state.Profile.LoadingStatus)
    const redirectUrl = useSelector(state=>state.Auth.redirectUrl)
    const StatusView = useSelector(state=>state.Profile.StatusView)
    const LastId = useSelector(state=>state.Profile.LastId)
    const Id_entery = useSelector(state=> state.Profile.Id_entery)
    const IsEditActivityBarVisible = useSelector(state => state.Profile.IsEditActivityBarVisible)

    const [FlagCreateNote, SetFlagCreateNote] = useState(false)

    useEffect(()=>{

    dispatch(fillActivityThunk(LastId, StatusView))
    },[Id_entery, IsEditActivityBarVisible])
    useEffect(()=>{
        dispatch(fillActivityThunk(LastId, StatusView))
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
                        <button onClick={() => dispatch(fillActivityThunk(key,StatusView))} key={key}>
                            {`${value}`}
                        </button>
                    ))}
                    <button onClick={()=>{SetFlagCreateNote(!FlagCreateNote)}}>Добавить запись</button>
                    {FlagCreateNote&& <NoteCreate ActivityButtons={ActivityButtons}/>}
                </div>
                <div className='graphics'>
                    {  <CommonCharts data={UserData}/> }
                </div>
            </div>
            </div>
        </div>
    );
}

export default Profile;
