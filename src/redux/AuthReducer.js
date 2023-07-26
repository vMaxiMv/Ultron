import axios from "axios";
import {DeleteActivityAC, SetLoadingStatusAC} from "./ProfileReducer";

const LOGIN = 'LOGIN'
const SET_REDIRECT_URL = 'SET_REDIRECT_URL'
const RESET_REDIRECT_URL = 'RESET_REDIRECT_URL'

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
            return {...state,redirectUrl: action.redirectUrl}
        case RESET_REDIRECT_URL:
            return {...state, redirectUrl: null}
        default:
            return state
    }
}

export const LoginRegisterAC = (username, password) => ({type:LOGIN, data:{username,password}})


export const SetRedirectUrlAC = (redirectUrl)=>({type:SET_REDIRECT_URL, redirectUrl:redirectUrl})
export const resetRedirectUrlAC = ()=>({ type: RESET_REDIRECT_URL})


// export const LoginThunk = (username, password)=>{
//     return (dispatch)=>{
//         axios.post('http://localhost:5000/api/login', {username, password})
//             .then(response=> {
//                 const redirectUrl = response.data['redirect_url']
//                 dispatch(LoginAC(username, password))
//                 dispatch(SetRedirectUrlAC(redirectUrl))
//             }
//     )
//     }
// }
export const LoginRegisterThunk = (username, password,name)=>{
    return (dispatch)=>{
        axios.post(`http://localhost:5000/api/${name}`, {username, password})
            .then(response=> {
                    const redirectUrl = response.data['redirect_url']
                    dispatch(LoginRegisterAC(username, password))
                    dispatch(SetRedirectUrlAC(redirectUrl))
                }
            )
    }
}
export const LogoutThunk = ()=>{
    return (dispatch)=>{
        axios.post('http://localhost:5000/api/logout')
            .then(response=>{
                const redirectUrl = response.data['redirect_url']
                dispatch(SetRedirectUrlAC(redirectUrl))
                dispatch(DeleteActivityAC())
                dispatch(SetLoadingStatusAC(false))
            })
    }
}



export default AuthReducer