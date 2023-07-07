import React, {useState} from 'react';
import Form from "../form/form";
import axios from "axios";
axios.defaults.withCredentials = true;
function Profile(props) {

    const handleLogout = async () =>{
        try{
            const response = await axios.post('http://localhost:5000/api/logout')

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