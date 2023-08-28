import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://Akwinchester.pythonanywhere.com'
// const baseUrl = 'http://localhost:5000/'

export const fillActivityThunk = createAsyncThunk(
    'profile/fillActivity',
    async ({ id, StatusView }, { dispatch }) => {
        dispatch(setLastId(id));
       const response = await axios.post(`${baseUrl}/data_for_chart`, { id, StatusView });
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
    async (idEntry) => {
        const response = await axios.delete(`${baseUrl}/delete_entry/${idEntry}`);
        return response.data.Id_entry;
    }
);
export const changeIdEntryThunk = createAsyncThunk(
    'profile/changeIdEntry',
    async ( {idEntry, changesNoteObj} ) => {
        const response = await axios.post(`${baseUrl}/edit_entry/${idEntry}`, changesNoteObj);
        return response.data.Id_entry;
    }
);
export const createIdActivityThunk = createAsyncThunk(
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
        return response
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
    StatusView: false,
    LastId: null,
    IsEditActivityBarVisible: false,
    Id_entry: null,
    ChangeNoteBool: false,
    FlagCreateNote:false,
    Id_activity: null,
    ActivityModalVisible:false,
    SelectedActivity: {activity_id:null, value:"Активность не выбрана"},
    ActivityModalVisible2:false,
    HideMobileToolBarFlag: true,
    OutputWindowIsOpen:false

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
            state.Id_entry = action.payload;
            state.IsEditActivityBarVisible = false;
        },
        changeNote: (state, action) => {
            state.ChangeNoteBool = action.payload;
        },
        setIdActivity: (state, action) => {
            state.Id_activity = action.payload;
            state.IsEditActivityBarVisible = false;
        },
        setFlagCreateNote: (state, action)=>{
            state.FlagCreateNote = action.payload
        },
        ActivityModalVisibleAC:(state, action)=>{
            state.ActivityModalVisible = action.payload
        },
        SelectedActivityAC:(state, action)=>{
            state.SelectedActivity = action.payload
        },
        ActivityModalVisible2AC2:(state, action)=>{
            state.ActivityModalVisible2 = action.payload
},
        HideMobileToolBarFlagAC:(state, action)=>{
            state.HideMobileToolBarFlag = action.payload
        },
        OutputWindowIsOpenAC: (state, action)=>{
            state.OutputWindowIsOpen = action.payload
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
                state.Id_entry = action.payload;
                state.IsEditActivityBarVisible = false;
            })
            .addCase(changeIdEntryThunk.fulfilled, (state, action) => {
                state.Id_entry = action.payload;
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
            })
            .addCase(deleteActivityThunk.fulfilled, (state, action) => {
                state.SelectedActivity = {activity_id:null, value:"Активность не выбрана"};
                state.UserData = {}
            })
            .addCase(editActivityThunk.fulfilled, (state, action) => {
                state.ActivityModalVisible2 = false;
            })
            .addCase(editActivityThunk.rejected, (state, action) => {
                state.ActivityModalVisible2 = false;
            })
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
    SelectedActivityAC,
    setFlagCreateNote,
    ActivityModalVisible2AC2,
    HideMobileToolBarFlagAC,
    OutputWindowIsOpenAC
} = profileSlice.actions

export default profileSlice.reducer