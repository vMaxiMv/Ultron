// todo rsf для быстрого создания функциональной компоненты

import React, {useState} from 'react';
import axios from "axios";
import {redirect} from "react-router-dom";


function Form(props) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Обновляем состояние с новыми значениями полей ввода
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = formData.username;
        const password = formData.password;

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            // console.log(response.data); // Обработка ответа от сервера
            if(response.status === 302){
                const redirectUrl = response.headers['location']
                window.location.href = redirectUrl;
            }
        } catch (error) {
            console.error(error); // Обработка ошибок при отправке запроса
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Form;