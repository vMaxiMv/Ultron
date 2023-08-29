import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
let baseUrl = 'http://localhost:5000/api'
baseUrl = 'https://Akwinchester.pythonanywhere.com/api'

export const LoginRegisterThunk = createAsyncThunk(
    'auth/loginRegister',
    async ({username, password, name},{dispatch}) =>{
        const response = await axios.post(`${baseUrl}/${name}`, {username, password})
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl))
        return {username, password}
    }
)
export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_,{dispatch}) =>{
        const response = await axios.post(`${baseUrl}/logout`)
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl));
        window.location.href = redirectUrl;
    }
)
export const GetYourNameThunk = createAsyncThunk(
    'auth/yourName',
    async () => {
        try {
            const response = await axios.get(`${baseUrl}/get_username`); // Replace with your actual API endpoint
            return response.data.userName;
        } catch (error) {
            throw error;
        }
    }
);
const initialState = {
    redirectUrl: null,
    YourName: ''
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
        },

    },
    extraReducers:(builder)=>{
        builder
            .addCase(GetYourNameThunk.fulfilled, (state, action)=>{
                    state.YourName= action.payload
            })
    }
})
export const { setRedirectUrl, resetRedirectUrlAC } = authSlice.actions;
export default authSlice.reducer