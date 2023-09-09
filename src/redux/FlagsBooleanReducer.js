import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    StatusView: false,
    FlagChangeNote: false,
    FlagCreateNote: false,
    ActivityModalVisible: false,
    ActivityModalVisible2: false,
    HideMobileToolBarFlag: true,
    OutputWindowIsOpen: false,
    LoadingStatus: false
};

const booleanSlice = createSlice({
    name: "booleans",
    initialState,
    reducers: {
        changeStatusView: (state, action) => {
            state.StatusView = action.payload;
        },
        changeNote: (state, action) => {
            state.FlagChangeNote = action.payload;
        },
        setFlagCreateNote: (state, action) => {
            state.FlagCreateNote = action.payload;
        },
        ActivityModalVisibleAC: (state, action) => {
            state.ActivityModalVisible = action.payload;
        },
        ActivityModalVisible2AC2: (state, action) => {
            state.ActivityModalVisible2 = action.payload;
        },
        HideMobileToolBarFlagAC: (state, action) => {
            state.HideMobileToolBarFlag = action.payload;
        },
        OutputWindowIsOpenAC: (state, action) => {
            state.OutputWindowIsOpen = action.payload;
        },
        SetLoadingStatusAC: (state, action)=>{
            state.LoadingStatus = action.payload
        }
    },
});
export const {
    StatusView,
    FlagChangeNote,
    FlagCreateNote,
    ActivityModalVisible,
    ActivityModalVisible2,
    HideMobileToolBarFlag,
    OutputWindowIsOpen,
    LoadingStatus
} = initialState
export const {
    changeStatusView,
    changeNote,
    setFlagCreateNote,
    ActivityModalVisibleAC,
    ActivityModalVisible2AC2,
    HideMobileToolBarFlagAC,
    OutputWindowIsOpenAC,
    SetLoadingStatusAC
} = booleanSlice.actions;

export default booleanSlice.reducer;
