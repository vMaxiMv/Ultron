import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import p from './profile.module.css';
import CommonCharts from '../charts/CommonCharts';
import { updateUserData } from '../../data/Data';
import Loading from "../loading/loading";

axios.defaults.withCredentials = true;

function Profile(props) {
    const navigate = useNavigate();
    const [dataObject, setDataObject] = useState({});
    const [showCharts, setShowCharts] = useState(false); // Add state to control the visibility of CommonCharts

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/data_for_chart');
                const  test_data = {73: 'подтягивания', 74: 'отжимания от пола', 75: 'брусья', 76: 'жим лежа'}
                setDataObject(test_data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/logout');
            const redirectUrl = response.data['redirect_url'];
            console.log(response.headers['set-cookie']);
            navigate(redirectUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const PostId = async (id) => {
        try {
            setShowCharts(false);
            // const response = await axios.post('http://localhost:5000/data_for_chart', { id });

            const test_data =  [{'id_user': 56, 'id_entery': 1, 'name': 'Test User', 'amount': 82, 'date_added': '2023-07-20'},
                {'id_user': 56, 'id_entery': 2, 'name': 'Test User', 'amount': 65, 'date_added': '2023-07-19'},
                {'id_user': 56, 'id_entery': 3, 'name': 'Test User', 'amount': 59, 'date_added': '2023-07-18'},
                {'id_user': 57, 'id_entery': 4, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-17'},
                {'id_user': 56, 'id_entery': 5, 'name': 'Test User', 'amount': 52, 'date_added': '2023-07-16'},
                {'id_user': 56, 'id_entery': 6, 'name': 'Test User', 'amount': 64, 'date_added': '2023-07-15'},
                {'id_user': 56, 'id_entery': 7, 'name': 'Test User', 'amount': 60, 'date_added': '2023-07-14'},
                {'id_user': 56, 'id_entery': 9, 'name': 'Test User', 'amount': 57, 'date_added': '2023-07-12'},
                {'id_user': 57, 'id_entery': 9, 'name': 'Test User 2', 'amount': 57, 'date_added': '2023-07-12'},
                {'id_user': 56, 'id_entery': 10, 'name': 'Test User', 'amount': 88, 'date_added': '2023-07-11'},
                {'id_user': 56, 'id_entery': 11, 'name': 'Test User', 'amount': 67, 'date_added': '2023-07-10'},
                {'id_user': 56, 'id_entery': 12, 'name': 'Test User', 'amount': 71, 'date_added': '2023-07-09'}
            ]
            updateUserData(test_data);
            setShowCharts(true); // Show the CommonCharts component after getting the response
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={p.wrapper}>
            <div className={p.main_block}>
                <button onClick={handleLogout}>Выйти</button>
            </div>
            <h2>Активности</h2>
            <div className={p.container}>
                <div className={p.list}>
                    {Object.entries(dataObject).map(([key, value]) => (
                        <button onClick={() => PostId(key)} key={key}>
                            {`${value}`}
                        </button>
                    ))}
                </div>
                <div className={p.graphics}>
                    {/*{showCharts && <CommonCharts />} */}
                    {showCharts ? <CommonCharts /> : <Loading />}
                </div>
            </div>
        </div>
    );
}

export default Profile;
