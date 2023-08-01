import React, { useState } from 'react';
import "./ToolBarMobile.css";


const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='Mobile_Menu'>
            <div className="burger-menu" onClick={handleMenuClick}>
                <div className={`line ${isMenuOpen ? 'line1-open' : ''}`} />
                <div className={`line ${isMenuOpen ? 'line2-open' : ''}`} />
                <div className={`line ${isMenuOpen ? 'line3-open' : ''}`} />
            </div>

            {isMenuOpen && (
                <div className="menu-overlay">
                    <div className="close-btn" onClick={handleMenuClick}>
                        <div className="cross_angle line1" />
                        <div className="cross_angle line2" />
                    </div>
                    <div className='menu-items'>
                        <h2>Инструменты</h2>
                        <ul>
                            <li><button>Диаграмма</button></li>
                            <li><button>Таблица</button></li>

                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
