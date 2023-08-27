import AuthReducer from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";


const store = configureStore({
    reducer:{
        Profile: profileReducer,
        Auth: AuthReducer
    }
})



export default store;