import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visibleDatesFirst: 0,
    visibleDatesLast: 10,
    valueOfEntryAmount:  '',
    valueOfEntryDescription: ''
}

const Chart_Modals_Slice = createSlice({
    name: 'Chart_Modals',
    initialState,
    reducers: {
        setNextDates: (state, action)=>{
            state.visibleDatesFirst += 10;
            state.visibleDatesLast += 10;
        },
        setLastDates: (state, action)=>{
            state.visibleDatesFirst -= 10;
            state.visibleDatesLast -= 10;
},
        valueOfEntryAmountAC: (state, action)=>{
            state.valueOfEntryAmount = action.payload
        },
        valueOfEntryDescriptionAC:(state, action)=>{
            state.valueOfEntryDescription = action.payload
        }
    }
})

export const { setNextDates, setLastDates,valueOfEntryAmountAC,valueOfEntryDescriptionAC } = Chart_Modals_Slice.actions;
export default Chart_Modals_Slice.reducer