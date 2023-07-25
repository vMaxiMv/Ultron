import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import p from './profile.module.css';
import CommonCharts, {getDatasets, getSortedDates} from '../charts/CommonCharts';
import {updateUserData, UserData} from '../../data/Data';
import Loading from "../loading/loading";
import {useDispatch, useSelector} from "react-redux";
import {ActivityButtonsThunk, FillActivityThunk} from "../../redux/ProfileReducer";
import {LogoutThunk} from "../../redux/AuthReducer";

axios.defaults.withCredentials = true;
 export function useUserData(){
    const UserData = useSelector(state=>state.Profile.UserData)
    const userData = useMemo(()=>({
        labels: getSortedDates(UserData, 5),
        datasets: getDatasets(UserData),
    }), [UserData])
    return userData;
}

function Profile(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const ActivityButtons = useSelector(state=>state.Profile.ActivityButtons)
    const LoadingStatus = useSelector(state=>state.Profile.LoadingStatus)
    const redirectUrl = useSelector(state=>state.Auth.redirectUrl)
    //const [dataObject, setDataObject] = useState({});
   // const [showCharts, setShowCharts] = useState(false); // Add state to control the visibility of CommonCharts


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             //const response = await axios.get('http://localhost:5000/data_for_chart');
    //             const  test_data = {73: 'подтягивания', 74: 'отжимания от пола', 75: 'брусья', 76: 'жим лежа'}
    //             setDataObject(test_data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    useEffect(()=>{
        dispatch(ActivityButtonsThunk())
    },[])

    useEffect(()=>{
        if(redirectUrl){
            navigate(redirectUrl)

        }
    },[redirectUrl, navigate])

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/logout');
    //         const redirectUrl = response.data['redirect_url'];
    //         console.log(response.headers['set-cookie']);
    //         navigate(redirectUrl);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const PostId = async (id) => {
    //     try {
    //         setShowCharts(false);
    //         const response = await axios.post('http://localhost:5000/data_for_chart', { id });
    //         updateUserData(response.data);
    //         setShowCharts(true); // Show the CommonCharts component after getting the response
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <div className={p.wrapper}>
            <div className={p.main_block}>
                <button onClick={()=>dispatch(LogoutThunk())}>Выйти</button>
            </div>
            <h2>Активности</h2>
            <div className={p.container}>
                <div className={p.list}>
                    {Object.entries(ActivityButtons).map(([key, value]) => (
                        <button onClick={() => dispatch(FillActivityThunk(key))} key={key}>
                            {`${value}`}
                        </button>
                    ))}
                </div>
                <div className={p.graphics}>
                    {/*{showCharts && <CommonCharts />} */}
                    {/*{showCharts ? <CommonCharts /> : <Loading />}*/}
                    {LoadingStatus ?  <CommonCharts/> : <Loading/>}
                </div>
            </div>
        </div>
    );
}

export default Profile;
