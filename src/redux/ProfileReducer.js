import {UserData} from "../data/Data";
import axios from "axios";

const FILL_ACTIVITY_ARRAY = 'FILL_ACTIVITY_ARRAY'
const NAME_ACTIVITY_BTN = 'NAME_ACTIVITY_BTN'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
const DELETE_ACTIVITY_ARRAY = 'DELETE_ACTIVITY_ARRAY'
const CHANGE_STATUS_VIEW = 'CHANGE_STATUS_VIEW'
const SET_LAST_ID = 'SET_LAST_ID'
const CLEAR_LAST_ID = 'CLEAR_LAST_ID'

let initialState = {
    UserData: [],
    ActivityButtons: {},
    LoadingStatus: false,
    StatusView: false,
    LastId: null,
}
const ProfileReducer = (state = initialState, action) =>{
    switch (action.type){
        case FILL_ACTIVITY_ARRAY:
            return{...state, UserData: [...action.usersData]} //Если что тут необязательно одинкаковые названия
        case DELETE_ACTIVITY_ARRAY:
            return{...state, UserData:[]}
        case NAME_ACTIVITY_BTN:{
            return {...state, ActivityButtons: {...action.activityButtons} }
        }
        case SET_LOADING_STATUS:{
            return {...state, LoadingStatus: action.loadingStatus}
        }
        case CHANGE_STATUS_VIEW:{
            return {...state, StatusView: action.statusView}
        }
        case SET_LAST_ID:{
            return {...state,LastId: action.lastId }
        }
        case CLEAR_LAST_ID:{
            return {...state, LastId: null}
        }
        default:
            return state
    }
}

export const FillActivityAC = (usersData)=>({type: FILL_ACTIVITY_ARRAY, usersData: usersData})
export const DeleteActivityAC = () =>({type: DELETE_ACTIVITY_ARRAY})
export const ActivityButtonsAC = (activityButtons)=>({type:NAME_ACTIVITY_BTN, activityButtons:activityButtons})
export const SetLoadingStatusAC = (loadingStatus)=>({type:SET_LOADING_STATUS, loadingStatus:loadingStatus})
export const ChangeStatusView = (statusView) =>({type: CHANGE_STATUS_VIEW, statusView:statusView})
export const SetLastId = (lastId)=>({type:SET_LAST_ID, lastId:lastId})
export const ClearLastId = ()=>({type: CLEAR_LAST_ID})

export const FillActivityThunk = (id, StatusView)=>{
    return (dispatch) => {
        dispatch(SetLastId(id))
        dispatch(SetLoadingStatusAC(false))
        axios.post('http://localhost:5000/data_for_chart', { id,StatusView })
            .then(data=>{
        dispatch(FillActivityAC( data.data))
         })
        dispatch(SetLoadingStatusAC(true))
    }
}
export const ActivityButtonsThunk = ()=>{
    return (dispatch)=>{
        axios.get('http://localhost:5000/data_for_chart')
            .then(data=>{
                dispatch(ActivityButtonsAC(data.data))
            })

    }
}

export default ProfileReducer
