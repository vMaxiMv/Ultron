import AuthReducer from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import Chart_Interaction_Slice from "./Chart_Interaction_Reducer"
import booleanReducer from "./FlagsBooleanReducer"

const store = configureStore({
    reducer:{
        Profile: profileReducer,
        Auth: AuthReducer,
        Chart_Reducer: Chart_Interaction_Slice,
        Flags_Reducer: booleanReducer
    }
})



export default store;