import {UserData} from "../data/Data";
import axios from "axios";

const FILL_ACTIVITY_ARRAY = 'FILL_ACTIVITY_ARRAY'
const NAME_ACTIVITY_BTN = 'NAME_ACTIVITY_BTN'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
const DELETE_ACTIVITY_ARRAY = 'DELETE_ACTIVITY_ARRAY'
const CHANGE_STATUS_VIEW = 'CHANGE_STATUS_VIEW'
const SET_LAST_ID = 'SET_LAST_ID'
const EDIT_ACTIVITY_BAR = 'EDIT_ACTIVITY_BAR'
const DELETE_ID_ENTERY = 'DELETE_ID_ENTERY'
const CHANGE_NOTE = 'CHANGE_NOTE'
const CHANGE_NOTE_OBJ = 'CHANGE_NOTE_OBJ'
const ID_ACTIVITY = 'ID_ACTIVITY'
// const CLEAR_LAST_ID = 'CLEAR_LAST_ID'

let initialState = {
    UserData: [],
    ActivityButtons: {},
    LoadingStatus: false,
    StatusView: false,
    LastId: null,
    IsEditActivityBarVisible: false,
    Id_entery: null,
    ChangeNoteBool: false,
    ChangesNoteObj: {},
    Id_activity: null
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
        case EDIT_ACTIVITY_BAR:{
            return {...state, IsEditActivityBarVisible: action.isEditActivityBarVisible}
        }
        case DELETE_ID_ENTERY:{
            return {...state, Id_entery: action.id_entery}
        }
        case CHANGE_NOTE:{
            return {...state, ChangeNoteBool: action.changeNoteBool}
        }
        case CHANGE_NOTE_OBJ:{
            return {...state, ChangesNoteObj:{...action.changesNoteObj} }
        }
        case ID_ACTIVITY:{
            return {...state, Id_activity:action.id_activity}
        }
        // case CLEAR_LAST_ID:{
        //     return {...state, LastId: null}
        // }
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
// export const ClearLastId = ()=>({type: CLEAR_LAST_ID})
export const EditActivityBarAC = (isEditActivityBarVisible)=>({type:EDIT_ACTIVITY_BAR, isEditActivityBarVisible:isEditActivityBarVisible})

export const id_enteryAC = (id_entery)=>({type: DELETE_ID_ENTERY, id_entery:id_entery})

export const changeNoteAC = (changeNoteBool)=>({type:CHANGE_NOTE, changeNoteBool:changeNoteBool})

export const SetId_activityAC = (id_activity)=>({type:ID_ACTIVITY, id_activity:id_activity})

export const ChangesNoteObjAC = (changesNoteObj)=>({type:CHANGE_NOTE_OBJ, changesNoteObj:changesNoteObj})
export const FillActivityThunk = (id, StatusView)=>{
    return (dispatch) => {
        dispatch(SetLastId(id))
        dispatch(SetLoadingStatusAC(false))
        axios.post('http://localhost:5000/data_for_chart', { id,StatusView })
            .then(data=>{
        dispatch(FillActivityAC(data.data))
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

export const DeletIdEnteryThunk = (Id_entery)=>{
    return (dispatch) =>{
         axios.delete(`http://localhost:5000/delete_entry/${Id_entery}`)
            .then(data=>{
        dispatch(id_enteryAC(data.Id_entery))
        dispatch(EditActivityBarAC(false))
         })
    }
}
export const changeIdEnteryThunk = (Id_entery, ChangesNoteObj)=>{
    return (dispatch) =>{
        axios.post(`http://localhost:5000/edit_entry/${Id_entery}`,ChangesNoteObj)
            .then(data=>{
                dispatch(id_enteryAC(data.Id_entery))
                //dispatch(ChangesNoteObjAC(data.ChangesNoteObj))
                dispatch(EditActivityBarAC(false))
            })
    }
}

export const createIdActivityThunk = (Id_activity, ChangesNoteObj)=>{
    return (dispatch) =>{
        axios.post(`http://localhost:5000/create_entry/${Id_activity}`,ChangesNoteObj)
            .then(data=>{
                dispatch(SetId_activityAC(data.Id_activity))
                dispatch(EditActivityBarAC(false))
            })
    }
}

export default ProfileReducer
