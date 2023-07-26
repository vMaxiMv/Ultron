// todo rsf для быстрого создания функциональной компоненты

import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import f from "./form_login.module.css"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {LoginRegisterThunk, resetRedirectUrlAC} from "../../redux/AuthReducer";


function Form_login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const redirectUrl = useSelector(state=>state.Auth.redirectUrl)
    const {register, handleSubmit, formState:{errors}} = useForm()

    const onSubmit = async (data)=>{
        const {username, password} = data;
        console.log(data)

        dispatch(LoginRegisterThunk(username,password,'login'))
    }
    useEffect(()=>{
        if(redirectUrl){
            navigate(redirectUrl)
            dispatch(resetRedirectUrlAC())
        }
    },[redirectUrl, navigate])

    return (
        <div className={f.wrapper}>
            <section className={f.container}>
            <div className={f.form_box}>
                <div className={f.form_value}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Вход</h2>
                <div className={f.inputbox}>
                    <ion-icon name="person-outline"></ion-icon>
                    <input {...register('username',{required:true})} type="text" required/>
                    <label>Name</label>
                </div>
                        {errors.username && <span>Введите имя пользователя</span>}
                <div className={f.inputbox}>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input {...register('password',{required:true})} type="password" required />
                    <label>Password</label>
                </div>
                        {errors.password && <span>Введите пароль</span>}
                <div className={f.forget}>
                    <label htmlFor=""> <input type="checkbox"/>Remember Me <a href="">Forgot Password</a></label>
                </div>
                <button className={f.btn} type="submit" disabled={Object.keys(errors).length > 0}>Войти</button>
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