import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import thunkMiddleware from 'redux-thunk'

let rootReducer = combineReducers({
    Profile: ProfileReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.store = store

export default store;