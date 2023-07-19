import React, {useEffect, useState} from 'react';
import Form_login from "../form_login/form_login";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import p from "./profile.module.css"
import BarCharts from "../charts/barCharts/BarCharts";
import CommonCharts from "../charts/CommonCharts";

axios.defaults.withCredentials = true;

function Profile(props) {
    const navigate = useNavigate()
    const [dataObject, setDataObject] = useState({})

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/data_for_chart')
                setDataObject(response.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchData()
    }, [])

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
    //const dataObject = {73: 'подтягивания', 74: 'отжимания от пола', 75: 'брусья', 76: 'жим лежа'}

    return (
        <div className={p.wrapper}>
            <div className={p.main_block}>
                <button onClick={handleLogout}>Выйти</button>
            </div>
            <h2>Активности</h2>
            <div className={p.container}>
                    <div className={p.list}>{
                        Object.entries(dataObject).map(([key, value]) => (
                            <button key={key}> {`${value}`}</button>
                        ))
                    }
                    </div>
                <div className={p.graphics}>
                    <CommonCharts/>
                </div>

            </div>
        </div>
    );
}

export default Profile;