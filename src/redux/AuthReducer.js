// import axios from "axios";
// import {setLoadingStatus} from "./ProfileReducer";
//
// const LOGIN = 'LOGIN'
// const SET_REDIRECT_URL = 'SET_REDIRECT_URL'
// const RESET_REDIRECT_URL = 'RESET_REDIRECT_URL'
//
// const initialState = {
//     username: null,
//     password: null,
//     redirectUrl: null
// }
//
// const AuthReducer = (state = initialState, action)=> {
//     switch (action.type) {
//         case LOGIN:
//             return {...state, ...action.data}
//         case SET_REDIRECT_URL:
//             return {...state,redirectUrl: action.redirectUrl}
//         case RESET_REDIRECT_URL:
//             return {...state, redirectUrl: null}
//         default:
//             return state
//     }
// }
//
// export const LoginRegisterAC = (username, password) => ({type:LOGIN, data:{username,password}})
//
//
// export const SetRedirectUrlAC = (redirectUrl)=>({type:SET_REDIRECT_URL, redirectUrl:redirectUrl})
// export const resetRedirectUrlAC = ()=>({ type: RESET_REDIRECT_URL})
//
//
// export const LoginRegisterThunk = (username, password,name)=>{
//     return (dispatch)=>{
//         axios.post(`http://localhost:5000/api/${name}`, {username, password})
//             .then(response=> {
//                     const redirectUrl = response.data['redirect_url']
//                     dispatch(LoginRegisterAC(username, password))
//                     dispatch(SetRedirectUrlAC(redirectUrl))
//                 }
//             )
//     }
// }
// export const LogoutThunk = ()=>{
//     return (dispatch)=>{
//         axios.post('http://localhost:5000/api/logout')
//             .then(response=>{
//                 const redirectUrl = response.data['redirect_url']
//                 dispatch(SetRedirectUrlAC(redirectUrl))
//                 dispatch(setLoadingStatus(false))
//                 window.location.href = redirectUrl;
//             })
//     }
// }
// export default AuthReducer



import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const LoginRegisterThunk = createAsyncThunk(
    'auth/loginRegister',
    async ({username, password, name},{dispatch}) =>{
        const response = await axios.post(`http://localhost:5000/api/${name}`, {username, password})
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl))
        return {username, password}
    }
)
export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_,{dispatch}) =>{
        const response = await axios.post(`http://localhost:5000/api/logout`)
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl));
        window.location.href = redirectUrl;
    }
)

const initialState = {
    username: null,
    password: null,
    redirectUrl: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setRedirectUrl:(state,action)=>{
            state.redirectUrl= action.payload
        },
        resetRedirectUrlAC: (state)=>{
            state.redirectUrl = null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(LoginRegisterThunk.fulfilled, (state, action)=>{
                const {username, password} = action.payload
                state.username = username
                state.password = password
            })
    }
})
export const { setRedirectUrl, resetRedirectUrlAC } = authSlice.actions;
export default authSlice.reducer