import React from 'react';
import { NavLink } from 'react-router-dom';
import n from './nav.module.css'

function Nav(props) {
    return (
        <div>
            <div className={n.wrapper}>
                <div className={n.container}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/2048px-SVG_Logo.svg.png" alt="logo" className={n.logo} />
                    <div className={n.main_block}>
                        <div className={n.text_block}>
                            <p>Приветственный текст, который вводит в курс дела, что это за продукт, какие функции, что может дать пользователю</p>
                        </div>

                        <div className={n.buttons}>

                            <NavLink to="/form" className={n.first_btn}>
                                <span > Вход</span>
                            </NavLink>

                            <NavLink to="" className={n.second_btn}>
                                <span > Регистрация</span>
                            </NavLink>

                        </div>
                    </div>
                    <div className={n.user_img}>
                        <img src="https://icon-library.com/images/profile-icon-white/profile-icon-white-12.jpg" alt="Image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;