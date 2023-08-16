import React, { useState } from 'react';
import "./ToolBarMobile.css";
import ToolBarCommonComponent from "./ToolBarCommonComponent";


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
                   <ToolBarCommonComponent/>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
