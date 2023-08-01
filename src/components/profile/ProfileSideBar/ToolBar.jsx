import React from 'react';
import "./ToolBar.css";

function ToolBar(props) {
    return (
        <div className='menu'>
            <div className='title'><h2>Инструменты</h2></div>
            <div className='list_menu'>
                <ul>
                    <li><button>Диаграмма</button></li>
                    <li><button>Таблица</button></li>

                </ul>
            </div>
        </div>
    );
}

export default ToolBar;