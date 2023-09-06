import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import n from './nav.module.css'
import { useSwipeable } from 'react-swipeable';

function Nav(props) {
        const [currentIndex, setCurrentIndex] = useState(0);
        const texts = [
            'Привет',
            'Еще один текст, который также вводил в курс дела и что-то рассказывает пользователю',
            'Финальный текст-инструкция, еще о чем-то информирующая пользователя',
        ];


        const handlePrev = () => {
            setCurrentIndex((currentIndex) => (currentIndex === 0 ? texts.length - 1 : currentIndex - 1));
        };

        const handleNext = () => {
            setCurrentIndex((currentIndex) => (currentIndex === texts.length - 1 ? 0 : currentIndex + 1));
        };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext, // Переключаемся на следующий слайд при свайпе влево
        onSwipedRight: handlePrev, // Переключаемся на предыдущий слайд при свайпе вправо
    });

    return (
            <div className="wrapper">
                <div className={n.container}>
                    <img src="images/strong-robot-white.svg" alt="logo" className={n.logo} />
                    <div className={n.main_block}>
                        <div className={n.text_block}>
                            <p {...handlers}>{texts[currentIndex]}</p>
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
                        <img src="images/strong-robot-white.svg" alt="Image" />
                    </div>
                </div>
            </div>

    );
}

export default Nav;