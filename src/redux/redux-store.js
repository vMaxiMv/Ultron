import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import thunkMiddleware from 'redux-thunk'
import AuthReducer from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";

// let rootReducer = combineReducers({
//     Profile: ProfileReducer,
//     Auth: AuthReducer
// })

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

const store = configureStore({
    reducer:{
        Profile: profileReducer,
        Auth: AuthReducer
    }
})



export default store;