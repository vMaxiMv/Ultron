// import axios from "axios";
//
// const FILL_ACTIVITY_ARRAY = 'FILL_ACTIVITY_ARRAY'
// const NAME_ACTIVITY_BTN = 'NAME_ACTIVITY_BTN'
// const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
// const CHANGE_STATUS_VIEW = 'CHANGE_STATUS_VIEW'
// const SET_LAST_ID = 'SET_LAST_ID'
// const EDIT_ACTIVITY_BAR = 'EDIT_ACTIVITY_BAR'
// const DELETE_ID_ENTERY = 'DELETE_ID_ENTERY'
// const CHANGE_NOTE = 'CHANGE_NOTE'
// const ID_ACTIVITY = 'ID_ACTIVITY'
//
//
// let initialState = {
//     UserData: [],
//     ActivityButtons: {},
//     LoadingStatus: false,
//     StatusView: false,
//     LastId: null,
//     IsEditActivityBarVisible: false,
//     Id_entery: null,
//     ChangeNoteBool: false,
//     Id_activity: null
// }
// const ProfileReducer = (state = initialState, action) =>{
//     switch (action.type){
//         case FILL_ACTIVITY_ARRAY:
//             return{...state, UserData: [...action.usersData]} //Если что тут необязательно одинкаковые названия
//         case NAME_ACTIVITY_BTN:{
//             return {...state, ActivityButtons: {...action.activityButtons} }
//         }
//         case SET_LOADING_STATUS:{
//             return {...state, LoadingStatus: action.loadingStatus}
//         }
//         case CHANGE_STATUS_VIEW:{
//             return {...state, StatusView: action.statusView}
//         }
//         case SET_LAST_ID:{
//             return {...state,LastId: action.lastId }
//         }
//         case EDIT_ACTIVITY_BAR:{
//             return {...state, IsEditActivityBarVisible: action.isEditActivityBarVisible}
//         }
//         case DELETE_ID_ENTERY:{
//             return {...state, Id_entery: action.id_entery}
//         }
//         case CHANGE_NOTE:{
//             return {...state, ChangeNoteBool: action.changeNoteBool}
//         }
//         case ID_ACTIVITY:{
//             return {...state, Id_activity:action.id_activity}
//         }
//
//         default:
//             return state
//     }
// }
//
// export const FillActivityAC = (usersData)=>({type: FILL_ACTIVITY_ARRAY, usersData: usersData})
// export const ActivityButtonsAC = (activityButtons)=>({type:NAME_ACTIVITY_BTN, activityButtons:activityButtons})
// export const SetLoadingStatusAC = (loadingStatus)=>({type:SET_LOADING_STATUS, loadingStatus:loadingStatus})
 //export const ChangeStatusView = (statusView) =>({type: CHANGE_STATUS_VIEW, statusView:statusView})
// export const SetLastId = (lastId)=>({type:SET_LAST_ID, lastId:lastId})
// // export const ClearLastId = ()=>({type: CLEAR_LAST_ID})
// export const EditActivityBarAC = (isEditActivityBarVisible)=>({type:EDIT_ACTIVITY_BAR, isEditActivityBarVisible:isEditActivityBarVisible})
//
// export const id_enteryAC = (id_entery)=>({type: DELETE_ID_ENTERY, id_entery:id_entery})
//
// export const changeNoteAC = (changeNoteBool)=>({type:CHANGE_NOTE, changeNoteBool:changeNoteBool})
//
// export const SetId_activityAC = (id_activity)=>({type:ID_ACTIVITY, id_activity:id_activity})

