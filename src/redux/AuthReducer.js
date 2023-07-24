import axios from "axios";
import {redirect} from "react-router-dom";

const LOGIN = 'LOGIN'
const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

const initialState = {
    username: null,
    password: null,
    redirectUrl: null
}

const AuthReducer = (state = initialState, action)=> {
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.data}
        case SET_REDIRECT_URL:
            return {state, ...action.redirectUrl}
        default:
            return state
    }
}

export const LoginAC = (username, password) => ({type:LOGIN, data:{username,password}})
export const SetRedirectUrlAC = (redirectUrl)=>({type:SET_REDIRECT_URL, redirectUrl:redirectUrl})


export const LoginThunk = (username, password)=>{
    return (dispatch)=>{
        axios.post('http://localhost:5000/api/login', {username, password})
            .then(response=> {
                const redirectUrl = response.data['redirect_url']
                dispatch(LoginAC(username, password))
                dispatch(SetRedirectUrlAC(redirectUrl))
            }
    )
    }
}

export default AuthReducer