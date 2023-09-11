import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { StatusView, FlagChangeNote, FlagCreateNote, ActivityModalVisible, ActivityModalVisible2, HideMobileToolBarFlag, OutputWindowIsOpen, LoadingStatus} from "./FlagsBooleanReducer"
import axios from "axios";
import {SetLoadingStatusAC} from "./FlagsBooleanReducer"

let baseUrl = 'http://localhost:5000/api'
baseUrl = 'https://ultronmotivaiton.ru/api'



export const fillActivityThunk = createAsyncThunk(
    'profile/fillActivity',
    async ({ id, StatusView }, { dispatch }) => {
        //dispatch(setLastId(id));
        // dispatch(SetLoadingStatusAC(true))
       const response = await axios.post(`${baseUrl}/data_for_chart`, { id, StatusView });
       console.log(response.data)
        // dispatch(SetLoadingStatusAC(false))
        return response.data

    }
 );

export const activityButtonsThunk = createAsyncThunk(
    'profile/activityButtons',
    async (_, { dispatch }) => {
        const response = await axios.get(`${baseUrl}/data_for_chart`);
        return response.data;
    }
);

export const deleteIdEntryThunk = createAsyncThunk(
    'profile/deleteIdEntry',
    async ({idEntry, ActivitySendingId, StatusView},{dispatch}) => {
        const response = await axios.delete(`${baseUrl}/delete_entry/${idEntry}`);
        dispatch(fillActivityThunk({ id: ActivitySendingId, StatusView: StatusView }))
        return response.data.Id_entry;
    }
);
export const changeIdEntryThunk = createAsyncThunk(
    'profile/changeIdEntry',
    async ( { idEntry, changesNoteObj, ActivitySendingId, StatusView }, { dispatch } ) => {
        const response = await axios.post(`${baseUrl}/edit_entry/${idEntry}`, changesNoteObj);
        dispatch(fillActivityThunk({ id: ActivitySendingId, StatusView: StatusView }))
        return response.data.Id_entry;
    }
);
export const createIdEntryThunk = createAsyncThunk(
    'profile/createIdActivity',
    async ({idActivity, changesNoteObj} ) => {
        const response = await axios.post(`${baseUrl}/create_entry/${idActivity}`, changesNoteObj);
        return response.data.Id_activity;
    }
);
export const createActivityThunk = createAsyncThunk(
    'profile/createActivity',
    async ({addActivityObj},{dispatch})=>{
        const response = await axios.post(`${baseUrl}/create_activity`, addActivityObj);
        const  [[key, value]]  = Object.entries(response.data)
        dispatch(activityButtonsThunk());
        dispatch(SelectedActivityAC({ activity_id: key, value: value }));
        return response.data
    }
)
export const deleteActivityThunk = createAsyncThunk(
    'profile/deleteActivity',
        async (activity_id,{dispatch})=>{
        const response = await axios.delete(`${baseUrl}/delete_activity/${activity_id}`)
            dispatch(activityButtonsThunk());
            return response.data.activity_id
        }
)
export const editActivityThunk = createAsyncThunk(
    'profile/editActivity',
    async ({addActivityObj,activity_id}, { dispatch })=>{
        const response = await axios.post(`${baseUrl}/edit_activity/${activity_id}`, addActivityObj);
        dispatch(activityButtonsThunk());
        dispatch(SelectedActivityAC({ activity_id:activity_id , value: addActivityObj.name}))
        return response.data
    }
)

const initialState = {
    UserData: {},
    ActivityButtons: {},
    IsEditActivityBarVisible: false,
    // LastId: null,
    Id_entry: null,
    Id_activity: null,
    SelectedActivity: {activity_id:null, value:"Активность не выбрана"},

    StatusView,
    FlagChangeNote,
    ActivityModalVisible,
    ActivityModalVisible2,
    HideMobileToolBarFlag,
    OutputWindowIsOpen,
    FlagCreateNote
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
        // setLastId: (state, action) => {
        //     state.LastId = action.payload;
        // },
        modifyIdEntery: (state, action) => {
            state.Id_entry = action.payload;
        },
        setIdActivity: (state, action) => {
            state.Id_activity = action.payload;
        },
        SelectedActivityAC:(state, action)=>{
            state.SelectedActivity = action.payload
        },
        editActivityBar: (state, action) => {
            state.IsEditActivityBarVisible = action.payload;
        },

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
                state.Id_entry = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(changeIdEntryThunk.fulfilled, (state, action) => {
                state.Id_entry = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(createIdEntryThunk.fulfilled, (state, action) => {
                state.Id_activity = action.payload;
            })
            .addCase(createActivityThunk.fulfilled, (state, action) => {
                state.UserData = {}
            })
            .addCase(deleteActivityThunk.fulfilled, (state, action) => {
                state.SelectedActivity = {activity_id:null, value:"Активность не выбрана"};
                state.UserData = {}
            })
    }
})

export const {
    fillActivityArray,
    nameActivityBtn,
    //setLastId,
    modifyIdEntery,
    setIdActivity,
    SelectedActivityAC,
    editActivityBar
} = profileSlice.actions

export default profileSlice.reducer