// export const FillActivityThunk = (id, StatusView)=>{
//     return (dispatch) => {
//         dispatch(SetLastId(id))
//         dispatch(SetLoadingStatusAC(false))
//         // axios.post('http://localhost:5000/data_for_chart', { id,StatusView })
//         //     .then(data=>{
//         dispatch(FillActivityAC([{'id_user': 56, 'id_entery': 1, 'name': 'Test User', 'amount': 82, 'date_added': '2023-07-20','description':'Первый подход: 20 повторений, второй подход: 10 повторений, третией подход: 5 повторений'},
//             {'id_user': 56, 'id_entery': 2, 'name': 'Test User', 'amount': 65, 'date_added': '2023-07-19' ,'description':'Второй день'},
//             {'id_user': 56, 'id_entery': 3, 'name': 'Test User', 'amount': 59, 'date_added': '2023-07-18' ,'description':'Третий день'},
//             {'id_user': 57, 'id_entery': 4, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-17' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 5, 'name': 'Test User', 'amount': 52, 'date_added': '2023-07-16' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 6, 'name': 'Test User', 'amount': 64, 'date_added': '2023-07-15' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 7, 'name': 'Test User', 'amount': 60, 'date_added': '2023-07-14' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 9, 'name': 'Test User', 'amount': 87, 'date_added': '2023-07-12' ,'description':'Пупа'},
//             {'id_user': 57, 'id_entery': 9, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-12' ,'description':'Лупа'},
//             {'id_user': 56, 'id_entery': 10, 'name': 'Test User', 'amount': 88, 'date_added': '2023-07-11' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 11, 'name': 'Test User', 'amount': 67, 'date_added': '2023-07-10' ,'description':'какое-то описание'},
//             {'id_user': 56, 'id_entery': 12, 'name': 'Test User', 'amount': 71, 'date_added': '2023-07-09' ,'description':'Первый подход: 20 повторений, второй подход: 10 повторений, третией подход: 5 повторений'},
//         ]))
//         //  })
//         dispatch(SetLoadingStatusAC(true))
//     }
// }
// export const ActivityButtonsThunk = ()=> {
//     return (dispatch) => {
//         // axios.get('http://localhost:5000/data_for_chart')
//         //     .then(data=>{
//         dispatch(ActivityButtonsAC({73: 'подтягивания', 74: 'отжимания от пола', 75: 'брусья', 76: 'жим лежа'}))
//         //  })
//     }
// }
//
// export const DeletIdEnteryThunk = (Id_entery)=>{
//     return (dispatch) =>{
//          axios.delete(`http://localhost:5000/delete_entry/${Id_entery}`)
//             .then(data=>{
//         dispatch(id_enteryAC(data.Id_entery))
//         dispatch(EditActivityBarAC(false))
//          })
//     }
// }
// export const changeIdEnteryThunk = (Id_entery, ChangesNoteObj)=>{
//     return (dispatch) =>{
//         axios.post(`http://localhost:5000/edit_entry/${Id_entery}`,ChangesNoteObj)
//             .then(data=>{
//                 dispatch(id_enteryAC(data.Id_entery))
//                 dispatch(EditActivityBarAC(false))
//             })
//     }
// }

// export const createIdActivityThunk = (Id_activity, ChangesNoteObj)=>{
//     return (dispatch) =>{
//         axios.post(`http://localhost:5000/create_entry/${Id_activity}`,ChangesNoteObj)
//             .then(data=>{
//                 dispatch(SetId_activityAC(data.Id_activity))
//                 dispatch(EditActivityBarAC(false))
//             })
//     }
// }

//export default ProfileReducer


