import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './profile.css';
import {useDispatch, useSelector} from "react-redux";
import {activityButtonsThunk, fillActivityThunk, setIdActivity, setLastId} from "../../redux/ProfileReducer";
import {OutputWindowIsOpenAC, setFlagCreateNote} from '../../redux/FlagsBooleanReducer'
import {GetYourNameThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";
import ToolBar from "./ProfileSideBar/ToolBar";
import MobileMenu from "./ProfileSideBar/ToolBarMobile";
import NoteCreate from "./Modals/NoteCreate";
import AcivityInteraction from "./ActivityInteraction/AcivityInteraction";
import CheckBoxActivity from "./ActivityInteraction/CheckBoxActivity";
import YourProfileModal from "./Modals/YourProfileModal";
import GraphicWithArrows from "../charts/GraphicWithArrows";
import ActivityInteractionRoot from "./Modals/ActivityInteractionRoot";
import NoteAddButton from "./Modals/NoteAddButton";

axios.defaults.withCredentials = true;


function Profile(props) {
    const UserData = useSelector(state=>state.Profile.UserData)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {ActivityButtons, redirectUrl, Id_activity, SelectedActivity} = useSelector(state => state.Profile);
    const {HideMobileToolBarFlag,FlagCreateNote,StatusView} = useSelector(state=>state.Flags_Reducer)

    useEffect(()=>{
    dispatch(fillActivityThunk({id:SelectedActivity.activity_id, StatusView:StatusView}))
    },[Id_activity,StatusView])


    useEffect(()=>{
        dispatch(activityButtonsThunk())
        dispatch(GetYourNameThunk())
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
                    {HideMobileToolBarFlag && <MobileMenu/>}
                </div>
                <div className="Profile_title"><h2>{SelectedActivity.value}</h2></div>
                <AcivityInteraction/>
            <div className='main_block'>
                <button className="profile-button" onClick={()=>dispatch(OutputWindowIsOpenAC(true))}>
                    <img src="/images/full-face-robot-.svg" alt="Your profile"/>
                </button>
                { <YourProfileModal/>}
            </div>
            <div className='mini_container'>
                <div className='list'>
                    {Object.keys(UserData).length !== 0 ? <CheckBoxActivity/> : null}
                    <NoteAddButton/>
                    {FlagCreateNote && <NoteCreate ActivityButtons={ActivityButtons}/>}
                    {Object.keys(UserData).length == 0 ? (<img className="sad_robot" src="/images/sad-strong-robot.svg" alt="Nothing here"/>): null}
                </div>
                <div className='GraphicContainer'> {Object.keys(UserData).length > 0 && <GraphicWithArrows />}</div>
                <div>
                        <ActivityInteractionRoot/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Profile;
