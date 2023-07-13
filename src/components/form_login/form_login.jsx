// todo rsf для быстрого создания функциональной компоненты

import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import f from "./form_login.module.css"


function Form_login(props) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ username: '', password: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Обновляем состояние с новыми значениями полей ввода
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = formData.username;
        const password = formData.password;

        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const redirectUrl = response.data['redirect_url']
                // window.location.href = redirectUrl; // Обработка ответа от сервера
                navigate(redirectUrl)

        } catch (error) {
            console.error(error); // Обработка ошибок при отправке запроса
        }
    };

    return (
        <div className="wrapper">
            <section className="container">
            <div className={f.form_box}>
                <div className={f.form_value}>
                    <form onSubmit={handleSubmit}>
                    <h2>Вход</h2>
                <div className={f.inputbox}>
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
                    <label>Name</label>
                </div>
                <div className={f.inputbox}>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    <label>Password</label>
                </div>
                <div className={f.forget}>
                    <label htmlFor=""> <input type="checkbox"/>Remember Me <a href="">Forgot Password</a></label>
                </div>
                <button type="submit">Войти</button>
                <div className={f.register}>
                    <p>Нет аккаунта? <NavLink to="/registration">Зарегистрироваться</NavLink></p>
                </div>
            </form>
                </div>
            </div>
            </section>
        </div>
    );
}

export default Form_login;