import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// export const fillActivityThunk = createAsyncThunk(
//     'profile/fillActivity',
//     async ({ id, StatusView }, { dispatch }) => {
//         dispatch(setLastId(id));
//        const response = await axios.post('http://localhost:5000/data_for_chart', { id, StatusView });
//         return response.data
//
//     }
//  );
export const fillActivityThunk = createAsyncThunk(
    'profile/fillActivity',
    async (_, { dispatch }) => {
       // dispatch(setLastId(id));

       // const response = await axios.post('http://localhost:5000/data_for_chart', { id, statusView });
const response = [{'id_user': 56, 'id_entery': 1, 'name': 'Test User', 'amount': 82, 'date_added': '2023-07-20','description':'Первый подход: 20 повторений, второй подход: 10 повторений, третией подход: 5 повторений'},
    {'id_user': 56, 'id_entery': 2, 'name': 'Test User', 'amount': 65, 'date_added': '2023-07-19' ,'description':'Второй день'},
    {'id_user': 56, 'id_entery': 3, 'name': 'Test User', 'amount': 59, 'date_added': '2023-07-18' ,'description':'Третий день'},
    {'id_user': 57, 'id_entery': 4, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-17' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 5, 'name': 'Test User', 'amount': 52, 'date_added': '2023-07-16' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 6, 'name': 'Test User', 'amount': 64, 'date_added': '2023-07-15' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 7, 'name': 'Test User', 'amount': 60, 'date_added': '2023-07-14' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 9, 'name': 'Test User', 'amount': 87, 'date_added': '2023-07-12' ,'description':'Пупа'},
    {'id_user': 57, 'id_entery': 9, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-12' ,'description':'Лупа'},
    {'id_user': 56, 'id_entery': 10, 'name': 'Test User', 'amount': 88, 'date_added': '2023-07-11' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 11, 'name': 'Test User', 'amount': 67, 'date_added': '2023-07-10' ,'description':'какое-то описание'},
    {'id_user': 56, 'id_entery': 12, 'name': 'Test User', 'amount': 71, 'date_added': '2023-07-09' ,'description':'Первый подход: 20 повторений, второй подход: 10 повторений, третией подход: 5 повторений'},
]
        return response

    }
);
// export const activityButtonsThunk = createAsyncThunk(
//     'profile/activityButtons',
//     async (_, { dispatch }) => {
//         const response = await axios.get('http://localhost:5000/data_for_chart');
//         return response.data;
//     }
// );
export const activityButtonsThunk = createAsyncThunk(
    'profile/activityButtons',
    async (_, { dispatch }) => {
       // const response = await axios.get('http://localhost:5000/data_for_chart');
        return {73: 'подтягивания', 74: 'отжимания от пола', 75: 'брусья', 76: 'жим лежа'};
    }
);
export const deleteIdEntryThunk = createAsyncThunk(
    'profile/deleteIdEntry',
    async (idEntry) => {
        const response = await axios.delete(`http://localhost:5000/delete_entry/${idEntry}`);
        return response.data.Id_entery;
    }
);
export const changeIdEntryThunk = createAsyncThunk(
    'profile/changeIdEntry',
    async ( {idEntry, changesNoteObj} ) => {
        const response = await axios.post(`http://localhost:5000/edit_entry/${idEntry}`, changesNoteObj);
        return response.data.Id_entery;
    }
);
export const createIdActivityThunk = createAsyncThunk(
    'profile/createIdActivity',
    async ({idActivity, changesNoteObj} ) => {
        const response = await axios.post(`http://localhost:5000/create_entry/${idActivity}`, changesNoteObj);
        return response.data.Id_activity;
    }
);
export const createActivityThunk = createAsyncThunk(
    'profile/createActivity',
    async ({addActivityObj})=>{
        const response = await axios.post(`http://localhost:5000/create_activity`, addActivityObj);
        return response.data
    }
)

const initialState = {
    UserData: [],
    ActivityButtons: {},
    StatusView: false,
    LastId: null,
    IsEditActivityBarVisible: false,
    Id_entery: null,
    ChangeNoteBool: false,
    Id_activity: null,
    ActivityModalVisible:false
}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        fillActivityArray: (state, action) => {
            state.UserData = action.payload;
        },
        nameActivityBtn: (state, action) => {
            state.ActivityButtons = action.payload;
        },
        changeStatusView: (state, action) => {
            state.StatusView = action.payload;
        },
        setLastId: (state, action) => {
            state.LastId = action.payload;
        },
        editActivityBar: (state, action) => {
            state.IsEditActivityBarVisible = action.payload;
        },
        modifyIdEntery: (state, action) => {
            state.Id_entery = action.payload;
            state.IsEditActivityBarVisible = false;
        },
        changeNote: (state, action) => {
            state.ChangeNoteBool = action.payload;
        },
        setIdActivity: (state, action) => {
            state.Id_activity = action.payload;
            state.IsEditActivityBarVisible = false;
        },
        ActivityModalVisibleAC:(state, action)=>{
            state.ActivityModalVisible = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fillActivityThunk.fulfilled, (state, action)=>{
                state.UserData = action.payload
            })
            .addCase(activityButtonsThunk.fulfilled, (state, action) => {
                state.ActivityButtons = action.payload;
            })
            .addCase(deleteIdEntryThunk.fulfilled, (state, action) => {
                state.Id_entery = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(changeIdEntryThunk.fulfilled, (state, action) => {
                state.Id_entery = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(createIdActivityThunk.fulfilled, (state, action) => {
                state.Id_activity = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(createActivityThunk.fulfilled, (state, action) => {
                state.ActivityModalVisible = false;
            })
            .addCase(createActivityThunk.rejected, (state, action) => {
                state.ActivityModalVisible = false;
            });
    }
})

export const {
    fillActivityArray,
    nameActivityBtn,
    changeStatusView,
    setLastId,
    editActivityBar,
    modifyIdEntery,
    changeNote,
    setIdActivity,
    ActivityModalVisibleAC,
} = profileSlice.actions

export default profileSlice.reducer