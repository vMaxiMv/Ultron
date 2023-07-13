import React from 'react';
import f from "../form_login/form_login.module.css";
import {NavLink} from "react-router-dom";

function FormRegistration(props) {
    return (
        <div className="wrapper">
            <section className="container">
                <div className={f.form_box}>
                    <div className={f.form_value}>
                        <form>
                            <h2>Регистрация</h2>
                            <div className={f.inputbox}>
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" name="email"   required/>
                                <label>Email</label>
                            </div>
                            <div className={f.inputbox}>
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" name="username"   required/>
                                <label>Name</label>
                            </div>
                            <div className={f.inputbox}>
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" name="password"   required />
                                <label>Password</label>
                            </div>
                            <div className={f.forget}>
                                <label htmlFor=""> <input type="checkbox"/>Remember Me</label>
                            </div>
                            <button type="submit">Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FormRegistration;