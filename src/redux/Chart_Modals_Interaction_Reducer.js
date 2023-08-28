import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visibleDatesFirst: 0,
    visibleDatesLast: 10
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
}
    }
})

export const { setNextDates, setLastDates } = Chart_Modals_Slice.actions;
export default Chart_Modals_Slice.reducer