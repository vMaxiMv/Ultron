import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import p from './profile.module.css';
import CommonCharts, {getDatasets, getDescription, getSortedDates} from '../charts/CommonCharts';
import {updateUserData, UserData} from '../../data/Data';
import Loading from "../loading/loading";
import {useDispatch, useSelector} from "react-redux";
import {ActivityButtonsThunk, ChangeStatusView, FillActivityThunk} from "../../redux/ProfileReducer";
import {LogoutThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";

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


    useEffect(()=>{
        dispatch(ActivityButtonsThunk())
    },[])

    useEffect(()=>{
        if(redirectUrl){
            navigate(redirectUrl)
            dispatch(resetRedirectUrlAC())

        }
    },[redirectUrl, navigate])




    return (
        <div className={p.wrapper}>
            <div className={p.container}>
                <h2>Активности</h2>
                <button onClick={dispatch(ChangeStatusView(!StatusView))}>Флажок</button>
            <div className={p.main_block}>
                <button onClick={()=>dispatch(LogoutThunk())}>Выйти</button>
            </div>
            <div className={p.mini_container}>
                <div className={p.list}>
                    {Object.entries(ActivityButtons).map(([key, value]) => (
                        <button onClick={() => dispatch(FillActivityThunk(key,StatusView))} key={key}>
                            {`${value}`}
                        </button>
                    ))}
                </div>
                <div className={p.graphics}>
                    {LoadingStatus ?  <CommonCharts data={UserData}/> : <Loading/>}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Profile;
