import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import n from './nav.module.css'

function Nav(props) {
        const [currentIndex, setCurrentIndex] = useState(0);
        const texts = [
            'Приветственный текст, который вводит в курс дела, что это за продукт, какие функции, что может дать пользователю',
            'Еще один текст, который также вводил в курс дела и что-то рассказывает пользователю',
            'Финальный текст-инструкция, еще о чем-то информирующая пользователя',
        ];


        const handlePrev = () => {
            setCurrentIndex((currentIndex) => (currentIndex === 0 ? texts.length - 1 : currentIndex - 1));
        };

        const handleNext = () => {
            setCurrentIndex((currentIndex) => (currentIndex === texts.length - 1 ? 0 : currentIndex + 1));
        };
    return (
            <div className="wrapper">
                <div className={n.container}>
                    <img src="/images/friendly-sporty-face-robot-in-a-mug.svg" alt="logo" className={n.logo} />
                    <div className={n.main_block}>
                        <div className={n.text_block}>
                            <p>{texts[currentIndex]}</p>
                            <div className={n.slider_btns}>
                                <div><ion-icon onClick={handlePrev} name="caret-back-outline"></ion-icon></div>
                                <div><ion-icon onClick={handleNext} name="caret-forward-outline"></ion-icon></div>
                            </div>

                        </div>

                        <div className={n.buttons}>

                            <NavLink to="/login" className={n.first_btn}>
                                <span > Вход</span>
                            </NavLink>

                            <NavLink to="/registration" className={n.second_btn}>
                                <span > Регистрация</span>
                            </NavLink>

                        </div>
                    </div>
                    <div className={n.user_img}>
                        <img src="/images/little-robot-with-body--legs-and-head2.svg" alt="Image" />
                    </div>
                </div>
            </div>

    );
}

export default Nav;