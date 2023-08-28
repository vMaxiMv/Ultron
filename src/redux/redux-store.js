import AuthReducer from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import Chart_Modals_Slice from "./Chart_Modals_Interaction_Reducer"

const store = configureStore({
    reducer:{
        Profile: profileReducer,
        Auth: AuthReducer,
        Chart_Modals: Chart_Modals_Slice
    }
})



export default store;