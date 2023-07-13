import React, {useState} from 'react';
import Form_login from "../form_login/form_login";
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function Profile(props) {
    const navigate = useNavigate()

    const handleLogout = async () =>{
        try{
            const response = await axios.post('http://localhost:5000/api/logout')
            const redirectUrl = response.data['redirect_url']
            console.log(response.headers['set-cookie'])
            navigate(redirectUrl)
        }
    catch (error){
        console.error(error)}
    }
    return (
        <div>
            <h1>Ваш профиль</h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default Profile;