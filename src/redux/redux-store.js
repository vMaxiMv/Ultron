import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import thunkMiddleware from 'redux-thunk'
import AuthReducer from "./AuthReducer";

let rootReducer = combineReducers({
    Profile: ProfileReducer,
    Auth: AuthReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.store = store

export default store;