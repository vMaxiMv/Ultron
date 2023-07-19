import React from 'react';
import f from "../form_login/form_login.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

function FormRegistration(props) {
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm()

    const onSubmit = async (data)=>{
        const {username, password} = data;
        console.log(data)
        try{
            const response = await axios.post('http://localhost:5000/api/login', {username, password})
            const redirectUrl = response.data['redirect_url']
            navigate(redirectUrl)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="wrapper">
            <section className="container">
                <div className={f.form_box}>
                    <div className={f.form_value}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Регистрация</h2>
                            <div className={f.inputbox}>
                                <ion-icon name="person-outline"></ion-icon>
                                <input {...register('username',{required:true})} type="text" required/>
                                <label>Name</label>
                            </div>
                            {errors.username && <span>Придумайте имя пользователя</span>}
                            <div className={f.inputbox}>
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input {...register('password',{required:true})} type="password" required />
                                <label>Password</label>
                            </div>
                            {errors.password && <span>Придумайте пароль</span>}
                            <div className={f.forget}>
                                <label htmlFor=""> <input type="checkbox"/>Remember Me</label>
                            </div>
                            <button disabled={Object.keys(errors).length > 0} type="submit">Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FormRegistration;